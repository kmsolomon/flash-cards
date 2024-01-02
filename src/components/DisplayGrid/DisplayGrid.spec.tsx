import { render, screen, within } from "@testing-library/react";

import DisplayGrid from "./DisplayGrid";

describe("DisplayGrid", () => {
  const testData = [
    {
      id: "a123",
      title: "Learning 1",
      description: "A set of practice questions",
      cards: ["1234a", "1234b", "1234c"],
    },
    {
      id: "b123",
      title: "Random questions",
      cards: ["2234d", "2234e"],
    },
    {
      id: "c123",
      title: "Questions for testing",
      cards: ["2234e", "3234f", "3234g"],
    },
    {
      id: "d123",
      title: "Everything",
      description: "Alllllll the questions",
      cards: ["1234a", "1234b", "1234c", "2234d", "2234e", "3234f", "3234g"],
      createdBy: "aaaa",
    },
  ];

  test("It displays the given items", () => {
    render(<DisplayGrid items={testData} />);
    const grid = screen.getByTestId("display-grid");
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
  test("If there are no items a message is displayed", () => {
    render(<DisplayGrid items={[]} />);
    const grid = screen.getByTestId("display-grid");
    expect(grid).toBeInTheDocument();
    expect(
      within(grid).getByText("There are no items to display.")
    ).toBeInTheDocument();
  });
});
