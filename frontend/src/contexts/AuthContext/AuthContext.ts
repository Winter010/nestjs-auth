import { createContext } from 'react'

import { type User } from '@/shared/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  setAuth: (userData: User, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
