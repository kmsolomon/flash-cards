import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactModal from "react-modal";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { CardSetType } from "@/types";

import CardSetOverview from "./CardSetOverview";

const testSet: CardSetType = {
  id: "12345",
  title: "Hello,",
  description: "World!",
  flashcards: [],
};

describe("CardSetOverview", () => {
  const { deleteSetMock } = vi.hoisted(() => {
    return { deleteSetMock: vi.fn() };
  });

  vi.mock("@/services/cardsets", () => {
    return {
      deleteSet: deleteSetMock,
    };
  });
  beforeEach(() => {
    vi.spyOn(ReactModal, "setAppElement").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const router = createMemoryRouter(
    [
      {
        path: "/set/:id",
        element: (
          <div id="root">
            <CardSetOverview />
          </div>
        ),
        loader: async () => {
          return testSet;
        },
      },
      {
        path: "/",
        element: <div></div>,
      },
    ],
    {
      initialEntries: ["/set/12345"],
    }
  );

  it("Should display the set title and description if it exists", async () => {
    render(<RouterProvider router={router} />);

    const h1 = await screen.findByRole("heading", {
      level: 1,
      name: testSet.title,
    });
    const description: string = testSet.description ? testSet.description : "";
    expect(h1).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("Should have links for adding cards and reviewing cards", async () => {
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", {
      level: 2,
      name: "Flash cards",
    });

    expect(
      screen.getByRole("link", { name: /start reviewing/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /add flash card/i })
    ).toBeInTheDocument();
  });

  it("Should have an action menu with options for edit and delete", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", {
      level: 1,
      name: testSet.title,
    });

    expect(
      screen.getByRole("button", { name: /options/i })
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /options/i }));

    expect(screen.getByRole("menuitem", { name: /edit/i })).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /delete/i })
    ).toBeInTheDocument();
  });

  it("Should open a modal if the user clicks the delete option", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", {
      level: 1,
      name: testSet.title,
    });
    await user.click(screen.getByRole("button", { name: /options/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("menuitem", { name: /delete/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Should call the deleteSet method if the user clicks the option to confirm deleting the set", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await screen.findByRole("heading", {
      level: 1,
      name: testSet.title,
    });
    await user.click(screen.getByRole("button", { name: /options/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("menuitem", { name: /delete/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(deleteSetMock).toBeCalled();
  });
});
