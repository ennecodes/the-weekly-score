import { render, screen} from "@testing-library/react";

import { RoutineSummary } from "../RoutineSummary";

describe("RoutineSummary", () => {
    it("renders correctly", () => {
        const { container } = render(<RoutineSummary routines={[]} />);
        expect(container).toMatchSnapshot();
    });
    it("displays the routine cards", () => {
        const testRoutines = [
            {id: "1", name: "Routine 1", tasks: []},
            {id: "2", name: "Routine 2", tasks: []},
            {id: "3", name: "Routine 3", tasks: []},
        ];
        render(<RoutineSummary routines={testRoutines} />);
        expect(screen.getByText("Routine 1")).toBeInTheDocument();
        expect(screen.getByText("Routine 2")).toBeInTheDocument();
        expect(screen.getByText("Routine 3")).toBeInTheDocument();
    });
    it("Allows the user to add a new routine", () => {
        const testRoutines = [
            {id: "1", name: "Routine 1", tasks: []},
            {id: "2", name: "Routine 2", tasks: []},
            {id: "3", name: "Routine 3", tasks: []},
        ];
        const { container } = render(<RoutineSummary routines={testRoutines} />);
        const button = screen.getByText("Add Routine");
        button.click();
        expect(container).toMatchSnapshot();
    }
});