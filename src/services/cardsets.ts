import {
  CardSetType,
  CompactCardSetType,
  isJSONError,
  JSONError,
  NewCardSetType,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAll = async (): Promise<CompactCardSetType[]> => {
  const response = await fetch(`${BASE_URL}/cardset`);
  const data: CompactCardSetType[] | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error(
      "An error occured while trying to fetch the card sets."
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

const getOne = async (id: string): Promise<CardSetType> => {
  const response = await fetch(`${BASE_URL}/cardset/${id}`);
  const data: CardSetType | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error("An error occured while trying to fetch the set.");
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

const create = async (newCard: NewCardSetType): Promise<CardSetType> => {
  const response = await fetch(`${BASE_URL}/cardset/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  });

  const data: CardSetType | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error("An error occured while trying to create the set.");
    if (isJSONError(data) && data.error && data.error !== "") {
      console.log(data.error);
      err = new Error(data.error);
    }
    return Promise.reject(err);
  } else {
    return data;
  }
};

const update = async (
  id: string,
  updates: Partial<CardSetType>
): Promise<CardSetType> => {
  const response = await fetch(`${BASE_URL}/cardset/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  const data: CardSetType | JSONError = await response.json();

  if (!response.ok || isJSONError(data)) {
    let err = new Error(
      "An unknown error occured while trying to update the set."
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

const deleteSet = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/cardset/${id}`, {
    method: "DELETE",
  });

  const { error }: JSONError = await response.json();

  if (!response.ok) {
    const err = new Error(
      error && error !== ""
        ? error
        : "An unknown error occured while trying to delete the set."
    );
    return Promise.reject(err);
  }
};

export { create, deleteSet, getAll, getOne, update };
