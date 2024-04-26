import { render, screen, waitFor, within } from "@testing-library/react";
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

  it("Displays the given items", async () => {
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

    const grid = await waitFor(() => screen.findByTestId("display-grid"));
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

  it("Displays a message if there are no items to display", async () => {
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

    const grid = await waitFor(() => screen.findByTestId("display-grid"));
    expect(grid).toBeInTheDocument();
    expect(
      within(grid).getByText("There are no items to display.")
    ).toBeInTheDocument();
  });

  it("Includes a link to the page for that set within a grid card", async () => {
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

    const grid = await waitFor(() => screen.findByTestId("display-grid"));
    expect(grid).toBeInTheDocument();
    expect(
      within(grid).getByRole("link", { name: testData[0].title })
    ).toBeInTheDocument();
  });
});
