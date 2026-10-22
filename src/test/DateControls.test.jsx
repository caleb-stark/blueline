import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import DateControls from "../features/games/components/DateControls"

describe("DateControls", () => {
  it("moves the selected date by one day", () => {
    const onDateChange = vi.fn()

    render(<DateControls selectedDate="2026-10-22" onDateChange={onDateChange} />)

    expect(screen.getByText("Oct 22, 2026")).toBeInTheDocument()
    expect(screen.getByText("Today")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name:"Next day" }))

    expect(onDateChange).toHaveBeenCalledWith("2026-10-23")
  })
})
