import Link from "next/link";
import css from "./TagsMenu.module.css";
import { Tag } from "@/types/note";

const tags: Tag[] = ["Meeting", "Personal", "Shopping", "Todo", "Work"];

interface TagsMenuProps {
  tagsMenuToggle: () => void;
  tagsMenuIsOpen: boolean;
}

export default function TagsMenu({
  tagsMenuToggle,
  tagsMenuIsOpen,
}: TagsMenuProps) {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={tagsMenuToggle}>
        Notes ▾
      </button>
      {tagsMenuIsOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              onClick={tagsMenuToggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={tagsMenuToggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}