import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import ActionMenu from "@/components/ActionMenu/ActionMenu";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { deleteSet } from "@/services/cardsets";
import { CardSetType, MenuOptionItems } from "@/types";

function CardSetOverview() {
  const cardSet = useLoaderData() as CardSetType;
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
      console.error(
        "Something went wrong while trying to delete this card set.",
        err
      );
    }
  };

  return (
    <div className="card-overview">
      <div>
        <h1>{cardSet.title}</h1>
        <ActionMenu
          buttonLabel="Options"
          buttonType="string"
          menuOptions={menuOptions}
        />
      </div>

      {cardSet.description ? (
        <div className="description">{cardSet.description}</div>
      ) : null}

      <div>
        <h2>Flash cards</h2>
        <div>
          <a href={`/set/${cardSet.id}/cards`}>Start reviewing</a>
          <a href={`/set/${cardSet.id}/cards/create`}>Add flash card</a>
          <a href={`/set/${cardSet.id}/cards/edit`}>Reorder flash cards</a>
        </div>
        <h3>Current cards:</h3>
        <div>
          {cardSet.flashcards.length > 0 ? (
            <ul>
              {cardSet.flashcards.map((card) => (
                <li key={card.id}>
                  <div>{card.question}</div>
                  <div>
                    <a href={`/set/${cardSet.id}/cards/${card.id}/edit`}>
                      Edit
                    </a>
                    <a href={`/set/${cardSet.id}/cards/${card.id}/edit`}>
                      Delete
                    </a>
                  </div>
                </li>
              ))}{" "}
            </ul>
          ) : (
            "No cards yet. Add some!"
          )}
        </div>
      </div>
      <Modal isOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
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
    </div>
  );
}

export default CardSetOverview;
