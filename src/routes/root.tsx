import type { Params } from "react-router-dom";

import {
  getAll as getCardSets,
  getOne as getCardSet,
} from "@/services/cardsets";
import { getFlashCard } from "@/services/flashcards";

export async function allCardsetsLoader() {
  // TODO error handling
  const cardsets = await getCardSets();
  return cardsets;
}

export async function singleCardsetLoader({
  params,
}: {
  params: Params<"id">;
}) {
  // TODO error handling
  if (params && typeof params.id === "string") {
    const cardset = await getCardSet(params.id);
    return cardset;
  }
}

export async function singleFlashCardLoader({
  params,
}: {
  params: Params<"id" | "cardId">;
}) {
  if (
    params &&
    typeof params.id === "string" &&
    typeof params.cardId === "string"
  ) {
    const flashcard = await getFlashCard(params.id, params.cardId);
    return flashcard;
  }
}
