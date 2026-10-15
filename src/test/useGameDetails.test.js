import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"

const { getGameLanding, getGameBoxScore, getGamePlayByPlay } = vi.hoisted(() => ({
  getGameLanding:vi.fn(),
  getGameBoxScore:vi.fn(),
  getGamePlayByPlay:vi.fn()
}))

vi.mock("../features/games/api/gamesApi", () => ({ getGameLanding, getGameBoxScore, getGamePlayByPlay }))

import useGameDetails from "../features/games/hooks/useGameDetails"

beforeEach(() => {
  vi.clearAllMocks()
  getGameLanding.mockResolvedValue({ id:2026020087, gameState:"OFF" })
  getGameBoxScore.mockResolvedValue({ playerByGameStats:{ awayTeam:[], homeTeam:[] } })
  getGamePlayByPlay.mockResolvedValue({ plays:[] })
})

describe("useGameDetails", () => {
  it("fetches landing, box score, and play-by-play once", async () => {
    const { result } = renderHook(() => useGameDetails("2026020087"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.landing.id).toBe(2026020087)
    expect(getGameLanding).toHaveBeenCalledWith("2026020087", expect.objectContaining({ signal:expect.any(AbortSignal) }))
    expect(getGameBoxScore).toHaveBeenCalledTimes(1)
    expect(getGamePlayByPlay).toHaveBeenCalledTimes(1)
  })

  it("keeps successful sections when one request fails", async () => {
    getGameBoxScore.mockRejectedValue(new Error("box score unavailable"))

    const { result } = renderHook(() => useGameDetails("2026020087"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.landing).not.toBeNull()
    expect(result.current.playByPlay).not.toBeNull()
    expect(result.current.boxScore).toBeNull()
    expect(result.current.errors.boxScore).toBe("box score unavailable")
    expect(result.current.error).toBeNull()
  })

  it("aborts old requests when the game changes", async () => {
    getGameLanding.mockImplementation((gameId, options) => new Promise((resolve, reject) => {
      options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))
      if(gameId === "2") resolve({ id:2 })
    }))

    const { rerender } = renderHook(({ gameId }) => useGameDetails(gameId), { initialProps:{ gameId:"1" } })
    rerender({ gameId:"2" })

    await waitFor(() => expect(getGameLanding).toHaveBeenCalledTimes(2))
    expect(getGameLanding.mock.calls[0][1].signal.aborted).toBe(true)
  })
})
