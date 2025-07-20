import { Metadata } from "next";
import css from "./Profile.module.css"
import Image from "next/image"
import { getServerMe } from "@/lib/api/serverApi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your own profile page",
  openGraph: {
    title: "Profile",
    description: "Your own profile page", 
    url: "https://localhost:3000/profile",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Profile = async () => {
  const user = await getServerMe();
  
    return (<main className={css.mainContent}>
    <div className={css.profileCard}>
        <div className={css.header}>
         <h1 className={css.formTitle}>Profile Page</h1>
         <Link className={css.editProfileButton}  href="/profile/edit">
           Edit Profile
         </Link>
       </div>
       <div className={css.avatarWrapper}>
        <Image
          src={
              user.avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      <div className={css.profileInfo}>
        <p>
          Username: {user.username || "NoteHub User"}
        </p>
        <p>
          Email: {user.email}
        </p>
      </div>
    </div>
  </main>)
  ;
  };
  
export default Profile;
  