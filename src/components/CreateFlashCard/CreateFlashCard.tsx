import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createFlashCard } from "@/services/flashcards";

import Button from "../Button/Button";

interface CreateFormErrors {
  question: string | null;
  answer: string | null;
  form: string | null;
}

function CreateFlashCard() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [ariaInvalidQuestion, setAriaInvalidQuestion] =
    useState<boolean>(false);
  const [ariaInvalidAnswer, setAriaInvalidAnswer] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreateFormErrors>({
    question: null,
    answer: null,
    form: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleCreateCard = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (allInputsValid() && id) {
      try {
        await createFlashCard({
          question,
          answer,
          cardsetId: id,
        });

        navigate(`/set/${id}`);
      } catch (error) {
        console.error("something went wrong");
      }
    }
  };
  return (
    <div className="main-content">
      <h1>Add new flash card</h1>
      <form name="createFlashCard" onSubmit={handleCreateCard}>
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
        <Button style="primary" type="submit" text="Add card" />
      </form>
    </div>
  );
}

export default CreateFlashCard;
