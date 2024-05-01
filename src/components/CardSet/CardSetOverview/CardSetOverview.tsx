import "./CardSetOverview.css";

import { useState } from "react";
import { ImCogs } from "react-icons/im";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

import ActionMenu from "@/components/ActionMenu/ActionMenu";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { deleteSet } from "@/services/cardsets";
import { deleteFlashCard } from "@/services/flashcards";
import { CardSetType, MenuOptionItems } from "@/types";

function CardSetOverview() {
  const cardSet = useLoaderData() as CardSetType;
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [flashCardDeleteModalOpen, setFlashCardDeleteModalOpen] =
    useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const menuOptions: MenuOptionItems[] = [
    {
      name: "Edit",
      action: () => {
        navigate(`/set/${cardSet.id}/edit`);
      },
    },
    {
      name: "Delete",
      action: () => {
        setDeleteModalOpen(true);
      },
    },
  ];

  const handleSetDelete = async () => {
    try {
      await deleteSet(cardSet.id);
      navigate("/");
    } catch (err) {
      let message = "";
      console.error(
        "Something went wrong while trying to delete this card set."
      );

      if (err instanceof Error) {
        message = err.message;
      }
      navigate("/error", { state: { message: message } });
    }
  };

  const handleFlashCardDelete = async () => {
    try {
      await deleteFlashCard(cardSet.id, selectedCardId);
      setSelectedCardId("");
      // TODO need to add success message on the page and probably make sure focus is moved to that after card deleted
      setFlashCardDeleteModalOpen(false);
      revalidator.revalidate();
    } catch (err) {
      let message = "";
      console.error(
        "Something went wrong while trying to delete this flash card."
      );

      if (err instanceof Error) {
        message = err.message;
      }
      navigate("/error", { state: { message: message } });
    }
  };

  const cancelFlashCardDelete = () => {
    setSelectedCardId("");
    setFlashCardDeleteModalOpen(false);
  };

  return (
    <div className="main-content">
      <div className="set-header">
        <h1>{cardSet.title}</h1>
        <ActionMenu
          buttonIcon={<ImCogs />}
          ariaLabel="Set options"
          buttonType="icon"
          buttonClasses="btn primary small-icon"
          menuOptions={menuOptions}
        />
      </div>

      {cardSet.description ? (
        <div className="description">{cardSet.description}</div>
      ) : null}

      <div className="fancy-spacer"></div>
      <div>
        <div className="flash-cards-actions">
          <h2>Flash cards</h2>
          <div className="button-group large-btns">
            <a className="btn primary" href={`/set/${cardSet.id}/cards`}>
              Start reviewing
            </a>
            <a
              className="btn secondary"
              href={`/set/${cardSet.id}/cards/create`}
            >
              Add flash card
            </a>
          </div>
        </div>
        <h3>Current cards:</h3>
        <div>
          {cardSet.flashcards.length > 0 ? (
            <ul className="card-list">
              {cardSet.flashcards.map((card, index) => (
                <li key={card.id}>
                  <div className="card-question">{card.question}</div>
                  <div className="button-group">
                    <Button
                      type="button"
                      style="small-icon"
                      icon="edit"
                      ariaLabel={`Edit card ${index + 1}`}
                      clickHandler={() => {
                        navigate(`/set/${cardSet.id}/cards/${card.id}/edit`);
                      }}
                    />
                    <Button
                      type="button"
                      style="small-icon"
                      icon="delete"
                      ariaLabel={`Delete card ${index + 1}`}
                      clickHandler={() => {
                        setSelectedCardId(card.id);
                        setFlashCardDeleteModalOpen(true);
                      }}
                    />
                  </div>
                </li>
              ))}{" "}
            </ul>
          ) : (
            "No cards yet. Add some!"
          )}
        </div>
      </div>
      <Modal
        id="test1"
        isOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      >
        <div className="modal-content">
          Deleting the set &quot;{cardSet.title}&quot; will also delete all
          associated flash cards. Are you sure you want to delete this set?
        </div>

        <div className="button-wrapper">
          <Button
            type="button"
            style="primary"
            text="Delete"
            clickHandler={handleSetDelete}
          />
          <Button
            style="secondary"
            type="button"
            text="Cancel"
            clickHandler={() => setDeleteModalOpen(false)}
          />
        </div>
      </Modal>
      <Modal
        id="test2"
        isOpen={flashCardDeleteModalOpen}
        setModalOpen={setFlashCardDeleteModalOpen}
      >
        <div className="modal-content">
          Are you sure you want to delete this flash card?
        </div>

        <div className="button-wrapper">
          <Button
            type="button"
            style="primary"
            text="Delete"
            clickHandler={handleFlashCardDelete}
          />
          <Button
            style="secondary"
            type="button"
            text="Cancel"
            clickHandler={cancelFlashCardDelete}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CardSetOverview;
