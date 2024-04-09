import "./CardSet.css";

import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { CardSetType } from "@/types";

import Button from "../Button/Button";
import FlashCard from "../FlashCard/FlashCard";

function CardSet() {
  const cardSet = useLoaderData() as CardSetType;
  const [activeCard, setActiveCard] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const focusQuestion = () => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 10);
  };

  const previousCard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (activeCard !== 0) {
      setActiveCard(activeCard - 1);
      focusQuestion();
    }
  };

  const nextCard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (activeCard < cardSet.flashcards.length) {
      setActiveCard(activeCard + 1);
      focusQuestion();
    }
  };

  return (
    <div className="card-set">
      <h1>{cardSet.title}</h1>
      <div className="card-container" data-testid="card-container">
        {cardSet.flashcards !== null && cardSet.flashcards.length > 0 ? (
          <FlashCard
            ref={ref}
            key={cardSet.flashcards[activeCard].id}
            card={cardSet.flashcards[activeCard]}
            numOf={`${activeCard + 1} of ${cardSet.flashcards.length}`}
          />
        ) : (
          <div>There are currently no flash cards for this set</div>
        )}
      </div>
      {cardSet.flashcards !== null && cardSet.flashcards.length > 0 ? (
        <div className="set-controls">
          <Button
            style="icon"
            ariaLabel="Previous question"
            icon="arrow-left"
            type="button"
            disabled={activeCard === 0}
            clickHandler={previousCard}
          />
          <Button
            style="icon"
            ariaLabel="Next question"
            icon="arrow-right"
            type="button"
            disabled={activeCard === cardSet.flashcards.length - 1}
            clickHandler={nextCard}
          />
        </div>
      ) : null}
      <div>
        <a href={`/set/${cardSet.id}`}>Return to set overview</a>
      </div>
    </div>
  );
}

export default CardSet;
