import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button", () => {
  it("Uses the given text, type, and arialabel", () => {
    render(
      <Button
        style="primary"
        text="Learn more"
        type="submit"
        ariaLabel="Learn more about testing with buttons"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Learn more");
    expect(button).toHaveAttribute(
      "aria-label",
      "Learn more about testing with buttons"
    );
    expect(button).toHaveAttribute("type", "submit");
  });

  it("Uses the given click handler", async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button
        style="primary"
        text="Learn more"
        ariaLabel="Learn more about testing with buttons"
        clickHandler={mockOnClick}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Should disable the button if that style is selected", () => {
    render(
      <Button
        style="primary"
        text="Learn more"
        ariaLabel="Learn more about testing with buttons"
        disabled={true}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("Should use a valid icon for the option arrow-left", () => {
    render(
      <Button
        style="primary"
        text="Previous question"
        ariaLabel="Previous question"
        icon="arrow-left"
      />
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveTextContent("Learn more");
    expect(screen.getByTestId("icon-arrow-left")).toBeInTheDocument();
  });

  it("Should use a valid icon for the option arrow-right", () => {
    render(
      <Button style="primary" ariaLabel="Next question" icon="arrow-right" />
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveTextContent("Learn more");
    expect(screen.getByTestId("icon-arrow-right")).toBeInTheDocument();
  });

  it("Should use a valid icon for the option edit", () => {
    render(<Button style="primary" ariaLabel="Edit card" icon="edit" />);

    expect(
      screen.getByRole("button", { name: "Edit card" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-edit")).toBeInTheDocument();
  });

  it("Should use a valid icon for the option delete", () => {
    render(<Button style="primary" ariaLabel="Delete card" icon="delete" />);

    expect(
      screen.getByRole("button", { name: "Delete card" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-delete")).toBeInTheDocument();
  });
});
