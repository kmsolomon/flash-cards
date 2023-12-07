import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button", () => {
  test("It uses the given text, type, and arialabel", () => {
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

  test("It uses the given click handler", async () => {
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

  test("Button will be disabled if that style is selected", () => {
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

  test("Icon option of arrow-left will use a valid icon", () => {
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

  test("Icon option of arrow-right will use a valid icon", () => {
    render(
      <Button style="primary" ariaLabel="Next question" icon="arrow-right" />
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveTextContent("Learn more");
    expect(screen.getByTestId("icon-arrow-right")).toBeInTheDocument();
  });
});
