import React from "react";

import "@testing-library/jest-dom";
import {render, screen, fireEvent} from "@testing-library/react";
import {StatusFilter} from "@/models/status";

import StatusFilters from ".";

describe("StatusFilters", () => {
  const mockOnChange = jest.fn();

  const createMockProps = (status: Partial<StatusFilter> = {}) => ({
    statusFilter: {
      alive: true,
      dead: true,
      unknown: true,
      ...status,
    },
    onChange: mockOnChange,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all three status filters", () => {
    render(<StatusFilters {...createMockProps()} />);

    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Dead")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  test("displays correct checked state for filters", () => {
    const props = createMockProps({
      alive: true,
      dead: false,
      unknown: true,
    });

    render(<StatusFilters {...props} />);

    // Check input element checked state
    const inputs = screen.getAllByRole("checkbox");
    expect(inputs[0]).toBeChecked(); // Alive
    expect(inputs[1]).not.toBeChecked(); // Dead
    expect(inputs[2]).toBeChecked(); // Unknown

    const aliveContainer = screen.getByText("Alive").closest("label");
    const aliveOuterDiv = aliveContainer?.querySelector("div > div");
    const aliveInnerDot = aliveOuterDiv?.querySelector("div");
    expect(aliveOuterDiv).toHaveClass("border-green-500");
    expect(aliveInnerDot).toHaveClass("bg-green-500");

    const deadContainer = screen.getByText("Dead").closest("label");
    const deadOuterDiv = deadContainer?.querySelector("div > div");
    const deadInnerDot = deadOuterDiv?.querySelector("div");
    expect(deadInnerDot).not.toBeInTheDocument();
  });

  test("calls onChange with correct status when clicking filters", () => {
    render(<StatusFilters {...createMockProps()} />);

    fireEvent.click(screen.getByText("Alive"));
    expect(mockOnChange).toHaveBeenCalledWith("alive");

    fireEvent.click(screen.getByText("Dead"));
    expect(mockOnChange).toHaveBeenCalledWith("dead");

    fireEvent.click(screen.getByText("Unknown"));
    expect(mockOnChange).toHaveBeenCalledWith("unknown");

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  test("applies correct border color based on filter state", () => {
    const props = createMockProps({
      alive: true,
      dead: false,
      unknown: true,
    });

    render(<StatusFilters {...props} />);

    const aliveContainer = screen.getByText("Alive").closest("label");
    const deadContainer = screen.getByText("Dead").closest("label");
    const unknownContainer = screen.getByText("Unknown").closest("label");

    const aliveBorder = aliveContainer?.querySelector("div > div");
    const deadBorder = deadContainer?.querySelector("div > div");
    const unknownBorder = unknownContainer?.querySelector("div > div");

    expect(aliveBorder).toHaveClass("border-green-500");
    expect(deadBorder).toHaveClass("border-gray-600");
    expect(unknownBorder).toHaveClass("border-gray-500");
  });

  test("renders in responsive layout", () => {
    const {container} = render(<StatusFilters {...createMockProps()} />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("flex");
    expect(mainContainer).toHaveClass("flex-wrap");
  });
});
