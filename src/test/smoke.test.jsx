import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("test setup", () => {
  it("renders a component", () => {
    render(<div>BlueLine</div>)

    expect(screen.getByText("BlueLine")).toBeInTheDocument()
  })
})
