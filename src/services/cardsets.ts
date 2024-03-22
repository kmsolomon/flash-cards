import { CardSetType, CompactCardSetType } from "@/types";

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

export { getAll, getOne };
