import type { User } from '@/types/auth'

export interface MockUserRecord {
  user: User
  password: string
}

export const MOCK_USERS: MockUserRecord[] = [
  {
    user: {
      id: 'u-001',
      name: 'João Silva',
      email: 'joao.silva@fatec.sp.gov.br',
      ra: '2024001234',
      course: 'Análise e Desenvolvimento de Sistemas',
      period: 'noite',
      semester: 3,
      role: 'student',
    },
    password: '123456',
  },
  {
    user: {
      id: 'u-002',
      name: 'Mariana Costa',
      email: 'mariana.costa@fatec.sp.gov.br',
      ra: '2023005678',
      course: 'Sistemas de Informação',
      period: 'manha',
      semester: 5,
      role: 'student',
    },
    password: '123456',
  },
  {
    user: {
      id: 'u-staff',
      name: 'Ana Secretaria',
      email: 'ana.secretaria@fatec.sp.gov.br',
      ra: 'STAFF001',
      course: '',
      period: 'manha',
      semester: 0,
      role: 'staff',
    },
    password: 'admin123',
  },
]

/** Accepted identifiers: RA, email or CPF (simulated) */
export const findUserByIdentifier = (identifier: string): MockUserRecord | undefined => {
  return MOCK_USERS.find(
    (r) =>
      r.user.ra === identifier ||
      r.user.email === identifier ||
      identifier === '000.000.000-00', // demo CPF
  )
}
