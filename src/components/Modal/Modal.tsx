import "./Modal.css";

import ReactModal from "react-modal";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, isOpen, setModalOpen }: Props) {
  ReactModal.setAppElement("#root");
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      className="modal"
      overlayClassName="overlay"
      onRequestClose={() => setModalOpen(false)}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
