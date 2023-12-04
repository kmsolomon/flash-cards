export interface FlashCardType {
  id: string;
  question: string;
  answer: string;
  createdBy?: string;
}

export interface CardList {
  id: string;
  title: string;
  description?: string;
  cards: number[];
  createdBy?: string;
}
