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
  cards: FlashCardType[];
  createdBy?: string;
}

export interface CompactCardSetType extends Omit<CardSetType, "cards"> {
  cards: number;
}

export type ButtonStyle = "primary" | "secondary" | "icon";

export type ButtonIcon = "arrow-left" | "arrow-right";
