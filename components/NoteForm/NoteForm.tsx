"use client";

import { useState } from "react";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import * as Yup from "yup";
import type { NewNoteData } from "@/types/note";
import { useNoteDraft } from "@/lib/store/noteStore";

const NewNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  content: Yup.string().max(500, "Too Long!"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("This field is required"),
});

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const [errors, setErrors] = useState<
    Partial<Record<keyof NewNoteData, string>>
  >({});

  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setDraft({ ...draft, [name]: value });
  };

  const handleCreate = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;

    try {
      const validatedData = (await NewNoteSchema.validate(values, {
        abortEarly: false,
      })) as NewNoteData;
      mutate(validatedData);
    } catch (error) {
      const validationErrors: Partial<Record<keyof NewNoteData, string>> = {};

      if (error instanceof Yup.ValidationError) {
        for (const err of error.inner) {
          if (err.path) {
            validationErrors[err.path as keyof NewNoteData] = err.message;
          }
        }
      }

      setErrors(validationErrors);
    }
  };

  return (
    <form className={css.form} action={handleCreate}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="">Choose something</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={router.back}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}