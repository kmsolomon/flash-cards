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

export { createFlashCard };
