import { describe, expect, it } from "vitest"
import { formatDate, getCurrentNhlSeason, getWeekStart, isValidDateString, parseDate } from "../utils/dates"

describe("date utilities", () => {
  it("formats dates in the NHL time zone", () => {
    const lateEveningEt = new Date("2026-01-01T04:30:00.000Z")

    expect(formatDate(lateEveningEt)).toBe("2025-12-31")
  })

  it("formats valid date strings without shifting their calendar day", () => {
    expect(formatDate("2026-10-05")).toBe("2026-10-05")
  })

  it("parses and validates calendar dates", () => {
    expect(parseDate("2026-02-28")).toEqual(new Date("2026-02-28T00:00:00.000Z"))
    expect(isValidDateString("2026-02-29")).toBe(false)
    expect(isValidDateString("2026-2-09")).toBe(false)
    expect(parseDate("not-a-date")).toBeNull()
  })

  it("returns the NHL season across the season boundary", () => {
    expect(getCurrentNhlSeason(new Date("2026-09-30T16:00:00.000Z"))).toBe("20252026")
    expect(getCurrentNhlSeason(new Date("2026-10-01T16:00:00.000Z"))).toBe("20262027")
  })

  it("normalizes schedule dates to a Monday week start", () => {
    expect(getWeekStart("2026-10-22")).toBe("2026-10-19")
    expect(getWeekStart("2026-10-19")).toBe("2026-10-19")
  })
})
