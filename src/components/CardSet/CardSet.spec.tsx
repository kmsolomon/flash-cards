import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import CardSet from "./CardSet";

const testSet = {
  id: "test123",
  title: "Intro to JS",
  description: "Beginner JavaScript questions.",
  flashcards: [
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
  it("Displays the card set title", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/set/:id",
          element: <CardSet />,
          loader: async () => {
            return testSet;
          },
        },
      ],
      { initialEntries: [`/set/${testSet.id}`] }
    );
    render(<RouterProvider router={router} />);
    const header = await screen.findByRole("heading", { level: 1 });
    expect(header).toHaveTextContent(testSet.title);
  });

  it("Should not have buttons to navigate between cards and the empty set text is displayed when a card set has no cards", async () => {
    const noCards = { ...testSet, flashcards: [] };
    const router = createMemoryRouter(
      [
        {
          path: "/set/:id/cards",
          element: <CardSet />,
          loader: async () => {
            return noCards;
          },
        },
      ],
      { initialEntries: [`/set/${testSet.id}/cards`] }
    );
    render(<RouterProvider router={router} />);
    await waitFor(() => screen.findByRole("heading", { level: 1 }));
    expect(
      within(screen.getByTestId("card-container")).getByText(
        "There are currently no flash cards for this set"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Previous quetion" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next quetion" })
    ).not.toBeInTheDocument();
  });

  it("Should initially display the first card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/set/:id/cards",
          element: <CardSet />,
          loader: async () => {
            return testSet;
          },
        },
      ],
      { initialEntries: [`/set/${testSet.id}/cards`] }
    );
    render(<RouterProvider router={router} />);
    await waitFor(() => screen.findByRole("heading", { level: 1 }));
    const cardContainer = screen.getByTestId("card-container");
    expect(
      within(cardContainer).getByText(testSet.flashcards[0].question)
    ).toBeInTheDocument();
  });

  it("Should have buttons to switch to the next and previous cards", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/set/:id/cards",
          element: <CardSet />,
          loader: async () => {
            return testSet;
          },
        },
      ],
      { initialEntries: [`/set/${testSet.id}/cards`] }
    );
    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByRole("heading", { level: 1 }));
    const previousBtn = screen.getByRole("button", {
      name: "Previous question",
    });
    const nextBtn = screen.getByRole("button", { name: "Next question" });
    const cardContainer = screen.getByTestId("card-container");
    expect(previousBtn).toBeDisabled();
    expect(nextBtn).toBeInTheDocument();
    await user.click(nextBtn);
    expect(
      within(cardContainer).getByText(testSet.flashcards[1].question)
    ).toBeInTheDocument();
    await user.click(nextBtn);
    expect(
      within(cardContainer).getByText(testSet.flashcards[2].question)
    ).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
    await user.click(previousBtn);
    expect(
      within(cardContainer).getByText(testSet.flashcards[1].question)
    ).toBeInTheDocument();
    expect(previousBtn).toBeEnabled();
    expect(nextBtn).toBeEnabled();
  });

  it("Should have a link to return to the set overview", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/set/:id/cards",
          element: <CardSet />,
          loader: async () => {
            return testSet;
          },
        },
      ],
      { initialEntries: [`/set/${testSet.id}/cards`] }
    );
    render(<RouterProvider router={router} />);
    await waitFor(() => screen.findByRole("heading", { level: 1 }));
    expect(
      screen.getByRole("link", { name: /return to set overview/i })
    ).toBeInTheDocument();
  });
});
