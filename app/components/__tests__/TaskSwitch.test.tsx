import { render, screen, fireEvent} from "@testing-library/react";

import { TaskSwitch } from "../TaskSwitch";

const testTask = {id: "1", name: "Test Task"};

describe("TaskSwitch", () => {
    it("renders correctly", () => {
        const { container } = render(<TaskSwitch task={testTask} />);
        expect(container).toMatchSnapshot();
    });
    it("displays the task name", () => {
        render(<TaskSwitch task={testTask} />);
                expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
    it("allows the user to mark the task as complete", () => {
        render(<TaskSwitch task={testTask} />);        const switchElement = screen.getByRole("switch");
        fireEvent.click(switchElement);
        expect(switchElement).toBeChecked();
    });
    it("displays a modal to confirm marking the task as incomplete", () => {
        render(<TaskSwitch task={testTask} />);        const switchElement = screen.getByRole("switch");
        fireEvent.click(switchElement);
        fireEvent.click(switchElement);
        const cancelButton = screen.getByText("Cancel");
        const markIncompleteButton = screen.getByText("Mark Incomplete");
        expect(cancelButton).toBeInTheDocument();
        expect(markIncompleteButton).toBeInTheDocument();
    });
    it("closes the modal when the user clicks the cancel button", () => {
        render(<TaskSwitch task={testTask} />);        const switchElement = screen.getByRole("switch");
        fireEvent.click(switchElement);
        fireEvent.click(switchElement);
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
    });
    it("marks the task as incomplete when the user clicks the mark incomplete button", () => {
        render(<TaskSwitch task={testTask} />);
        const switchElement = screen.getByRole("switch");
        fireEvent.click(switchElement);
        fireEvent.click(switchElement);
        const markIncompleteButton = screen.getByText("Mark Incomplete");
        fireEvent.click(markIncompleteButton);
        expect(switchElement).not.toBeChecked();
    });

});