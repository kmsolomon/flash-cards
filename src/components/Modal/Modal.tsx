import "./Modal.css";

import ReactModal from "react-modal";

interface Props {
  children: React.ReactNode;
  id: string;
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, id, isOpen, setModalOpen }: Props) {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      id={id}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={import.meta.env.MODE !== "test"}
      onRequestClose={() => setModalOpen(false)}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
