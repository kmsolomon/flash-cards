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

export type ButtonStyle = "primary" | "secondary" | "icon";

export type ButtonIcon = "arrow-left" | "arrow-right";
