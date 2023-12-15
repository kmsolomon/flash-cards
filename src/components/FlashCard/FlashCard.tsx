import "./FlashCard.css";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { FlashCardType } from "@/types";

import Button from "../Button/Button";

interface CardProps {
  card: FlashCardType;
  numOf?: string;
}

const FlashCard = forwardRef<HTMLDivElement, CardProps>(function FlashCard(
  { card, numOf }: CardProps,
  ref
) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const questionRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const handleShowQuestion = () => {
    setShowAnswer(false);
    if (questionRef.current !== null) {
      questionRef.current.focus();
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    if (answerRef.current !== null) {
      answerRef.current.focus();
    }
  };

  useImperativeHandle(ref, () => questionRef.current!, []);

  return (
    <div
      className={`flash-card${showAnswer ? " with-answer" : ""}`}
      data-testid="card"
    >
      <div className="flash-card-inner">
        <div
          ref={questionRef}
          className="question"
          tabIndex={-1}
          data-testid="question"
        >
          <div className="header">
            <h2>Question {numOf ? numOf : null}</h2>
          </div>
          <p>{card.question}</p>
          <Button
            style="primary"
            type="button"
            text="Show answer"
            disabled={showAnswer}
            clickHandler={handleShowAnswer}
          />
        </div>
        <div
          ref={answerRef}
          className="answer"
          tabIndex={-1}
          data-testid="answer"
        >
          <div className="header">
            <h2>Answer {numOf ? numOf : null}</h2>
          </div>
          <p>{card.answer}</p>
          <Button
            style="primary"
            type="button"
            text="Show question"
            disabled={!showAnswer}
            clickHandler={handleShowQuestion}
          />
        </div>
      </div>
    </div>
  );
});

export default FlashCard;
