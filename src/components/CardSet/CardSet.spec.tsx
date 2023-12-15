import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CardSet from "./CardSet";

const testSet = {
  id: "test123",
  title: "Intro to JS",
  description: "Beginner JavaScript questions.",
  cards: [
    {
      id: "1234a",
      question: "What is this project built with?",
      answer: "React!",
    },
    {
      id: "1234b",
      question: "What is the difference between == and ===?",
      answer:
        "=== checks for strict equality.\n\
      == compares for equality after doing type conversions, === does not do type conversions.",
    },
    {
      id: "1234c",
      question: "What does the await keyword mean?",
      answer:
        "It tells JavaScript to wait for an asynchronous action to finish before continuing the function. Can think of it like a pause until done keyword.",
    },
  ],
  createdBy: "userid1",
};

describe("CardSet", () => {
  test("The card set title is displayed", () => {
    render(<CardSet cardSet={testSet} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      testSet.title
    );
  });

  test("When a card set has no cards the empty set text is displayed", () => {
    const noCards = { ...testSet, cards: [] };
    render(<CardSet cardSet={noCards} />);
    expect(
      within(screen.getByTestId("card-container")).getByText(
        "There are currently no flash cards for this set"
      )
    ).toBeInTheDocument();
  });

  test("When a card set has cards the first card is displayed initially", () => {
    render(<CardSet cardSet={testSet} />);
    const cardContainer = screen.getByTestId("card-container");
    expect(
      within(cardContainer).getByText(testSet.cards[0].question)
    ).toBeInTheDocument();
  });

  test("The card set has buttons to switch to the next and previous cards", async () => {
    const user = userEvent.setup();
    render(<CardSet cardSet={testSet} />);
    const previousBtn = screen.getByRole("button", {
      name: "Previous question",
    });
    const nextBtn = screen.getByRole("button", { name: "Next question" });
    const cardContainer = screen.getByTestId("card-container");
    expect(previousBtn).toBeDisabled();
    expect(nextBtn).toBeInTheDocument();
    await user.click(nextBtn);
    expect(
      within(cardContainer).getByText(testSet.cards[1].question)
    ).toBeInTheDocument();
    await user.click(nextBtn);
    expect(
      within(cardContainer).getByText(testSet.cards[2].question)
    ).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
    await user.click(previousBtn);
    expect(
      within(cardContainer).getByText(testSet.cards[1].question)
    ).toBeInTheDocument();
    expect(previousBtn).toBeEnabled();
    expect(nextBtn).toBeEnabled();
  });
});
