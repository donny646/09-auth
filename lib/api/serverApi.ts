import { fetchNotesResponse, Note } from '@/types/note'
import {ServerBoolResponse, User} from '@/types/user'
import { cookies } from 'next/headers'
import nextServer from './api'

export async function fetchServerNotes(searchText: string, page: number, tag?: string): Promise<fetchNotesResponse> {
    const cookieStore = await cookies();
    const res = await nextServer.get<fetchNotesResponse>("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
        params: {
            page,
            perPage: 12,
            ...(searchText && { search: searchText }),
            ...(tag && { tag }),
        }
    });
    return res.data
};

export async function getSingleNoteServer(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookieData = await cookies()
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  })
  return response
}

export const getServerMe = async () => {
  const cookieData = await cookies()
  const { data } = await nextServer<User>(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  })
  return data
}