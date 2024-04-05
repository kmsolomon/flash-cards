import { render, screen } from "@testing-library/react";
import ReactModal from "react-modal";

import Modal from "./Modal";

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useParams: vi.fn(),
}));

describe("Modal", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("Should not be displayed if isOpen is false", async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(ReactModal, "setAppElement").mockImplementation(() => {});
    render(
      <div id="root">
        <Modal
          isOpen={false}
          setModalOpen={() => {
            return false;
          }}
        >
          <div>Hello world</div>
        </Modal>
      </div>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Should display the contents if isOpen is true", async () => {
    render(
      <div id="root">
        <div>Test</div>
        <Modal
          isOpen={true}
          setModalOpen={() => {
            return false;
          }}
        >
          <div>Hello world</div>
        </Modal>
      </div>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
