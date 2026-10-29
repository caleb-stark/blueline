import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import TeamHeader from "../features/teams/components/TeamHeader"
import TeamStats from "../features/teams/components/TeamStats"
import TeamRoster from "../features/teams/components/TeamRoster"

function renderWithRouter(element){
  return render(<MemoryRouter>{element}</MemoryRouter>)
}

describe("team detail components", () => {
  it("maps verified team fields and preserves the team abbreviation", () => {
    renderWithRouter(<TeamHeader team={{ teamName:{ default:"Carolina Hurricanes" }, teamAbbrev:{ default:"CAR" }, teamLogo:"logo.png" }} />)

    expect(screen.getByRole("heading", { name:"Carolina Hurricanes" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name:"CAR" })).toHaveAttribute("href", "/teams/CAR")
    expect(screen.getByAltText("")).toHaveAttribute("src", "logo.png")
  })

  it("renders current team stats and handles missing fields", () => {
    const { rerender } = renderWithRouter(<TeamStats stats={{ skaters:[{}], goalies:[{},{}] }} />)

    expect(screen.getByText("Skaters listed")).toBeInTheDocument()
    expect(screen.getByText("Goalies listed")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()

    rerender(<MemoryRouter><TeamStats stats={{}} /></MemoryRouter>)
    expect(screen.getByText("No club stats available")).toBeInTheDocument()

    rerender(<MemoryRouter><TeamStats team={{ gamesPlayed:10, wins:7, losses:2, otLosses:1, points:15, goalFor:34, goalAgainst:25 }} /></MemoryRouter>)
    expect(screen.getByText("Games played")).toBeInTheDocument()
    expect(screen.getByText("34")).toBeInTheDocument()
    expect(screen.queryByText("Skaters listed")).not.toBeInTheDocument()
  })

  it("groups roster players and links only players with NHL ids", () => {
    renderWithRouter(<TeamRoster roster={{
      forwards:[
        { id:8471, firstName:{ default:"First" }, lastName:{ default:"Forward" }, positionCode:"L" },
        { id:8473, firstName:{ default:"Right" }, lastName:{ default:"Forward" }, positionCode:"R" },
        { id:8474, firstName:{ default:"Unknown" }, lastName:{ default:"Forward" } }
      ],
      defensemen:[{ id:8472, firstName:{ default:"First" }, lastName:{ default:"Defense" } }],
      goalies:[{ firstName:{ default:"No" }, lastName:{ default:"Id" } }]
    }} />)

    expect(screen.getByRole("heading", { name:"Forwards" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name:"Defensemen" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name:"Goalies" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name:/First Forward/ })).toHaveAttribute("href", "/players/8471")
    expect(screen.getByRole("link", { name:/First Defense/ })).toHaveAttribute("href", "/players/8472")
    expect(screen.getByText("LW")).toBeInTheDocument()
    expect(screen.getByText("RW")).toBeInTheDocument()
    expect(screen.getByText("No Id")).toBeInTheDocument()
    expect(screen.getAllByText("F")).toHaveLength(1)
    expect(screen.queryByRole("link", { name:"No Id" })).not.toBeInTheDocument()
  })
})
