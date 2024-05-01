import {
  FlashCardType,
  isJSONError,
  JSONError,
  NewFlashCardType,
} from "@/types";

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

  const data: FlashCardType | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error(
      "An error occured while trying to create the flash card."
    );
    if (isJSONError(data) && data.error && data.error !== "") {
      console.log(data.error);
      err = new Error(data.error);
    }
    return Promise.reject(err);
  } else {
    return data;
  }
};

const getFlashCard = async (
  setId: string,
  cardId: string
): Promise<FlashCardType> => {
  const response = await fetch(
    `${BASE_URL}/cardset/${setId}/flashcard/${cardId}`
  );

  const data: FlashCardType | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error(
      "An error occured while trying to fetch the flash card."
    );
    if (isJSONError(data) && data.error && data.error !== "") {
      console.log(data.error);
      err = new Error(data.error);
    }
    if (err.message?.match(/not found/i)) {
      throw new Response("Not Found", { status: 404 });
    }
    return Promise.reject(err);
  } else {
    return data;
  }
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
  const data: FlashCardType | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error(
      "An unknown error occured while trying to update the flash card."
    );
    if (isJSONError(data) && data.error && data.error !== "") {
      console.log(data.error);
      err = new Error(data.error);
    }
    return Promise.reject(err);
  } else {
    return data;
  }
};

const deleteFlashCard = async (setId: string, cardId: string) => {
  const response = await fetch(
    `${BASE_URL}/cardset/${setId}/flashcard/${cardId}`,
    {
      method: "DELETE",
    }
  );
  const { error }: JSONError = await response.json();

  if (!response.ok) {
    const err = new Error(
      error && error !== ""
        ? error
        : "An unknown error occured while trying to delete the flash card."
    );
    return Promise.reject(err);
  }
};

export { createFlashCard, deleteFlashCard, getFlashCard, updateFlashCard };
