import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import { update } from "@/services/cardsets";
import { CardSetType } from "@/types";

interface EditFormErrors {
  title: string | null;
  description: string | null;
  form: string | null;
}

function EditCardSet() {
  const navigate = useNavigate();
  const cardSet = useLoaderData() as CardSetType;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ariaInvalidTitle, setAriaInvalidTitle] = useState<boolean>(false);
  const [errors, setErrors] = useState<EditFormErrors>({
    title: null,
    description: null,
    form: null,
  });

  useEffect(() => {
    if (cardSet.title) {
      setTitle(cardSet.title);
    }
    if (cardSet.description) {
      setDescription(cardSet.description);
    }
  }, [cardSet]);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const clearFields = () => {
    setTitle("");
    setAriaInvalidTitle(false);
    setDescription("");
    setErrors({ title: null, description: null, form: null });
  };

  const isValidTitle = (): boolean => {
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
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (isValidTitle()) {
      try {
        const updates: Partial<CardSetType> = {};
        if (title !== cardSet.title) {
          updates.title = title;
        }
        if (description !== cardSet.description) {
          updates.description = description;
        }
        if (
          typeof updates.title !== "undefined" ||
          typeof updates.description !== "undefined"
        ) {
          await update(cardSet.id, updates);
          clearFields();
        }

        navigate(`/set/${cardSet.id}`);
      } catch (error) {
        //todo
        console.error("something went wrong while creating your card set. ");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Edit details for {cardSet.title}</h1>
      <form id="editSet" name="editSet" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <div
            id="titleError"
            className={errors.title ? "" : "hide"}
            data-testid="titleError"
          >
            {errors.title}
          </div>
          <textarea
            ref={titleRef}
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
            rows={4}
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="button-group">
          <Button style="primary" type="submit" text="Save changes" />
          <Button
            style="secondary"
            type="button"
            text="Cancel"
            clickHandler={() => {
              clearFields();
              navigate(`/set/${cardSet.id}`);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default EditCardSet;
