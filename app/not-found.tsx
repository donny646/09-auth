import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "NoteHub Error",
  description: "Sorry, page not found",
  openGraph: {
    title: "NoteHub Error",
    description: "Sorry, page not found",
    url: "http://localhost:3000/",
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}