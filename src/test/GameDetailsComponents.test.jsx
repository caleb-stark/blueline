import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import GameScoreboard from "../features/games/components/GameScoreboard"
import BoxScore from "../features/games/components/BoxScore"
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
    render(<GameScoreboard landing={{ ...landing, awayTeam:{ ...landing.awayTeam, logo:"fla.svg" }, homeTeam:{ ...landing.homeTeam, logo:"buf.svg" } }} />)
    expect(screen.getByText("FLA")).toBeInTheDocument()
    expect(screen.getByText("BUF")).toBeInTheDocument()
    expect(screen.getByText("Final")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByAltText("FLA logo")).toHaveAttribute("src", "fla.svg")
    expect(screen.getByAltText("BUF logo")).toHaveAttribute("src", "buf.svg")
  })

  it("renders the NHL box-score player groups", () => {
    render(
      <MemoryRouter>
        <BoxScore
          boxScore={{
            playerByGameStats:{
              awayTeam:{ forwards:[{ playerId:1, name:{ default:"Away Player" }, goals:1, assists:2, points:3 }, { playerId:3, name:{ default:"Away Scorer" }, goals:0, assists:0, points:0 }], defense:[], goalies:[{ playerId:4, name:{ default:"Away Goalie" }, saves:12 }] },
              homeTeam:{ forwards:[], defense:[{ playerId:2, name:{ default:"Home Player" }, goals:0, assists:1, points:1 }], goalies:[] }
            }
          }}
        />
      </MemoryRouter>
    )

    expect(screen.getAllByText("Skaters")).toHaveLength(2)
    expect(screen.getByText("Goalies")).toBeInTheDocument()
    expect(screen.getByRole("link", { name:"Away Player" })).toHaveAttribute("href", "/players/1")
    expect(screen.getByText("12 SV")).toBeInTheDocument()
    expect(screen.queryByText("Away Scorer")).not.toBeInTheDocument()
  })

  it("links scoring players by player id", () => {
    render(<MemoryRouter><ScoringSummary landing={landing} /></MemoryRouter>)
    expect(screen.getByRole("link", { name:"J. Doan" })).toHaveAttribute("href", "/players/847")
  })

  it("maps penalties and safely labels unknown play types", () => {
    const playByPlay = { plays:[{ eventId:2, typeDescKey:"penalty", timeInPeriod:"15:15", details:{ duration:2, descKey:"holding" } }, { eventId:3, typeDescKey:"shot-on-goal", timeInPeriod:"01:00", details:{ shotType:"wrist" } }] }
    render(<><PenaltySummary playByPlay={playByPlay} /><PlayByPlay playByPlay={playByPlay} /></>)
    expect(screen.getAllByText("holding")).toHaveLength(2)
    expect(screen.getByText("Shot On Goal")).toBeInTheDocument()
    expect(screen.getByText("Wrist shot")).toBeInTheDocument()
  })
})
