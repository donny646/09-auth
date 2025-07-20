'use client'

import React from 'react'
import css from "./AuthNavigation.module.css"
import { useAuth } from '@/lib/store/authStore'
import { logOut } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'

const AuthNavigation = () => {
  const { isAuthenticated, clearAuth } = useAuth()
  const router = useRouter()

  const handleLogOut = async () => {
    await logOut()
    clearAuth()
    router.replace('/sign-in')
  }

  return isAuthenticated ? (<><li className={css.navigationItem}>
    <a href="/profile" className={css.navigationLink}>
      Profile
    </a>
  </li>
    <li className={css.navigationItem}>
      <button className={css.logoutButton} onClick={handleLogOut}>
        Logout
      </button>
    </li></>) : (
    <>
      <li className={css.navigationItem}>
        <a href="/sign-in" className={css.navigationLink}>
          Login
        </a>
      </li>
      <li className={css.navigationItem}>
        <a href="/sign-up" className={css.navigationLink}>
          Sign up
        </a>
      </li>
    </>
    );
  
}

export default AuthNavigation