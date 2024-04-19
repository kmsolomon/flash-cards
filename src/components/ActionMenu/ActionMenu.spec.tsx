import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImCalculator } from "react-icons/im";

import { MenuOptionItems } from "@/types";

import ActionMenu from "./ActionMenu";

describe("ActionMenu", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should have a button that opens and closes the menu", async () => {
    const user = userEvent.setup();
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: () => {},
      },
    ];
    render(<ActionMenu buttonLabel="Foo" menuOptions={testOptions} />);

    const menuBtn = screen.getByRole("button", { name: "Foo" });
    const menu = screen.getByRole("menu");
    expect(menuBtn).toBeInTheDocument();
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveClass("hide");

    await user.click(menuBtn);

    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass("show");

    await user.click(menuBtn);

    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveClass("hide");
  });

  it("Should create menu items for the provided menu options", () => {
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: () => {},
      },
      {
        name: "Copy",
        action: () => {},
      },
      {
        name: "Delete",
        action: () => {},
      },
    ];
    render(<ActionMenu buttonLabel="Test!" menuOptions={testOptions} />);

    expect(
      screen.getByRole("menuitem", { name: testOptions[0].name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: testOptions[1].name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: testOptions[2].name })
    ).toBeInTheDocument();
  });

  it("Should call the provided action when a user clicks on the menu options", async () => {
    const user = userEvent.setup();
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: vi.fn(),
      },
      {
        name: "Copy",
        action: vi.fn(),
      },
    ];
    render(<ActionMenu buttonLabel="Test!" menuOptions={testOptions} />);

    await user.click(screen.getByRole("button"));
    await user.click(
      screen.getByRole("menuitem", { name: testOptions[0].name })
    );

    expect(testOptions[0].action).toBeCalledTimes(1);

    await user.click(
      screen.getByRole("menuitem", { name: testOptions[1].name })
    );

    expect(testOptions[1].action).toBeCalledTimes(1);
  });

  it("Should call the provided action when a user presses Enter or the Spacebar on the menu options", async () => {
    const user = userEvent.setup();
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: vi.fn(),
      },
      {
        name: "Copy",
        action: vi.fn(),
      },
    ];
    render(<ActionMenu buttonLabel="Test!" menuOptions={testOptions} />);

    await user.tab();
    await user.keyboard("[Enter]");

    expect(
      screen.getByRole("menuitem", { name: testOptions[0].name })
    ).toHaveFocus();

    await user.keyboard("[Enter]");

    expect(testOptions[0].action).toBeCalledTimes(1);

    await user.keyboard("[ArrowDown][Enter] ");

    expect(
      screen.getByRole("menuitem", { name: testOptions[1].name })
    ).toHaveFocus();

    expect(testOptions[1].action).toBeCalledTimes(2);
  });

  it("Should close the menu if the user clicks outside of it", async () => {
    const user = userEvent.setup();
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: vi.fn(),
      },
    ];

    render(
      <div>
        <div data-testid="foo">Hello world</div>
        <ActionMenu buttonLabel="Test!" menuOptions={testOptions} />
      </div>
    );

    const menuBtn = screen.getByRole("button", { name: "Test!" });
    const menu = screen.getByRole("menu");

    await user.click(menuBtn);

    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass("show");

    await user.click(screen.getByTestId("foo"));

    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveClass("hide");
  });

  it("Should close the menu if the user presses the Escape key", async () => {
    const user = userEvent.setup();
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: () => {},
      },
    ];

    render(<ActionMenu buttonLabel="Test!" menuOptions={testOptions} />);

    const menuBtn = screen.getByRole("button", { name: "Test!" });
    const menu = screen.getByRole("menu");

    await user.tab();
    await user.keyboard("[Enter]");

    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass("show");
    expect(
      screen.getByRole("menuitem", { name: testOptions[0].name })
    ).toHaveFocus();

    await user.keyboard("[Escape]");

    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveClass("hide");
  });

  it("Should use the provided icon and aria-label", async () => {
    const testIcon = <ImCalculator data-testid="icon-calc" />;
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: vi.fn(),
      },
      {
        name: "Copy",
        action: vi.fn(),
      },
    ];
    render(
      <ActionMenu
        ariaLabel="Calculate"
        buttonIcon={testIcon}
        buttonType="icon"
        menuOptions={testOptions}
      />
    );

    const button = screen.getByRole("button", { name: "Calculate" });

    expect(button).toBeInTheDocument();
    expect(button).toContainElement(screen.getByTestId("icon-calc"));
    expect(button).toHaveAttribute("aria-label", "Calculate");
  });

  it("Should not display a text label if buttonType icon is used", async () => {
    const testIcon = <ImCalculator />;
    const testOptions: MenuOptionItems[] = [
      {
        name: "Edit",
        action: vi.fn(),
      },
      {
        name: "Copy",
        action: vi.fn(),
      },
    ];
    render(
      <ActionMenu
        buttonLabel="Test!"
        buttonIcon={testIcon}
        buttonType="icon"
        ariaLabel="Calculate"
        menuOptions={testOptions}
      />
    );

    expect(screen.queryByText("Test!")).not.toBeInTheDocument();
  });
});
