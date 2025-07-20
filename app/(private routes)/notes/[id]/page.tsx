import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { getSingleNoteServer } from "@/lib/api/serverApi";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params
  const noteId = id
  const note = await getSingleNoteServer(noteId)

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://08-zustand-eight-cyan.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ]
    }
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  const noteId = id

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNoteServer(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;