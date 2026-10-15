import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import GameScoreboard from "../features/games/components/GameScoreboard"
import ScoringSummary from "../features/games/components/ScoringSummary"
import PenaltySummary from "../features/games/components/PenaltySummary"
import PlayByPlay from "../features/games/components/PlayByPlay"

const landing = {
  gameState:"OFF",
  awayTeam:{ abbrev:"FLA", score:3 },
  homeTeam:{ abbrev:"BUF", score:5 },
  summary:{ scoring:[{ goals:[{ eventId:1, playerId:847, name:{ default:"J. Doan" }, teamAbbrev:{ default:"BUF" }, timeInPeriod:"05:58" }] }] }
}

describe("game detail components", () => {
  it("renders the verified scoreboard fields", () => {
    render(<GameScoreboard landing={landing} />)
    expect(screen.getByText("FLA")).toBeInTheDocument()
    expect(screen.getByText("BUF")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("links scoring players by player id", () => {
    render(<MemoryRouter><ScoringSummary landing={landing} /></MemoryRouter>)
    expect(screen.getByRole("link", { name:"J. Doan" })).toHaveAttribute("href", "/players/847")
  })

  it("maps penalties and safely labels unknown play types", () => {
    const playByPlay = { plays:[{ eventId:2, typeDescKey:"penalty", timeInPeriod:"15:15", details:{ duration:2, descKey:"holding" } }, { eventId:3, typeDescKey:"unknown-event", timeInPeriod:"01:00", details:{} }] }
    render(<><PenaltySummary playByPlay={playByPlay} /><PlayByPlay playByPlay={playByPlay} /></>)
    expect(screen.getAllByText("holding")).toHaveLength(2)
    expect(screen.getByText("unknown-event")).toBeInTheDocument()
  })
})
