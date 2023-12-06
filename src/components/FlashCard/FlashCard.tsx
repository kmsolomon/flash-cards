import "./FlashCard.css";

import { useState } from "react";

import { FlashCardType } from "@/types";

import Button from "../Button/Button";

interface CardProps {
  card: FlashCardType;
}

function FlashCard({ card }: CardProps) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div
      className={`flash-card${showAnswer ? " with-answer" : ""}`}
      data-testid="card"
    >
      <div className="flash-card-inner">
        <div className="question" data-testid="question">
          <div className="header">
            <h2>Question</h2>
          </div>
          <p>{card.question}</p>
          <Button
            style="primary"
            type="button"
            text="Show answer"
            clickHandler={() => setShowAnswer(true)}
          />
        </div>
        <div className="answer" data-testid="answer">
          <div className="header">
            <h2>Answer</h2>
          </div>
          <p>{card.answer}</p>
          <Button
            style="primary"
            type="button"
            text="Show question"
            clickHandler={() => setShowAnswer(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
