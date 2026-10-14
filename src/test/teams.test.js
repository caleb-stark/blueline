import { describe, expect, it } from "vitest"
import standingsFixture from "./fixtures/standings-2026-10-14.json"
import { getTeamsFromStandings } from "../utils/teams"

describe("team mapping", () => {
  it("derives all teams from the real standings response", () => {
    const teams = getTeamsFromStandings(standingsFixture)

    expect(teams).toHaveLength(32)
    expect(teams[0]).toMatchObject({ abbrev:"CAR", name:"Carolina Hurricanes" })
    expect(teams[31].abbrev).toBe("CGY")
  })

  it("uses the nested abbreviation for links and does not substitute the numeric id", () => {
    const teams = getTeamsFromStandings({ standings:[{
      id:8,
      teamAbbrev:{ default:"MTL" },
      teamName:{ default:"Montréal Canadiens" }
    }] })

    expect(teams[0].abbrev).toBe("MTL")
    expect(teams[0].abbrev).not.toBe("8")
  })
})
