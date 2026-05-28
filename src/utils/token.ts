import Cookies from 'js-cookie'

const TOKEN_KEY = 'faaahtech_token'
const USER_KEY = 'faaahtech_user'

/** Generate a fake JWT-like token */
export const generateFakeToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8 hours
      iss: 'faaahtech-portal',
    }),
  )
  const signature = btoa(`${userId}-${Date.now()}-fake-signature`)
  return `${header}.${payload}.${signature}`
}

export const saveToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: 'Strict' }) // 1 day
}

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY)
}

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY)
}

export const saveUser = (user: object): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = <T>(): T | null => {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

export const isTokenValid = (token: string): boolean => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const payload = JSON.parse(atob(parts[1]))
    return payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}
