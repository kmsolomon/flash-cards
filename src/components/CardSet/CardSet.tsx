import "./CardSet.css";

import { useRef, useState } from "react";

import { CardSetType } from "@/types";

import Button from "../Button/Button";
import FlashCard from "../FlashCard/FlashCard";

interface CardSetProps {
  cardSet: CardSetType;
}

function CardSet({ cardSet }: CardSetProps) {
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
    if (activeCard < cardSet.cards.length) {
      setActiveCard(activeCard + 1);
      focusQuestion();
    }
  };

  return (
    <div className="card-set">
      <h1>{cardSet.title}</h1>
      <div className="card-container" data-testid="card-container">
        {cardSet.cards !== null && cardSet.cards.length > 0 ? (
          <FlashCard
            ref={ref}
            key={cardSet.cards[activeCard].id}
            card={cardSet.cards[activeCard]}
            numOf={`${activeCard + 1} of ${cardSet.cards.length}`}
          />
        ) : (
          <div>There are currently no flash cards for this set</div>
        )}
      </div>
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
          disabled={activeCard === cardSet.cards.length - 1}
          clickHandler={nextCard}
        />
      </div>
    </div>
  );
}

export default CardSet;
