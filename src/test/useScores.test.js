import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import scoreFixture from "./fixtures/score-2026-10-12.json"

const { getScores } = vi.hoisted(() => ({
  getScores:vi.fn()
}))

vi.mock("../features/games/api/gamesApi", () => ({ getScores }))

import useScores from "../features/games/hooks/useScores"

describe("useScores", () => {
  it("loads scores from the top-level games response", async () => {
    getScores.mockResolvedValue(scoreFixture)

    const { result } = renderHook(() => useScores("2026-10-12"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.games).toHaveLength(2)
    expect(result.current.games[0].awayTeam.score).toBe(3)
    expect(getScores).toHaveBeenCalledWith("2026-10-12", expect.objectContaining({ signal:expect.any(AbortSignal) }))
  })

  it("filters games whose game date does not match", async () => {
    getScores.mockResolvedValue({ games:[...scoreFixture.games, { id:99, gameDate:"2026-10-13" }] })

    const { result } = renderHook(() => useScores("2026-10-12"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.games).toHaveLength(2)
  })

  it("handles errors and exposes refetch", async () => {
    getScores.mockRejectedValueOnce(new Error("score request failed"))
    getScores.mockResolvedValueOnce(scoreFixture)

    const { result } = renderHook(() => useScores("2026-10-12"))

    await waitFor(() => expect(result.current.error).toBe("score request failed"))
    result.current.refetch()
    await waitFor(() => expect(result.current.games).toHaveLength(2))
  })
})
