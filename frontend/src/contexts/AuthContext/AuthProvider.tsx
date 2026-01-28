import { type PropsWithChildren, useEffect, useState } from 'react'

import { type User } from '@/shared/types'
import { getCurrentUser } from '@/api/requests'

import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        try {
          const res = await getCurrentUser()
          setUser(res.data)
        } catch {
          localStorage.removeItem('token')
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const setAuth = (userData: User, token: string) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
