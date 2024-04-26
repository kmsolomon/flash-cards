import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  it("Should have a link to the main page", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: "Flash cards" })
    ).toBeInTheDocument();
  });
});
