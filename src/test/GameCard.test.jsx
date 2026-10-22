import { cleanup, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import GameCard from "../features/games/components/GameCard"
import scoreFixture from "./fixtures/score-2026-10-12.json"

describe("GameCard", () => {
  afterEach(() => cleanup())

  it("shows a final score and game details link", () => {
    render(
      <MemoryRouter>
        <GameCard game={scoreFixture.games[0]} />
      </MemoryRouter>
    )

    expect(screen.getByText("Final")).toBeInTheDocument()
    expect(screen.getByText("BUF")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/games/2026020087")
  })

  it("centers each score within its team column", () => {
    render(
      <MemoryRouter>
        <GameCard game={scoreFixture.games[0]} />
      </MemoryRouter>
    )

    expect(screen.getByText("3").closest(".game-card-team")).toHaveClass("game-card-away")
    expect(screen.getByText("5").closest(".game-card-team")).toHaveClass("game-card-home")
  })

  it("shows logos on score cards when the API provides them", () => {
    render(
      <MemoryRouter>
        <GameCard
          variant="scores"
          game={{
            id:2026020087,
            gameState:"OFF",
            awayTeam:{ abbrev:"FLA", logo:"fla.svg", score:3 },
            homeTeam:{ abbrev:"BUF", logo:"buf.svg", score:5 }
          }}
        />
      </MemoryRouter>
    )

    expect(screen.getByAltText("FLA logo")).toHaveAttribute("src", "fla.svg")
    expect(screen.getByAltText("BUF logo")).toHaveAttribute("src", "buf.svg")
  })

  it("uses a versus label without score placeholders for a scheduled game", () => {
    render(
      <MemoryRouter>
        <GameCard game={{ id:2026020106, gameState:"FUT", awayTeam:{ abbrev:"MTL" }, homeTeam:{ abbrev:"WSH" } }} />
      </MemoryRouter>
    )

    expect(screen.getByText("Scheduled")).toBeInTheDocument()
    expect(screen.getByText("VS")).toBeInTheDocument()
    expect(screen.queryAllByText("—")).toHaveLength(0)
  })

  it("uses a neutral versus label for upcoming score cards", () => {
    render(
      <MemoryRouter>
        <GameCard
          variant="scores"
          game={{ id:2026020106, gameState:"FUT", awayTeam:{ abbrev:"MTL" }, homeTeam:{ abbrev:"WSH" } }}
        />
      </MemoryRouter>
    )

    expect(screen.getByText("VS")).toBeInTheDocument()
    expect(screen.queryAllByText("—")).toHaveLength(0)
    expect(screen.getByText("Scheduled").closest("article")).not.toHaveClass("game-card-live")
  })

  it("marks only live score cards with the live class", () => {
    render(
      <MemoryRouter>
        <GameCard
          variant="scores"
          game={{ id:2026020106, gameState:"LIVE", awayTeam:{ abbrev:"MTL", score:1 }, homeTeam:{ abbrev:"WSH", score:2 } }}
        />
      </MemoryRouter>
    )

    expect(screen.getByText("Live").closest("article")).toHaveClass("game-card-live")
  })
})
