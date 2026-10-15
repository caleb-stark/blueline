import { describe, expect, it, vi } from "vitest"

const { nhlFetch } = vi.hoisted(() => ({ nhlFetch:vi.fn() }))

vi.mock("../services/nhlApi", () => ({ nhlFetch }))

import { getTeamRoster, getTeamStats } from "../features/teams/api/teamsApi"
import { getStandings } from "../features/standings/api/standingsApi"

describe("team API paths", () => {
  it("uses concrete non-redirecting standings paths", () => {
    getStandings()

    expect(nhlFetch).toHaveBeenCalledWith(expect.stringMatching(/^\/standings\/\d{4}-\d{2}-\d{2}$/), undefined)
  })

  it("uses concrete season paths for roster and club stats", () => {
    const options = { signal:new AbortController().signal }

    getTeamRoster("CAR", options)
    getTeamStats("CAR", options)

    expect(nhlFetch).toHaveBeenCalledWith(expect.stringMatching(/^\/roster\/CAR\/\d{8}$/), options)
    expect(nhlFetch).toHaveBeenCalledWith(expect.stringMatching(/^\/club-stats\/CAR\/\d{8}\/2$/), options)
  })
})
