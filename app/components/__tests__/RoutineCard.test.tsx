import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect } from "vitest";

import { RoutineCard } from "../RoutineCard";

const testRoutine = {
    id: "1",

    name: "Test Routine",
    tasks: [{id: "1", name: "Task 1"}, {id: "2", name: "Task 2"}, {id: "3", name: "Task 3"}, {id: "4", name: "Task 4"},],
  };

describe("RoutineCard", () => {
  it("renders correctly", () => {
    const { container } = render(
      <RoutineCard
        routine={testRoutine}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it("displays the routine heading", () => {
    render(
      <RoutineCard
        routine={testRoutine}
      />,
    );
    expect(screen.getByText("Test Routine")).toBeInTheDocument();
  });
  it("displays all the tasks for the routine", () => {
    render(
        <RoutineCard
        routine={testRoutine}
      />,
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();
  });
  it("allows the user to mark tasks as complete", () => {
    render(
        <RoutineCard
        routine={testRoutine}
      />,
    );
    const task1Switch = screen.getByTestId("task-1-switch");
    fireEvent.click(task1Switch);
    expect(task1Switch).toBeChecked();
  });
});
