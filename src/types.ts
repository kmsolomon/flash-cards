export interface FlashCardType {
  id: string;
  question: string;
  answer: string;
  createdBy?: string;
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

export type ButtonStyle = "primary" | "secondary" | "icon";

export type ButtonIcon = "arrow-left" | "arrow-right";
