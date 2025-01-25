import { render } from "@testing-library/react";
import { RoutineForm } from "../RoutineForm";

describe("RoutineForm", () => {
  it("Renders a form that allows users to create a routine with as many tasks as they want", () => {
    render(<RoutineForm />);
  });
});
