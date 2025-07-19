import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Notes ${slug[0]}`,
    description: `Notes sorted by tag ${slug[0]}`,
    openGraph: {
      title: `Notes ${slug[0]}`,
      description: `Notes sorted by tag ${slug[0]}`,
      url: `http://localhost:3000/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;

  const tagQuery = slug[0] === "all" ? "" : slug[0];

  const notesData = await fetchNotes("", 1, tagQuery);

  return (
    <div>
      <NotesClient tagQuery={tagQuery} initialData={notesData} />
    </div>
  );
}