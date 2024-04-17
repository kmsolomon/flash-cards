import { FlashCardType, NewFlashCardType } from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createFlashCard = async (
  card: NewFlashCardType
): Promise<FlashCardType> => {
  const response = await fetch(
    `${BASE_URL}/cardset/${card.cardsetId}/flashcard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }
  );

  const data: FlashCardType = await response.json();

  return data;
};

const getFlashCard = async (
  setId: string,
  cardId: string
): Promise<FlashCardType> => {
  const response = await fetch(
    `${BASE_URL}/cardset/${setId}/flashcard/${cardId}`
  );

  const data: FlashCardType = await response.json();

  return data;
};

const updateFlashCard = async (
  setId: string,
  cardId: string,
  updates: Partial<FlashCardType>
): Promise<FlashCardType> => {
  const response = await fetch(
    `${BASE_URL}/cardset/${setId}/flashcard/${cardId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );
  const data: FlashCardType = await response.json();

  return data;
};

const deleteFlashCard = async (setId: string, cardId: string) => {
  const response = await fetch(
    `${BASE_URL}/cardset/${setId}/flashcard/${cardId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};

export { createFlashCard, deleteFlashCard, getFlashCard, updateFlashCard };
