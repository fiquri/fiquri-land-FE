import React, { createContext, useState, useEffect } from 'react'
import { User, AuthState } from '../types'
import { loginMock } from '../api'

export interface AuthContextType extends AuthState {
  login: (email: string, name: string) => Promise<void>
  logout: () => void
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, name: string) => {
    setIsLoading(true)
    try {
      const loggedUser = await loginMock(email, name)
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      setIsAuthModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
