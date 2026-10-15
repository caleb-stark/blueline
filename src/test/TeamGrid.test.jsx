import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import TeamGrid from "../features/teams/components/TeamGrid"
import standingsFixture from "./fixtures/standings-2026-10-14.json"
import { getTeamsFromStandings } from "../utils/teams"

describe("TeamGrid", () => {
  it("renders teams with abbreviation links", () => {
    const teams = getTeamsFromStandings(standingsFixture).slice(0, 2).map((team) => ({ ...team, logo:"logo.png" }))

    render(
      <MemoryRouter>
        <TeamGrid teams={teams} />
      </MemoryRouter>
    )

    expect(screen.getByText("Carolina Hurricanes")).toBeInTheDocument()
    expect(screen.getByRole("link", { name:"Carolina Hurricanes" })).toHaveAttribute("href", "/teams/CAR")
    expect(screen.getByRole("link", { name:"New York Rangers" })).toHaveAttribute("href", "/teams/NYR")
    expect(screen.getAllByAltText("")[0]).toHaveAttribute("loading", "lazy")
    expect(screen.getAllByAltText("")[0]).toHaveAttribute("width", "48")
  })
})
