import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"

const { getStandings, getTeamRoster, getTeamStats } = vi.hoisted(() => ({
  getStandings:vi.fn(),
  getTeamRoster:vi.fn(),
  getTeamStats:vi.fn()
}))

vi.mock("../features/standings/api/standingsApi", () => ({ getStandings }))
vi.mock("../features/teams/api/teamsApi", () => ({ getTeamRoster, getTeamStats }))

import useTeam from "../features/teams/hooks/useTeam"

const team = {
  teamAbbrev:{ default:"CAR" },
  teamName:{ default:"Carolina Hurricanes" },
  teamLogo:"https://example.test/car.png"
}

const standings = { standings:[team] }

beforeEach(() => {
  vi.clearAllMocks()
  getStandings.mockResolvedValue(standings)
  getTeamRoster.mockResolvedValue({ forwards:[], defensemen:[], goalies:[] })
  getTeamStats.mockResolvedValue({ skaters:[], goalies:[] })
})

describe("useTeam", () => {
  it("validates the abbreviation from standings before loading both sections", async () => {
    const { result } = renderHook(() => useTeam("car"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.team).toEqual(team)
    expect(getTeamRoster).toHaveBeenCalledWith("CAR", expect.objectContaining({ signal:expect.any(AbortSignal) }))
    expect(getTeamStats).toHaveBeenCalledWith("CAR", expect.objectContaining({ signal:expect.any(AbortSignal) }))
  })

  it("marks an unknown abbreviation invalid without requesting team sections", async () => {
    const { result } = renderHook(() => useTeam("XXX"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.invalid).toBe(true)
    expect(getTeamRoster).not.toHaveBeenCalled()
    expect(getTeamStats).not.toHaveBeenCalled()
  })

  it("keeps roster data when club stats fail", async () => {
    const roster = { forwards:[{ id:100, firstName:{ default:"A" }, lastName:{ default:"Player" } }] }
    getTeamRoster.mockResolvedValue(roster)
    getTeamStats.mockRejectedValue(new Error("stats unavailable"))

    const { result } = renderHook(() => useTeam("CAR"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.roster).toEqual(roster)
    expect(result.current.stats).toBeNull()
    expect(result.current.errors.stats).toBe("stats unavailable")
    expect(result.current.errors.roster).toBeNull()
  })

  it("reports both failed sections without throwing", async () => {
    getTeamRoster.mockRejectedValue(new Error("roster unavailable"))
    getTeamStats.mockRejectedValue(new Error("stats unavailable"))

    const { result } = renderHook(() => useTeam("CAR"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe("Unable to load team data")
    expect(result.current.roster).toBeNull()
    expect(result.current.stats).toBeNull()
  })

  it("aborts the previous request when the abbreviation changes", async () => {
    const firstStandings = new Promise(() => {})
    getStandings.mockReturnValueOnce(firstStandings).mockResolvedValueOnce(standings)
    const { rerender } = renderHook(({ abbrev }) => useTeam(abbrev), { initialProps:{ abbrev:"CAR" } })

    rerender({ abbrev:"CAR" })
    rerender({ abbrev:"CAR" })

    expect(getStandings.mock.calls[0][1].signal.aborted).toBe(false)
    rerender({ abbrev:"NYR" })

    await waitFor(() => expect(getStandings).toHaveBeenCalledTimes(2))
    expect(getStandings.mock.calls[0][1].signal.aborted).toBe(true)
  })
})
