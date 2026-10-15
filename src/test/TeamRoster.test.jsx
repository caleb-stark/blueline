import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import TeamRoster from "../features/teams/components/TeamRoster"

describe("TeamRoster", () => {
  it("renders empty groups and safely handles missing player fields", () => {
    render(
      <MemoryRouter>
        <TeamRoster roster={{ forwards:[], defensemen:[{}] }} />
      </MemoryRouter>
    )

    expect(screen.getByText("No players listed.")).toBeInTheDocument()
    expect(screen.getByText("Unnamed player")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name:"Goalies" })).toBeInTheDocument()
  })

  it("shows an empty state when roster groups are missing", () => {
    render(<MemoryRouter><TeamRoster /></MemoryRouter>)

    expect(screen.getByText("No roster available")).toBeInTheDocument()
  })
})
