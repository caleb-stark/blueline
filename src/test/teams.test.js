import { describe, expect, it } from "vitest"
import standingsFixture from "./fixtures/standings-2026-10-14.json"
import { getTeamsFromStandings } from "../utils/teams"

describe("team mapping", () => {
  it("derives all teams from the real standings response", () => {
    const teams = getTeamsFromStandings(standingsFixture)

    expect(teams).toHaveLength(32)
    expect(teams[0]).toMatchObject({ abbrev:"ANA", name:"Anaheim Ducks" })
    expect(teams[31]).toMatchObject({ abbrev:"WPG", name:"Winnipeg Jets" })
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

  it("sorts teams alphabetically by display name", () => {
    const teams = getTeamsFromStandings({ standings:[
      { teamAbbrev:{ default:"TOR" }, teamName:{ default:"Toronto Maple Leafs" } },
      { teamAbbrev:{ default:"ANA" }, teamName:{ default:"Anaheim Ducks" } }
    ] })

    expect(teams.map(team => team.name)).toEqual(["Anaheim Ducks", "Toronto Maple Leafs"])
  })
})
