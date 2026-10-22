import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PlayerHeader from "../features/players/components/PlayerHeader"
import PlayerSeasonStats from "../features/players/components/PlayerSeasonStats"
import PlayerGameLog from "../features/players/components/PlayerGameLog"

const player = {
  firstName:{ default:"Sebastian" },
  lastName:{ default:"Aho" },
  fullTeamName:{ default:"Carolina Hurricanes" },
  position:"C",
  sweaterNumber:20,
  headshot:"headshot.png",
  featuredStats:{ regularSeason:{ subSeason:{ gamesPlayed:11, goals:6, assists:8, points:14 }, career:{ gamesPlayed:767, goals:316, assists:409, points:725 } } }
}

describe("player detail components", () => {
  it("maps verified player identity fields", () => {
    render(<PlayerHeader player={player} />)
    expect(screen.getByRole("heading", { name:"Sebastian Aho" })).toBeInTheDocument()
    expect(screen.getByText("Carolina Hurricanes · C · #20")).toBeInTheDocument()
  })

  it("separates current season and career stats", () => {
    render(<PlayerSeasonStats player={player} />)
    expect(screen.getByRole("heading", { name:"Current season" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name:"Career" })).toBeInTheDocument()
    expect(screen.getByText("14")).toBeInTheDocument()
    expect(screen.getByText("725")).toBeInTheDocument()
  })

  it("renders game log selectors and rows", () => {
    render(<PlayerGameLog gameLog={[{ gameId:1, gameDate:"2026-10-20", opponentAbbrev:"VAN", goals:1, assists:2, points:3 }]} gameType="2" season="20262027" loading={false} error={null} onGameTypeChange={() => {}} />)
    expect(screen.getByRole("combobox")).toHaveValue("2")
    expect(screen.getByText("VAN")).toBeInTheDocument()
    expect(screen.getByText("1 G · 2 A · 3 P")).toBeInTheDocument()
  })
})
