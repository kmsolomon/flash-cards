import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import { updateFlashCard } from "@/services/flashcards";
import { FlashCardType } from "@/types";

import Button from "../Button/Button";

interface EditFormErrors {
  question: string | null;
  answer: string | null;
  form: string | null;
}

function EditFlashCard() {
  const flashCard = useLoaderData() as FlashCardType;
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [ariaInvalidQuestion, setAriaInvalidQuestion] =
    useState<boolean>(false);
  const [ariaInvalidAnswer, setAriaInvalidAnswer] = useState<boolean>(false);
  const [errors, setErrors] = useState<EditFormErrors>({
    question: null,
    answer: null,
    form: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (flashCard.question) {
      setQuestion(flashCard.question);
    }
    if (flashCard.answer) {
      setAnswer(flashCard.answer);
    }
  }, [flashCard]);

  const allInputsValid = (): boolean => {
    let questionValid = false;
    let answerValid = false;

    const errorsUpdate = { ...errors };
    if (question.trim() === "") {
      setAriaInvalidQuestion(true);
      errorsUpdate.question = "Error: Question can not be a blank string.";
    } else if (question.length > 150) {
      setAriaInvalidQuestion(true);
      errorsUpdate.question =
        "Error: Question can not be longer than 150 characters.";
    } else {
      setAriaInvalidQuestion(false);
      errorsUpdate.question = null;
      questionValid = true;
    }

    if (answer.trim() === "") {
      setAriaInvalidAnswer(true);
      errorsUpdate.answer = "Error: Answer can not be a blank string.";
    } else if (answer.length > 1000) {
      setAriaInvalidAnswer(true);
      errorsUpdate.answer =
        "Error: Answer can not be longer than 1000 characters.";
    } else {
      setAriaInvalidAnswer(false);
      errorsUpdate.answer = null;
      answerValid = true;
    }

    setErrors(errorsUpdate);
    return questionValid && answerValid;
  };

  const handleEditCard = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (allInputsValid() && id) {
      const updates: Partial<FlashCardType> = {};
      if (flashCard.question !== question) {
        updates.question = question;
      }
      if (flashCard.answer !== answer) {
        updates.answer = answer;
      }

      if (
        typeof updates.answer === "undefined" &&
        typeof updates.question === "undefined"
      ) {
        return;
      }
      try {
        await updateFlashCard(id, flashCard.id, updates);
        navigate(`/set/${id}`);
      } catch (err) {
        console.error("Something went wrong while creating your flash card.");
        let message = "";

        if (err instanceof Error) {
          message = err.message;
        }
        navigate("/error", { state: { message: message } });
      }
    }
  };

  return (
    <div className="main-content">
      <h1>Edit flash card</h1>
      <form name="editFlashCard" onSubmit={handleEditCard}>
        <div className="input-group">
          <label htmlFor="question">Question</label>
          <div
            id="questionError"
            className={errors.question ? "input-error" : "hide"}
            data-testid="questionError"
          >
            {errors.question}
          </div>
          <textarea
            required
            id="question"
            name="question"
            maxLength={150}
            value={question}
            aria-invalid={ariaInvalidQuestion}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="answer">Answer</label>
          <div
            id="answerError"
            className={errors.answer ? "input-error" : "hide"}
            data-testid="answerError"
          >
            {errors.answer}
          </div>
          <textarea
            required
            id="answer"
            name="answer"
            maxLength={1000}
            rows={4}
            value={answer}
            aria-invalid={ariaInvalidAnswer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </div>
        <div className="button-group">
          <Button style="primary" type="submit" text="Save changes" />
          <Button
            style="secondary"
            type="button"
            text="Cancel"
            clickHandler={() => {
              navigate(`/set/${id}`);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default EditFlashCard;
