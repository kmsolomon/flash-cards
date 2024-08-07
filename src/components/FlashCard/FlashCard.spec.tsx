import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FlashCardType } from "@/types";

import FlashCard from "./FlashCard";

const testCard: FlashCardType = {
  id: "12345",
  question: "What does the fox say?",
  answer: "Ring-ding-ding-ding-ding-dingeringeding",
  cardsetId: "1",
};

describe("FlashCard", () => {
  it("Initially displays the given card set title and question", () => {
    render(<FlashCard card={testCard} />);
    expect(screen.getByTestId("card")).not.toHaveClass("with-answer");
    const question = screen.getByTestId("question");
    expect(within(question).getByText("Question")).toBeInTheDocument();
    expect(within(question).getByText(testCard.question)).toBeInTheDocument();
  });

  it("Displays the numOf text if a value is set", () => {
    render(<FlashCard card={testCard} numOf="1 of 4" />);
    expect(screen.getByTestId("card")).not.toHaveClass("with-answer");
    const question = screen.getByTestId("question");
    expect(within(question).getByText("Question 1 of 4")).toBeInTheDocument();
  });

  it("Should have buttons to show question/answer", () => {
    render(<FlashCard card={testCard} />);
    expect(
      screen.getByRole("button", { name: "Show answer" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show question" })
    ).toBeInTheDocument();
  });

  it("Should display the question after the user clicks show answer, and then clicks show question", async () => {
    const user = userEvent.setup();
    render(<FlashCard card={testCard} />);
    const card = screen.getByTestId("card");
    const question = screen.getByTestId("question");
    const answer = screen.getByTestId("answer");
    expect(card).not.toHaveClass("with-answer");
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    expect(card).toHaveClass("with-answer");
    expect(answer).toHaveFocus();
    expect(within(answer).getByText(testCard.answer)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show question" }));
    expect(card).not.toHaveClass("with-answer");
    expect(question).toHaveFocus();
  });
});
