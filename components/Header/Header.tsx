"use client";

import { useState } from "react";
import TagsMenu from "../TagsMenu/TagsMenu";
import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  const [tagsMenuIsOpen, setTagsMenuIsOpen] = useState<boolean>(false);

  const tagsMenuToggle = () => {
    setTagsMenuIsOpen(!tagsMenuIsOpen);
  };

  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={css.headerLink}>
              Home
            </Link>
          </li>
          <li>
            <TagsMenu
              tagsMenuToggle={tagsMenuToggle}
              tagsMenuIsOpen={tagsMenuIsOpen}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;