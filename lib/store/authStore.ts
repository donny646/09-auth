import { User } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthStoreType = {
  isAuthenticated: boolean
  user: User | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User) => void
  clearAuth: () => void
}

export const useAuth = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: 'auth-storage', 
    }
  )
)