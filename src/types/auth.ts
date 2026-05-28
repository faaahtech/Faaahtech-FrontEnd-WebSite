export interface User {
  id: string
  name: string
  email: string
  ra: string // Registro do Aluno (student ID)
  course: string
  period: 'manha' | 'tarde' | 'noite'
  semester: number
  avatarUrl?: string
  role: 'student' | 'staff' | 'admin'
}

export interface LoginCredentials {
  identifier: string // RA, CPF, or email
  password: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}
