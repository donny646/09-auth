"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, NotesResponse } from "@/lib/api";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

type NotesClientProps = {
  tagQuery: string;
  initialData: NotesResponse;
};

export default function NotesClient({
  tagQuery,
  initialData,
}: NotesClientProps) {
  const [searchQuery, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [debounceQuery] = useDebounce(searchQuery, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, currentPage, tagQuery],
    queryFn: () => fetchNotes(debounceQuery, currentPage, tagQuery),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    initialData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (debounceQuery: string) => {
    setQuery(debounceQuery);
    setCurrentPage(1);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
        {/* <button onClick={createNoteBtn} className={css.button}>
          Create note +
        </button> */}
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}