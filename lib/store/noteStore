import { NewNoteData } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (newNoteDraft: NewNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraft = create<NoteDraftStore>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (newNoteDraft: NewNoteData) => {
          return set({ draft: newNoteDraft });
        },
        clearDraft: () => set({ draft: initialDraft }),
      };
    },
    {
      name: "note-draft",
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);