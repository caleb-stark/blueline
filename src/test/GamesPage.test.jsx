import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

const { useGames } = vi.hoisted(() => ({
  useGames: vi.fn()
}))

vi.mock("../features/games/hooks/useGames", () => ({ default:useGames }))

import GamesPage from "../pages/GamesPage"

describe("GamesPage", () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it("keeps controls mounted while loading and refetches on retry", () => {
    const refetch = vi.fn()
    useGames.mockReturnValue({ games:[], loading:true, error:null, refetch })

    const { rerender } = render(<GamesPage />)

    expect(screen.getByRole("button", { name:"Previous week" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name:"Next week" })).toBeInTheDocument()
    expect(screen.queryByText("Refresh data")).not.toBeInTheDocument()
    expect(screen.getByText("Loading NHL data...")).toBeInTheDocument()

    useGames.mockReturnValue({ games:[], loading:false, error:"network down", refetch })
    rerender(<GamesPage />)

    fireEvent.click(screen.getByRole("button", { name:"Try again" }))
    expect(refetch).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("button", { name:"Next week" })).toBeInTheDocument()
  })

  it("changes the loaded week with navigation arrows", () => {
    useGames.mockReturnValue({ games:[], loading:false, error:null, refetch:vi.fn() })

    render(<GamesPage />)
    fireEvent.click(screen.getByRole("button", { name:"Next week" }))

    expect(useGames).toHaveBeenLastCalledWith("2026-10-26")
  })
})
