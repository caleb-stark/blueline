import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import GameScoreboard from "../features/games/components/GameScoreboard"
import BoxScore from "../features/games/components/BoxScore"
import ScoringSummary from "../features/games/components/ScoringSummary"
import PenaltySummary from "../features/games/components/PenaltySummary"
import PlayByPlay from "../features/games/components/PlayByPlay"
import GameHighlights from "../features/games/components/GameHighlights"

afterEach(() => cleanup())

const landing = {
  gameState:"OFF",
  awayTeam:{ abbrev:"FLA", score:3 },
  homeTeam:{ abbrev:"BUF", score:5 },
  summary:{ scoring:[{ goals:[{ eventId:1, playerId:847, name:{ default:"J. Doan" }, teamAbbrev:{ default:"BUF" }, timeInPeriod:"05:58", highlightClipSharingUrl:"https://www.nhl.com/video/example" }] }] }
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

  it("omits score placeholders for scheduled games", () => {
    render(
      <GameScoreboard
        landing={{
          gameState:"FUT",
          awayTeam:{ abbrev:"NYR", logo:"nyr.svg" },
          homeTeam:{ abbrev:"TOR", logo:"tor.svg" }
        }}
      />
    )

    expect(screen.getByText("Scheduled").closest("section")).toHaveClass("game-scoreboard-scheduled")
    expect(screen.getByText("NYR")).toBeInTheDocument()
    expect(screen.getByText("TOR")).toBeInTheDocument()
    expect(screen.getByText("at")).toBeInTheDocument()
    expect(screen.queryAllByText("—")).toHaveLength(0)
  })

  it("uses the shared red live status treatment", () => {
    render(<GameScoreboard landing={{ gameState:"LIVE", awayTeam:{ abbrev:"NYR", score:2 }, homeTeam:{ abbrev:"TOR", score:1 } }} />)

    expect(screen.getByText("Live")).toHaveClass("game-scoreboard-status-live")
    expect(screen.getByText("Live").closest("section")).toHaveClass("game-scoreboard-live")
  })

  it("renders the NHL box-score player groups", () => {
    render(
      <MemoryRouter>
        <BoxScore
          boxScore={{
            playerByGameStats:{
              awayTeam:{ forwards:[{ playerId:1, name:{ default:"Away Player" }, goals:1, assists:2, points:3 }, { playerId:3, name:{ default:"Away Scorer" }, goals:0, assists:0, points:0 }], defense:[], goalies:[{ playerId:4, name:{ default:"Away Goalie" }, saves:12 }, { playerId:5, name:{ default:"Unused Goalie" }, saves:0 }] },
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
    expect(screen.queryByText("Unused Goalie")).not.toBeInTheDocument()
  })

  it("links scoring players by player id", () => {
    render(<MemoryRouter><ScoringSummary landing={landing} /></MemoryRouter>)
    expect(screen.getByRole("link", { name:"J. Doan" })).toHaveAttribute("href", "/players/847")
  })

  it("shows one goal highlight at a time and only available navigation", () => {
    render(<GameHighlights landing={{ ...landing, summary:{ scoring:[{ goals:[
      { eventId:1, name:{ default:"First goal" }, teamAbbrev:{ default:"BUF" }, highlightClipSharingUrl:"https://www.nhl.com/video/first" },
      { eventId:2, name:{ default:"Second goal" }, teamAbbrev:{ default:"FLA" }, highlightClipSharingUrl:"https://www.nhl.com/video/second" }
    ] }] } }} />)

    expect(screen.getByRole("heading", { name:"Game Highlights" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name:/First goal/ })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name:/Second goal/ })).toHaveAttribute("aria-pressed", "false")
    expect(screen.getByRole("button", { name:"Scroll goals down" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name:/Second goal/ }))

    expect(screen.getByRole("button", { name:/First goal/ })).toHaveAttribute("aria-pressed", "false")
    expect(screen.getByRole("button", { name:/Second goal/ })).toHaveAttribute("aria-pressed", "true")
  })

  it("uses a highlight thumbnail when the NHL goal provides one", () => {
    render(<GameHighlights landing={{ ...landing, summary:{ scoring:[{ goals:[
      { eventId:1, name:{ default:"Goal" }, teamAbbrev:{ default:"BUF" }, highlightClipSharingUrl:"https://www.nhl.com/video/goal", highlightClip:{ thumbnailUrl:"goal.jpg" } }
    ] }] } }} />)

    expect(screen.getByRole("presentation")).toHaveAttribute("src", "goal.jpg")
  })

  it("uses the scorer headshot when a highlight has no thumbnail", () => {
    render(<GameHighlights
      landing={{ ...landing, awayTeam:{ ...landing.awayTeam, logo:"buf.svg" }, summary:{ scoring:[{ goals:[
        { eventId:1, playerId:847, name:{ default:"Goal" }, teamAbbrev:{ default:"BUF" }, highlightClipSharingUrl:"https://www.nhl.com/video/goal" }
      ] }] } }}
      boxScore={{ playerByGameStats:{ awayTeam:{ forwards:[{ playerId:"847", headshot:"player.jpg" }] }, homeTeam:{} } }}
    />)

    expect(screen.getByRole("presentation")).toHaveAttribute("src", "player.jpg")
  })

  it("does not render media sections for scheduled or scoreless games", () => {
    const scheduled = { ...landing, gameState:"FUT" }
    const scoreless = { ...landing, summary:{ scoring:[] } }

    render(<><GameHighlights landing={scheduled} /><ScoringSummary landing={scoreless} /></>)

    expect(screen.queryByRole("heading", { name:"Highlights" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name:"Scoring summary" })).not.toBeInTheDocument()
  })

  it("maps penalties and safely labels unknown play types", () => {
    const playByPlay = { plays:[{ eventId:2, typeDescKey:"penalty", timeInPeriod:"15:15", details:{ duration:2, descKey:"holding" } }, { eventId:3, typeDescKey:"shot-on-goal", timeInPeriod:"01:00", details:{ shotType:"wrist" } }] }
    render(<><PenaltySummary playByPlay={playByPlay} /><PlayByPlay playByPlay={playByPlay} /></>)
    expect(screen.getAllByText("holding")).toHaveLength(2)
    expect(screen.getByText("Shot On Goal")).toBeInTheDocument()
    expect(screen.getByText("Wrist shot")).toBeInTheDocument()
  })
})
