import { act, renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import scheduleFixture from "./fixtures/schedule-2026-10-14.json"

const { getSchedule } = vi.hoisted(() => ({
  getSchedule: vi.fn()
}))

vi.mock("../features/games/api/gamesApi", () => ({ getSchedule }))

import useGames from "../features/games/hooks/useGames"

describe("useGames", () => {
  it("loads only the selected day from the schedule week", async () => {
    getSchedule.mockResolvedValue(scheduleFixture)

    const { result } = renderHook(() => useGames("2026-10-14"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.games).toHaveLength(2)
    expect(result.current.games[0].id).toBe(2026020106)
    expect(getSchedule).toHaveBeenCalledWith("2026-10-14", expect.objectContaining({ signal:expect.any(AbortSignal) }))
  })

  it("handles an empty selected day", async () => {
    getSchedule.mockResolvedValue({ gameWeek:[{ date:"2026-10-14", games:[] }] })

    const { result } = renderHook(() => useGames("2026-10-14"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.games).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it("exposes errors and refetches", async () => {
    getSchedule.mockRejectedValueOnce(new Error("network down"))
    getSchedule.mockResolvedValueOnce(scheduleFixture)

    const { result } = renderHook(() => useGames("2026-10-14"))

    await waitFor(() => expect(result.current.error).toBe("network down"))

    act(() => {
      result.current.refetch()
    })

    await waitFor(() => expect(result.current.games).toHaveLength(2))
    expect(getSchedule).toHaveBeenCalledTimes(2)
  })

  it("aborts the request when the date changes", async () => {
    let rejectRequest
    getSchedule.mockImplementation((date, options) => new Promise((resolve, reject) => {
      rejectRequest = reject
      options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))
    }))

    const { rerender } = renderHook(({ date }) => useGames(date), {
      initialProps:{ date:"2026-10-14" }
    })

    rerender({ date:"2026-10-15" })

    await waitFor(() => expect(getSchedule).toHaveBeenCalledTimes(2))
    expect(rejectRequest).toBeTypeOf("function")
  })
})
