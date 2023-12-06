import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FlashCardType } from "@/types";

import FlashCard from "./FlashCard";

const testCard: FlashCardType = {
  id: "12345",
  question: "What does the fox say?",
  answer: "Ring-ding-ding-ding-ding-dingeringeding",
};

describe("FlashCard", () => {
  test("The card initially displays the given card set title and question", () => {
    render(<FlashCard card={testCard} />);
    expect(screen.getByTestId("card")).not.toHaveClass("with-answer");
    const question = screen.getByTestId("question");
    expect(within(question).getByText("Question")).toBeInTheDocument();
    expect(within(question).getByText(testCard.question)).toBeInTheDocument();
  });

  test("The card has a show question/answer buttons", () => {
    render(<FlashCard card={testCard} />);
    expect(
      screen.getByRole("button", { name: "Show answer" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show question" })
    ).toBeInTheDocument();
  });

  test("Clicking the show answer button and then the show question button results in the question being shown again", async () => {
    const user = userEvent.setup();
    render(<FlashCard card={testCard} />);
    const card = screen.getByTestId("card");
    const answer = screen.getByTestId("answer");
    expect(card).not.toHaveClass("with-answer");
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    expect(card).toHaveClass("with-answer");
    expect(within(answer).getByText(testCard.answer)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show question" }));
    expect(card).not.toHaveClass("with-answer");
  });
});
