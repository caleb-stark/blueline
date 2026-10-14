import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import GameCard from "../features/games/components/GameCard"
import scoreFixture from "./fixtures/score-2026-10-12.json"

describe("GameCard", () => {
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

  it("does not render scores for a scheduled game", () => {
    render(
      <MemoryRouter>
        <GameCard game={{ id:2026020106, gameState:"FUT", awayTeam:{ abbrev:"MTL" }, homeTeam:{ abbrev:"WSH" } }} />
      </MemoryRouter>
    )

    expect(screen.getByText("Scheduled")).toBeInTheDocument()
    expect(screen.getAllByText("—")).toHaveLength(2)
  })
})
