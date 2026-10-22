import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import scheduleFixture from "./fixtures/schedule-2026-10-14.json"
import ScheduleWeek from "../features/games/components/ScheduleWeek"

describe("ScheduleWeek", () => {
  it("groups the schedule by API-provided day and links games", () => {
    render(
      <MemoryRouter>
        <ScheduleWeek gameWeek={scheduleFixture.gameWeek} />
      </MemoryRouter>
    )

    expect(screen.getByLabelText("Weekly NHL schedule")).toBeInTheDocument()
    expect(screen.getByText("Wed")).toBeInTheDocument()
    expect(screen.getByText("Thu")).toBeInTheDocument()
    expect(screen.getByText("MTL")).toBeInTheDocument()
    expect(screen.getByText("COL")).toBeInTheDocument()
    expect(screen.getByRole("link", { name:/MTL.*vs.*WSH/ })).toHaveAttribute("href", "/games/2026020106")
  })

  it("ignores malformed days without a date", () => {
    const { container } = render(<ScheduleWeek gameWeek={[{ games:[] }]} />)

    expect(container.firstChild).toBeNull()
  })
})
