import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import standingsFixture from "./fixtures/standings-2026-10-14.json"

const { getStandings } = vi.hoisted(() => ({
  getStandings:vi.fn()
}))

vi.mock("../features/standings/api/standingsApi", () => ({ getStandings }))

import useStandings from "../features/standings/hooks/useStandings"

describe("useStandings", () => {
  it("maps the real standings response array", async () => {
    getStandings.mockResolvedValue(standingsFixture)

    const { result } = renderHook(() => useStandings("now"))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.standings).toHaveLength(32)
    expect(result.current.standings[0].teamAbbrev.default).toBe("CAR")
    expect(result.current.standings[0].points).toBe(13)
    expect(getStandings).toHaveBeenCalledWith("now", expect.objectContaining({ signal:expect.any(AbortSignal) }))
  })

  it("handles errors and empty standings", async () => {
    getStandings.mockRejectedValueOnce(new Error("unavailable"))
    const { result } = renderHook(() => useStandings())

    await waitFor(() => expect(result.current.error).toBe("unavailable"))
    expect(result.current.standings).toEqual([])
  })
})
