import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import EditFlashCard from "./EditFlashCard";

const testCard = {
  id: "abc",
  question: "Hello,",
  answer: "World!",
  cardSetId: "12345",
};

describe("EditFlashCard", () => {
  const { updateMock } = vi.hoisted(() => {
    return { updateMock: vi.fn() };
  });

  beforeEach(() => {
    vi.mock("@/services/flashcards", () => {
      return {
        updateFlashCard: updateMock,
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const setupRouter = () => {
    return createMemoryRouter(
      [
        {
          path: "/set/:id/cards/:cardId/edit",
          element: <EditFlashCard />,
          loader: async () => {
            return testCard;
          },
        },
        {
          path: "/set/:id/",
          element: <div>Test</div>,
        },
      ],
      {
        initialEntries: ["/set/12345", "/set/12345/cards/abc/edit"],
        initialIndex: 1,
      }
    );
  };

  it("Should have the expected form fields, buttons, and heading", async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    expect(
      screen.getByRole("heading", { level: 1, name: /edit flash card/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /question/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /answer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
  it("Should have 150 as the max length for the question field", async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    expect(screen.getByRole("textbox", { name: /question/i })).toHaveAttribute(
      "maxlength",
      "150"
    );
  });
  it("Should have 1000 as the max length for the answer field", async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    expect(screen.getByRole("textbox", { name: /answer/i })).toHaveAttribute(
      "maxlength",
      "1000"
    );
  });
  it("Should have question and answer as required fields", async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    expect(screen.getByRole("textbox", { name: /question/i })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /answer/i })).toBeRequired();
  });
  it("Should put the existing question and answer data into the fields", async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    expect(
      screen.getByRole("textbox", { name: /question/i })
    ).toHaveTextContent("Hello,");
    expect(screen.getByRole("textbox", { name: /answer/i })).toHaveTextContent(
      "World!"
    );
  });
  it("Should show an error and set aria-invalid to true if the question field contains a blank string when you submit the form", async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    const questionField = screen.getByRole("textbox", { name: /question/i });

    expect(questionField).toHaveAttribute("aria-invalid", "false");

    await user.clear(questionField);
    await user.type(questionField, "    ");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(screen.getByTestId("questionError")).toHaveTextContent("Error");
    expect(questionField).toHaveAttribute("aria-invalid", "true");
  });
  it("Should show an error and set aria-invalid to true if the answer field contains a blank string when you submit the form", async () => {
    const router = setupRouter();
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    const answerField = screen.getByRole("textbox", { name: /answer/i });

    expect(answerField).toHaveAttribute("aria-invalid", "false");

    await user.clear(answerField);
    await user.type(answerField, "   ");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(screen.getByTestId("answerError")).toHaveTextContent("Error");
    expect(answerField).toHaveAttribute("aria-invalid", "true");
  });
  it("Should call update with the user-given values if the question and answer are not blank", async () => {
    const router = setupRouter();
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    await user.clear(screen.getByRole("textbox", { name: /question/i }));
    await user.type(screen.getByRole("textbox", { name: /question/i }), "Foo?");
    await user.clear(screen.getByRole("textbox", { name: /answer/i }));
    await user.type(screen.getByRole("textbox", { name: /answer/i }), "Bar!");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(updateMock).toBeCalledWith(testCard.cardSetId, testCard.id, {
      question: "Foo?",
      answer: "Bar!",
    });
  });

  it("Should call update with only the question if only the question was changed", async () => {
    const router = setupRouter();
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    await user.clear(screen.getByRole("textbox", { name: /question/i }));
    await user.type(screen.getByRole("textbox", { name: /question/i }), "Foo?");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(updateMock).toBeCalledWith(testCard.cardSetId, testCard.id, {
      question: "Foo?",
    });
  });
  it("Should call update with only description if only the description was changed", async () => {
    const router = setupRouter();
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    await user.clear(screen.getByRole("textbox", { name: /answer/i }));
    await user.type(screen.getByRole("textbox", { name: /answer/i }), "Bar!");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(updateMock).toBeCalledWith(testCard.cardSetId, testCard.id, {
      answer: "Bar!",
    });
  });
  it("Should not call the update function if the user clicks the cancel button", async () => {
    const router = setupRouter();
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    await user.clear(screen.getByRole("textbox", { name: /answer/i }));
    await user.type(screen.getByRole("textbox", { name: /answer/i }), "Bar!");
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(updateMock).not.toBeCalled();
  });
  it("Should not call update if both the question and answer are unchanged", async () => {
    const router = setupRouter();
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", { level: 1, name: /edit flash card/i });
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(updateMock).not.toBeCalled();
  });
});
