import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { AuthContextValue, AuthState, LoginCredentials } from '@/types/auth'
import { authService } from '@/services/authService'

// ─── State & Actions ──────────────────────────────────────────────────────────

type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AuthState['user']; token: string } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESTORE_SESSION'; payload: { user: AuthState['user']; token: string } }

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'LOGOUT':
      return { ...initialState, isLoading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'RESTORE_SESSION':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Restore session on mount
  useEffect(() => {
    const session = authService.getSession()
    if (session) {
      dispatch({ type: 'RESTORE_SESSION', payload: session })
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const { user, token } = await authService.login(credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login.'
      dispatch({ type: 'LOGIN_ERROR', payload: message })
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' })

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
