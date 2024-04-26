import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { CardSetType } from "@/types";

import EditCardSet from "./EditCardSet";

const testSet: CardSetType = {
  id: "12345",
  title: "Hello,",
  description: "World!",
  flashcards: [],
};

describe("EditCardSet", () => {
  const { updateMock } = vi.hoisted(() => {
    return { updateMock: vi.fn() };
  });

  vi.mock("@/services/cardsets", () => {
    return {
      update: updateMock,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const router = createMemoryRouter(
    [
      {
        path: "/set/:id/edit",
        element: <EditCardSet />,
        loader: async () => {
          return testSet;
        },
      },
      {
        path: "/set/:id",
        element: <EditCardSet />,
        loader: async () => {
          return testSet;
        },
      },
    ],
    { initialEntries: ["/set/12345", "/set/12345/edit"] }
  );

  it("Should have a form with the expected input fields", () => {
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /edit details for/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("Should have a max length of 100 for the title input field", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("textbox", { name: /title/i })).toHaveAttribute(
      "maxlength",
      "100"
    );
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
      name: /title/i,
    });
    const titleError = screen.getByTestId("titleError");

    await user.click(titleInput);
    await user.clear(titleInput);
    await user.type(titleInput, "   ");
    expect(titleError).toBeEmptyDOMElement();
    expect(titleInput).toHaveAttribute("aria-invalid", "false");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(titleError).not.toBeEmptyDOMElement();
    expect(titleError).toHaveTextContent(/error.*/i);
    expect(titleInput).toHaveAttribute("aria-invalid", "true");
    expect(titleInput).toHaveFocus();
  });

  it("Should call update set with the user-given values if the title is valid", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const titleInput = screen.getByRole("textbox", {
      name: /title/i,
    });
    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.click(titleInput);
    await user.clear(titleInput);
    await user.type(titleInput, "Updates");
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "123");
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(updateMock).toBeCalled();
    expect(updateMock).toHaveBeenCalledWith(testSet.id, {
      title: "Updates",
      description: "123",
    });
  });

  it("Should not call update set if both the title and description are unchanged", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(updateMock).not.toBeCalled();
  });

  it("Should call update with only title if only the title was changed", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const titleInput = screen.getByRole("textbox", {
      name: /title/i,
    });
    await user.click(titleInput);
    await user.clear(titleInput);
    await user.type(titleInput, "Updates");

    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(updateMock).toBeCalled();
    expect(updateMock).toHaveBeenCalledWith(testSet.id, {
      title: "Updates",
    });
  });

  it("Should call update with only description if only the description was changed", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "123");

    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(updateMock).toBeCalled();
    expect(updateMock).toHaveBeenCalledWith(testSet.id, {
      description: "123",
    });
  });

  it("Should not call the update function the user clicks the cancel button", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(updateMock).not.toBeCalled();
  });
});
