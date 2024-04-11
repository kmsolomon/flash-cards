import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { FlashCardType } from "@/types";

import CreateFlashCard from "./CreateFlashCard";

const testCard: FlashCardType = {
  id: "123",
  question: "Is this a question?",
  answer: "Sure.",
  cardsetId: "12345",
};

describe("CreateFlashCard", () => {
  const { createMock } = vi.hoisted(() => {
    return { createMock: vi.fn() };
  });

  vi.mock("@/services/flashcards", () => {
    return {
      createFlashCard: createMock,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const router = createMemoryRouter(
    [
      {
        path: "/set/:id/cards/create",
        element: <CreateFlashCard />,
      },
    ],
    { initialEntries: ["/set/12345/cards/create"] }
  );
  it("Should have the expected form fields", () => {
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Add new flash card" })
    ).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /question/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /question/i })).toHaveAttribute(
      "aria-invalid",
      "false"
    );
    expect(
      screen.getByRole("textbox", { name: /answer/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /answer/i })).toHaveAttribute(
      "aria-invalid",
      "false"
    );
    expect(
      screen.getByRole("button", { name: "Add card" })
    ).toBeInTheDocument();
  });
  it("Should have 150 as the max length for the question field", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("textbox", { name: /question/i })).toHaveAttribute(
      "maxlength",
      "150"
    );
  });
  it("Should have 1000 as the max length for the answer field", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("textbox", { name: /answer/i })).toHaveAttribute(
      "maxlength",
      "1000"
    );
  });
  it("Should have question and answer as required fields", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("textbox", { name: /question/i })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /answer/i })).toBeRequired();
  });
  it("Should show an error and set aria-invalid to true if the question field contains a blank string when you submit the form", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const questionField = screen.getByRole("textbox", { name: /question/i });

    expect(questionField).toHaveAttribute("aria-invalid", "false");

    await user.type(questionField, "    ");
    await user.type(screen.getByRole("textbox", { name: /answer/i }), "2");
    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(screen.getByTestId("questionError")).toHaveTextContent("Error");
    expect(questionField).toHaveAttribute("aria-invalid", "true");
  });
  it("Should show an error and set aria-invalid to true if the answer field contains a blank string when you submit the form", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const answerField = screen.getByRole("textbox", { name: /answer/i });

    expect(answerField).toHaveAttribute("aria-invalid", "false");

    await user.type(screen.getByRole("textbox", { name: /question/i }), "1");
    await user.type(answerField, "   ");
    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(screen.getByTestId("answerError")).toHaveTextContent("Error");
    expect(answerField).toHaveAttribute("aria-invalid", "true");
  });
  it("Should call the createCard method when the fields are valid and the user clicks the submit button", async () => {
    const user = userEvent.setup();
    createMock.mockResolvedValue(testCard);
    render(<RouterProvider router={router} />);
    await user.type(
      screen.getByRole("textbox", { name: /question/i }),
      testCard.question
    );
    await user.type(
      screen.getByRole("textbox", { name: /answer/i }),
      testCard.answer
    );
    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(createMock).toBeCalledWith({
      question: testCard.question,
      answer: testCard.answer,
      cardsetId: testCard.cardsetId,
    });
  });
});
