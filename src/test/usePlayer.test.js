import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"

const { getPlayer, getPlayerGameLog } = vi.hoisted(() => ({ getPlayer:vi.fn(), getPlayerGameLog:vi.fn() }))
vi.mock("../features/players/api/playersApi", () => ({ getPlayer, getPlayerGameLog }))

import usePlayer from "../features/players/hooks/usePlayer"
import usePlayerGameLog from "../features/players/hooks/usePlayerGameLog"

beforeEach(() => {
  vi.clearAllMocks()
  getPlayer.mockResolvedValue({ playerId:8478427, firstName:{ default:"Sebastian" } })
  getPlayerGameLog.mockResolvedValue({ gameLog:[{ gameId:1 }] })
})

describe("player hooks", () => {
  it("loads valid player IDs and rejects invalid IDs without a request", async () => {
    const { result } = renderHook(() => usePlayer("8478427"))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.player.playerId).toBe(8478427)
    expect(getPlayer).toHaveBeenCalledWith("8478427", expect.objectContaining({ signal:expect.any(AbortSignal) }))

    const invalid = renderHook(() => usePlayer("Aho"))
    await waitFor(() => expect(invalid.result.current.loading).toBe(false))
    expect(invalid.result.current.invalid).toBe(true)
    expect(getPlayer).toHaveBeenCalledTimes(1)
  })

  it("loads regular-season and playoff logs with the selected game type", async () => {
    const { result, rerender } = renderHook(({ type }) => usePlayerGameLog("8478427", "20262027", type), { initialProps:{ type:"2" } })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(getPlayerGameLog).toHaveBeenCalledWith("8478427", "20262027", "2", expect.objectContaining({ signal:expect.any(AbortSignal) }))

    rerender({ type:"3" })
    await waitFor(() => expect(getPlayerGameLog).toHaveBeenCalledTimes(2))
    expect(getPlayerGameLog.mock.calls[1][2]).toBe("3")
  })

  it("aborts the previous log request when the selection changes", async () => {
    getPlayerGameLog.mockImplementation((id, season, type, options) => new Promise((resolve, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))))
    const { rerender } = renderHook(({ type }) => usePlayerGameLog("8478427", "20262027", type), { initialProps:{ type:"2" } })
    rerender({ type:"3" })
    await waitFor(() => expect(getPlayerGameLog).toHaveBeenCalledTimes(2))
    expect(getPlayerGameLog.mock.calls[0][3].signal.aborted).toBe(true)
  })
})
