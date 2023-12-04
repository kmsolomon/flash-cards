import "./FlashCard.css";

import { useState } from "react";

import { FlashCardType } from "@/types";

interface CardProps {
  setTitle: string;
  card: FlashCardType;
}

function FlashCard({ setTitle, card }: CardProps) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div
      className={`flash-card${showAnswer ? " with-answer" : ""}`}
      data-testid="card"
    >
      <div className="flash-card-inner">
        <div className="question" data-testid="question">
          <div className="header">{setTitle}</div>
          <p>{card.question}</p>
          <button
            className="btn primary"
            type="button"
            onClick={() => setShowAnswer(true)}
          >
            Show answer
          </button>
        </div>
        <div className="answer" data-testid="answer">
          <div className="header">{setTitle}</div>
          <p>{card.answer}</p>
          <button
            className="btn primary"
            type="button"
            onClick={() => setShowAnswer(false)}
          >
            Show question
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
