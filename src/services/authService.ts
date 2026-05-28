import type { LoginCredentials, User } from '@/types/auth'
import { findUserByIdentifier } from '@/mocks/users'
import { generateFakeToken, saveToken, saveUser, removeToken, removeUser, getToken, getUser, isTokenValid } from '@/utils/token'
import { simulateDelay } from '@/utils/cn'

export interface LoginResponse {
  user: User
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    await simulateDelay(1500)

    const record = findUserByIdentifier(credentials.identifier.trim())

    if (!record) {
      throw new Error('Usuário não encontrado. Verifique sua matrícula, CPF ou e-mail.')
    }

    if (record.password !== credentials.password) {
      throw new Error('Senha incorreta. Tente novamente.')
    }

    const token = generateFakeToken(record.user.id)
    saveToken(token)
    saveUser(record.user)

    return { user: record.user, token }
  },

  logout(): void {
    removeToken()
    removeUser()
  },

  getSession(): { user: User; token: string } | null {
    const token = getToken()
    const user = getUser<User>()

    if (!token || !user || !isTokenValid(token)) {
      this.logout()
      return null
    }

    return { user, token }
  },

  isAuthenticated(): boolean {
    const token = getToken()
    return !!token && isTokenValid(token)
  },
}
