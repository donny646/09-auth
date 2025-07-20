"use client" 
import React, { useState } from 'react'
import Image from 'next/image'
import css from "./EditPage.module.css"
import { useAuth } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { EditUser } from '@/types/user'
import { editUser } from '@/lib/api/clientApi'

const EditPage = () => {
    const [error, setError] = useState("");
    const user = useAuth((state) => state.user);
    const setUser = useAuth((state) => state.setUser);
    const router = useRouter();

const handleSubmit = async (formData: FormData) => {
  const username = String(formData.get("username")).trim();
  
  if (!username) {
    setError("Username is required");
    return;
  }

  if (user) {
    const updatedUser: EditUser = {
      username,
      email: user.email,
    };

    try {
      console.log("Submitting data:", updatedUser);
      const response = await editUser(updatedUser);
      setUser(response);
      router.push("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  }
};
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                      src={
              user?.avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
                    alt="profile avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} action={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className={css.input}
                            defaultValue={user?.username}
                        />
                    </div>

                    <p>{user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
                {error && <p className={css.error}>{error}</p>}
            </div>
        </main>

    );
};


export default EditPage