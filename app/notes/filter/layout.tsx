import css from "./LayoutNotes.module.css";

interface NotesListLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesListLayout({
  children,
  sidebar,
}: NotesListLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}