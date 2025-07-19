import axios from "axios";
import type { NewNoteData, Note } from "../types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(
  query: string,
  currentPage: number,
  tagQuery: string
) {
  const response = await axios.get<NotesResponse>(`/notes`, {
    params: {
      search: query || undefined,
      page: currentPage,
      perPage: 12,
      tag: tagQuery || undefined,
    },
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}

export async function fetchNoteById(id: number) {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}

export async function createNote(noteData: NewNoteData) {
  const response = await axios.post<Note>(`/notes`, noteData, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}

export async function deleteNote(noteId: number) {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}