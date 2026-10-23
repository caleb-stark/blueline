import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import DateControls from "../features/games/components/DateControls"
import { formatDate, shiftDate } from "../utils/dates"

describe("DateControls", () => {
  it("moves the selected date by one day", () => {
    const onDateChange = vi.fn()
    const selectedDate = formatDate()
    const expectedDate = new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric", year:"numeric" }).format(new Date(`${selectedDate}T12:00:00`))

    render(<DateControls selectedDate={selectedDate} onDateChange={onDateChange} />)

    expect(screen.getByText(expectedDate)).toBeInTheDocument()
    expect(screen.getByText("Today")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name:"Next day" }))

    expect(onDateChange).toHaveBeenCalledWith(shiftDate(selectedDate, 1))
  })
})
