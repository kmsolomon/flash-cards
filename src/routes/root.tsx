import { getAll as getCardSets } from "@/services/cardsets";

export async function allCardsetsLoader() {
  // TODO error handling
  const cardsets = await getCardSets();
  console.log("cardsets", cardsets);
  return cardsets;
}
