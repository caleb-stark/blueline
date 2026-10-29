import { cleanup, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import standingsFixture from "./fixtures/standings-2026-10-14.json"
import StandingsTable from "../features/standings/components/StandingsTable"
import StandingsPreview from "../features/standings/components/StandingsPreview"
import StandingsSections from "../features/standings/components/StandingsSections"

afterEach(() => cleanup())

describe("standings components", () => {
  it("renders verified fields in API order and links teams", () => {
    render(
      <MemoryRouter>
        <StandingsTable standings={standingsFixture.standings.slice(0, 2)} />
      </MemoryRouter>
    )

    expect(screen.getByText("Carolina Hurricanes")).toBeInTheDocument()
    expect(screen.getByText("New York Rangers")).toBeInTheDocument()
    expect(screen.getByRole("link", { name:"Carolina Hurricanes" })).toHaveAttribute("href", "/teams/CAR")
    expect(screen.getAllByText("13")).toHaveLength(1)
  })

  it("renders a placeholder for missing numeric fields", () => {
    render(
      <MemoryRouter>
        <StandingsTable standings={[{ teamAbbrev:{ default:"TST" }, teamName:{ default:"Test Team" } }]} />
      </MemoryRouter>
    )

    expect(screen.getAllByText("—")).toHaveLength(5)
  })

  it("accepts the real object shape in the preview", () => {
    render(<StandingsPreview standings={standingsFixture} />)

    expect(screen.getByText("CAR")).toBeInTheDocument()
    expect(screen.getByText("NYR")).toBeInTheDocument()
  })

  it("groups teams into division sections in the requested order", () => {
    render(<MemoryRouter><StandingsSections standings={[
      { teamAbbrev:{ default:"CAR" }, teamName:{ default:"Carolina Hurricanes" }, divisionName:"Metropolitan", conferenceName:"Eastern" },
      { teamAbbrev:{ default:"BOS" }, teamName:{ default:"Boston Bruins" }, divisionName:"Atlantic", conferenceName:"Eastern" },
      { teamAbbrev:{ default:"COL" }, teamName:{ default:"Colorado Avalanche" }, divisionName:"Central", conferenceName:"Western" }
    ]} view="division" /></MemoryRouter>)

    expect(screen.getAllByRole("heading", { level:3 }).map(heading => heading.textContent)).toEqual(["Atlantic", "Metropolitan", "Central"])
    expect(screen.getByText("Boston Bruins")).toBeInTheDocument()
  })

  it("groups teams into conference sections", () => {
    render(<MemoryRouter><StandingsSections standings={[
      { teamAbbrev:{ default:"CAR" }, teamName:{ default:"Carolina Hurricanes" }, divisionName:"Metropolitan", conferenceName:"Eastern" },
      { teamAbbrev:{ default:"COL" }, teamName:{ default:"Colorado Avalanche" }, divisionName:"Central", conferenceName:"Western" }
    ]} view="conference" /></MemoryRouter>)

    expect(screen.getAllByRole("heading", { level:3 }).map(heading => heading.textContent)).toEqual(["Eastern", "Western"])
  })

  it("shows the top two wildcard teams in each conference", () => {
    render(<MemoryRouter><StandingsSections standings={[
      { teamAbbrev:{ default:"FLA" }, teamName:{ default:"Florida Panthers" }, conferenceName:"Eastern", wildcardSequence:1 },
      { teamAbbrev:{ default:"TOR" }, teamName:{ default:"Toronto Maple Leafs" }, conferenceName:"Eastern", wildcardSequence:2 },
      { teamAbbrev:{ default:"COL" }, teamName:{ default:"Colorado Avalanche" }, conferenceName:"Western", wildcardSequence:1 },
      { teamAbbrev:{ default:"NSH" }, teamName:{ default:"Nashville Predators" }, conferenceName:"Western", wildcardSequence:2 },
      { teamAbbrev:{ default:"TBL" }, teamName:{ default:"Tampa Bay Lightning" }, conferenceName:"Eastern", wildcardSequence:3 }
    ]} view="wildcard" /></MemoryRouter>)

    expect(screen.getAllByRole("heading", { level:3 }).map(heading => heading.textContent)).toEqual(["Eastern Wild Card", "Western Wild Card"])
    expect(screen.getByText("Florida Panthers")).toBeInTheDocument()
    expect(screen.queryByText("Tampa Bay Lightning")).not.toBeInTheDocument()
  })

})
