import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button", () => {
  test("It uses the given text and arialabel", () => {
    render(
      <Button
        style="primary"
        text="Learn more"
        ariaLabel="Learn more about testing with buttons"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Learn more");
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Learn more about testing with buttons"
    );
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
        style="disabled"
        text="Learn more"
        ariaLabel="Learn more about testing with buttons"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
