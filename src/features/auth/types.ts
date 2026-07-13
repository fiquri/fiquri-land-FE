export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  bio?: string
  company?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
