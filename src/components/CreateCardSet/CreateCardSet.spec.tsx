import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { CardSetType } from "@/types";

import CreateCardSet from "./CreateCardSet";

const testSet: CardSetType = {
  id: "12345",
  title: "Hello,",
  description: "World!",
  flashcards: [],
};

describe("CreateCardSet", () => {
  const { createMock } = vi.hoisted(() => {
    return { createMock: vi.fn() };
  });

  vi.mock("@/services/cardsets", () => {
    return {
      create: createMock,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const router = createMemoryRouter(
    [
      {
        path: "/set/create",
        element: <CreateCardSet />,
      },
      {
        path: "/set/:id",
        element: <CreateCardSet />,
      },
    ],
    { initialEntries: ["/set/create", "/set/12345"] }
  );

  it("Should have a form with the expected input fields", () => {
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /create set/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /title \(required\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create set/i })
    ).toBeInTheDocument();
  });

  it("Should have a max length of 100 for the title input field", () => {
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("textbox", { name: /title \(required\)/i })
    ).toHaveAttribute("maxlength", "100");
  });

  it("Should have a max length of 200 for the description input field", () => {
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toHaveAttribute("maxlength", "200");
  });

  it("Should show an error if the user submits a title with a blank string", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const titleInput = screen.getByRole("textbox", {
      name: /title \(required\)/i,
    });
    const titleError = screen.getByTestId("titleError");

    await user.type(titleInput, "   ");
    expect(titleError).toBeEmptyDOMElement();
    expect(titleInput).toHaveAttribute("aria-invalid", "false");

    await user.click(screen.getByRole("button", { name: /create set/i }));

    expect(titleError).not.toBeEmptyDOMElement();
    expect(titleError).toHaveTextContent(/error.*/i);
    expect(titleInput).toHaveAttribute("aria-invalid", "true");
    expect(titleInput).toHaveFocus();
  });

  it("Should call create set with the user-given values if the title is valid", async () => {
    const user = userEvent.setup();
    createMock.mockResolvedValue(testSet);
    render(<RouterProvider router={router} />);

    await user.type(
      screen.getByRole("textbox", {
        name: /title \(required\)/i,
      }),
      "Hello,"
    );
    await user.type(
      screen.getByRole("textbox", {
        name: /description/i,
      }),
      "World!"
    );
    await user.click(screen.getByRole("button", { name: /create set/i }));
    expect(createMock).toBeCalled();
    expect(createMock).toHaveBeenCalledWith({
      title: "Hello,",
      description: "World!",
      flashcards: [],
    });
  });
});
