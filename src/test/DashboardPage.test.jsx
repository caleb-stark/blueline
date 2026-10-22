import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import standingsFixture from "./fixtures/standings-2026-10-14.json"

const { useDashboardData } = vi.hoisted(() => ({
  useDashboardData:vi.fn()
}))

vi.mock("../features/dashboard/hooks/useDashboardData", () => ({ default:useDashboardData }))

import DashboardPage from "../pages/DashboardPage"

describe("DashboardPage", () => {
  afterEach(() => vi.clearAllMocks())

  it("shows the league snapshot, three-game limit, and top five teams", () => {
    const games = Array.from({ length:4 }, (_, index) => ({
      id:index + 1,
      gameState:"FUT",
      awayTeam:{ abbrev:`A${index}` },
      homeTeam:{ abbrev:`H${index}` }
    }))
    useDashboardData.mockReturnValue({
      games,
      scores:[],
      standings:standingsFixture.standings,
      loading:false,
      error:null,
      refetch:vi.fn()
    })

    render(<MemoryRouter><DashboardPage /></MemoryRouter>)

    expect(screen.getByRole("heading", { name:"Dashboard" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name:"Today's games" })).toBeInTheDocument()
    expect(screen.getByText("Scheduled across the league").closest("article")).not.toHaveClass("hero-stat")
    expect(screen.queryByText("Teams tracked")).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name:"Refresh data" })).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name:"See full standings" })).toHaveAttribute("href", "/standings")
    expect(screen.getAllByText("Scheduled")).toHaveLength(3)
    expect(screen.getByText("Carolina Hurricanes")).toBeInTheDocument()
    expect(screen.getByText("Utah Mammoth")).toBeInTheDocument()
    expect(screen.queryByText("Boston Bruins")).not.toBeInTheDocument()
  })

  it("renders a retryable error state", () => {
    const refetch = vi.fn()
    useDashboardData.mockReturnValue({ games:[], scores:[], standings:[], loading:false, error:"unavailable", refetch })

    render(<MemoryRouter><DashboardPage /></MemoryRouter>)

    expect(screen.getAllByText("unavailable")).toHaveLength(2)
    screen.getAllByRole("button", { name:"Try again" })[0].click()
    expect(refetch).toHaveBeenCalledTimes(1)
  })
})
