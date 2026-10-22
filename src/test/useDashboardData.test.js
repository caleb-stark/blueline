import { act, renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import scheduleFixture from "./fixtures/schedule-2026-10-14.json"
import scoreFixture from "./fixtures/score-2026-10-12.json"
import standingsFixture from "./fixtures/standings-2026-10-14.json"

const { getSchedule, getScores, getStandings } = vi.hoisted(() => ({
  getSchedule:vi.fn(),
  getScores:vi.fn(),
  getStandings:vi.fn()
}))

vi.mock("../features/games/api/gamesApi", () => ({ getSchedule, getScores }))
vi.mock("../features/standings/api/standingsApi", () => ({ getStandings }))

import useDashboardData from "../features/dashboard/hooks/useDashboardData"

describe("useDashboardData", () => {
  it("combines selected-day games, scores, and standings", async () => {
    getSchedule.mockResolvedValue(scheduleFixture)
    getScores.mockResolvedValue({ ...scoreFixture, games:[] })
    getStandings.mockResolvedValue(standingsFixture)

    const { result } = renderHook(() => useDashboardData("2026-10-14"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.games).toHaveLength(2)
    expect(result.current.scores).toEqual([])
    expect(result.current.standings[0].teamAbbrev.default).toBe("CAR")
    expect(getSchedule).toHaveBeenCalledWith("2026-10-14", expect.objectContaining({ signal:expect.any(AbortSignal) }))
  })

  it("clears data on error and can refetch", async () => {
    getSchedule.mockRejectedValueOnce(new Error("network down")).mockResolvedValueOnce(scheduleFixture)
    getScores.mockResolvedValue({ games:[] })
    getStandings.mockResolvedValue({ standings:[] })

    const { result } = renderHook(() => useDashboardData("2026-10-14"))

    await waitFor(() => expect(result.current.error).toBe("network down"))

    act(() => result.current.refetch())

    await waitFor(() => expect(result.current.games).toHaveLength(2))
    expect(result.current.error).toBeNull()
  })
})
