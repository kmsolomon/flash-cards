import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuOptionItems } from "@/types";

import ActionMenu from "./ActionMenu";

describe("ActionMenu", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should have a button that opens and closes the menu", async () => {
    const user = userEvent.setup();
    render(<ActionMenu buttonLabel="Foo" menuOptions={[]} />);

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

  it("Should close the menu if the user clicks outside of it", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <div data-testid="foo">Hello world</div>
        <ActionMenu buttonLabel="Test!" menuOptions={[]} />
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
});
