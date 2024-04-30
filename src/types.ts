export interface FlashCardType {
  id: string;
  question: string;
  answer: string;
  createdBy?: string;
  cardsetId: string;
}

export interface CardSetType {
  id: string;
  title: string;
  description?: string;
  flashcards: FlashCardType[];
  createdBy?: string;
}

export interface CompactCardSetType extends Omit<CardSetType, "flashcards"> {
  cards: number;
}

export type NewCardSetType = Omit<CardSetType, "id">;

export type NewFlashCardType = Omit<FlashCardType, "id">;

export type ButtonStyle = "primary" | "secondary" | "icon" | "small-icon";

export type ButtonIcon = "arrow-left" | "arrow-right" | "edit" | "delete";

export type MenuOptionItems = {
  name: string;
  action: () => void;
};

export const isCardSetType = (obj: unknown): obj is CardSetType => {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  const cardset = obj as CardSetType;

  if (typeof cardset.id !== "string") {
    return false;
  }
  if (typeof cardset.title !== "string") {
    return false;
  }
  if (cardset.description !== null && typeof cardset.description !== "string") {
    return false;
  }

  return true;
};
