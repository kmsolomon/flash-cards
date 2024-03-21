import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { CompactCardSetType } from "@/types";

import DisplayGrid from "./DisplayGrid";

describe("DisplayGrid", () => {
  const testData = [
    {
      id: "a123",
      title: "Learning 1",
      description: "A set of practice questions",
      cards: 3,
    },
    {
      id: "b123",
      title: "Random questions",
      cards: 2,
    },
    {
      id: "c123",
      title: "Questions for testing",
      cards: 3,
    },
    {
      id: "d123",
      title: "Everything",
      description: "Alllllll the questions",
      cards: 7,
      createdBy: "aaaa",
    },
  ];

  test("It displays the given items", async () => {
    const TESTDATA: CompactCardSetType[] = testData;
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <DisplayGrid />,
          loader: async () => {
            return TESTDATA;
          },
        },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    const grid = await screen.findByTestId("display-grid");
    expect(grid).toBeInTheDocument();
    expect(
      within(grid).getByRole("heading", { name: testData[0].title, level: 2 })
    ).toBeInTheDocument();
    expect(
      within(grid).getByRole("heading", { name: testData[1].title, level: 2 })
    ).toBeInTheDocument();
    expect(
      within(grid).getByRole("heading", { name: testData[2].title, level: 2 })
    ).toBeInTheDocument();
    expect(
      within(grid).getByRole("heading", { name: testData[3].title, level: 2 })
    ).toBeInTheDocument();
  });

  test("If there are no items a message is displayed", async () => {
    const TESTDATA: CompactCardSetType[] = [];
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <DisplayGrid />,
          loader: async () => {
            return TESTDATA;
          },
        },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    const grid = await screen.findByTestId("display-grid");
    expect(grid).toBeInTheDocument();
    expect(
      within(grid).getByText("There are no items to display.")
    ).toBeInTheDocument();
  });
});
