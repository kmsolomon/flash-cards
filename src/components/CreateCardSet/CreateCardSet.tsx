import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { create } from "@/services/cardsets";

import Button from "../Button/Button";

interface CreateFormErrors {
  title: string | null;
  description: string | null;
  form: string | null;
}

function CreateCardSet() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [ariaInvalidTitle, setAriaInvalidTitle] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<CreateFormErrors>({
    title: null,
    description: null,
    form: null,
  });

  const titleRef = useRef<HTMLTextAreaElement>(null);

  function clearFields(): void {
    setTitle("");
    setAriaInvalidTitle(false);
    setDescription("");
    setErrors({ title: null, description: null, form: null });
  }

  function isValidTitle(): boolean {
    if (title.trim() === "") {
      setAriaInvalidTitle(true);
      setErrors({
        ...errors,
        title: "Error: Title must be a non-blank string.",
      });
      if (titleRef && titleRef.current) {
        titleRef.current.focus();
      }
      return false;
    } else {
      setAriaInvalidTitle(false);
      setErrors({
        ...errors,
        title: null,
      });
      return true;
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (isValidTitle()) {
      try {
        const postResponse = await create({
          title,
          description,
          flashcards: [],
        });

        clearFields();
        navigate(`/set/${postResponse.id}`);
      } catch (error) {
        //todo
        console.error("something went wrong while creating your card set. ");
        console.log(error);
      }
    }
  }
  return (
    <div>
      <h1>Create set</h1>
      <form name="createSetForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <label htmlFor="title">Title (required)</label>
          <div
            id="titleError"
            className={errors.title ? "" : "hide"}
            data-testid="titleError"
          >
            {errors.title}
          </div>
          <textarea
            ref={titleRef}
            required
            id="title"
            name="title"
            value={title}
            maxLength={100}
            aria-invalid={ariaInvalidTitle}
            aria-describedby="titleError"
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <Button style="primary" type="submit" text="Create set" />
      </form>
    </div>
  );
}

export default CreateCardSet;
