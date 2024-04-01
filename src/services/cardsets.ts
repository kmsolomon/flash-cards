import { CardSetType, CompactCardSetType, NewCardSetType } from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAll = async (): Promise<CompactCardSetType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cardset`);
    // TODO handle non-200 reponse?
    const data: CompactCardSetType[] = await response.json();
    return data;
  } catch (error) {
    // TODO, decide how to handle errors
    return [];
  }
};

const getOne = async (id: string): Promise<CardSetType> => {
  try {
    const response = await fetch(`${BASE_URL}/cardset/${id}`);
    const data: CardSetType = await response.json();

    return data;
  } catch (error) {
    // TODO
    throw new Error("Something went wrong");
  }
};

const create = async (newCard: NewCardSetType): Promise<CardSetType> => {
  try {
    const response = await fetch(`${BASE_URL}/cardset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    });
    const data: CardSetType = await response.json();

    return data;
  } catch (error) {
    // TODO
    throw new Error("Something went wrong");
  }
};

const update = async (
  id: string,
  updates: Partial<CardSetType>
): Promise<CardSetType> => {
  try {
    const response = await fetch(`${BASE_URL}/cardset/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const data: CardSetType = await response.json();

    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export { create, getAll, getOne, update };
