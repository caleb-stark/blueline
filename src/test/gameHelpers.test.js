import { describe, expect, it } from "vitest"
import scheduleFixture from "./fixtures/schedule-2026-10-14.json"
import scoreFixture from "./fixtures/score-2026-10-12.json"
import { gameHasStarted, getGameState, getGameStatusLabel, getScore, getTeamAbbrev } from "../utils/games"

describe("game helpers", () => {
  it("maps verified scheduled and final API states", () => {
    const scheduledGame = scheduleFixture.gameWeek[0].games[0]
    const finalGame = scoreFixture.games[0]

    expect(getGameState(scheduledGame)).toBe("scheduled")
    expect(getGameStatusLabel(scheduledGame)).toBe("Scheduled")
    expect(gameHasStarted(scheduledGame)).toBe(false)
    expect(getGameState(finalGame)).toBe("final")
    expect(getGameStatusLabel(finalGame)).toBe("Final")
    expect(gameHasStarted(finalGame)).toBe(true)
  })

  it("returns team abbreviations, scores, and explicit missing values", () => {
    expect(getTeamAbbrev(scoreFixture.games[0].awayTeam)).toBe("FLA")
    expect(getScore(scoreFixture.games[0].homeTeam)).toBe(5)
    expect(getScore(scheduleFixture.gameWeek[0].games[0].homeTeam)).toBeNull()
    expect(getTeamAbbrev({})).toBeNull()
  })

  it("recognizes postponed and unknown states without crashing", () => {
    expect(getGameStatusLabel({ gameState:"PPD" })).toBe("Postponed")
    expect(getGameStatusLabel({ gameState:"UNEXPECTED" })).toBe("Status unavailable")
  })
})
