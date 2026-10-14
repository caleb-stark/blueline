import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import scoreFixture from "./fixtures/score-2026-10-12.json"

const { useScores } = vi.hoisted(() => ({
  useScores:vi.fn()
}))

vi.mock("../features/games/hooks/useScores", () => ({ default:useScores }))

import ScoresPage from "../pages/ScoresPage"

describe("ScoresPage", () => {
  it("reuses game cards to show final scores", () => {
    useScores.mockReturnValue({ games:scoreFixture.games, loading:false, error:null, refetch:vi.fn() })

    render(
      <MemoryRouter>
        <ScoresPage />
      </MemoryRouter>
    )

    expect(screen.getAllByText("Final")).toHaveLength(2)
    expect(screen.getByRole("link", { name:/PanthersFLA SabresBUF/ })).toHaveAttribute("href", "/games/2026020087")
  })
})
