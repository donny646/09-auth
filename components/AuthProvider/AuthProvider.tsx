'use client'

import { checkSession, getMe } from '@/lib/api/clientApi'
import { useAuth } from '@/lib/store/authStore'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser)
  const clearAuth = useAuth((state) => state.clearAuth)

  useEffect(() => {
    const fetchSession = async () => {
      const isAuthenticated = await checkSession()
      if (isAuthenticated) {
        const user = await getMe()
        setUser(user)
      } else {
        clearAuth();
        return
      }
    }
    fetchSession()
  }, [clearAuth, setUser])

  return children
}

export default AuthProvider