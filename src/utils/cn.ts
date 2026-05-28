import clsx, { type ClassValue } from 'clsx'

/** Merge Tailwind classes conditionally */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/** Format date to Brazilian locale */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/** Format time HH:MM */
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Get initials from full name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

/** Simulate network delay */
export const simulateDelay = (ms = 1200): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/** Format phone number */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  const match = digits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
  if (!match) return value
  if (!match[2]) return match[1]
  if (!match[3]) return `(${match[1]}) ${match[2]}`
  return `(${match[1]}) ${match[2]}-${match[3]}`
}

/** Map document status to display label */
export function documentStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: 'Pendente',
    analyzing: 'Em Análise',
    ready: 'Pronto',
    rejected: 'Recusado',
  }
  return map[status] ?? status
}

/** Map document status to color classes */
export function documentStatusColors(status: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-[#FFF3CD]', text: 'text-[#856404]' },
    analyzing: { bg: 'bg-primary-container/20', text: 'text-primary' },
    ready: { bg: 'bg-[#E6F4EA]', text: 'text-[#137333]' },
    rejected: { bg: 'bg-error-container', text: 'text-on-error-container' },
  }
  return map[status] ?? { bg: 'bg-surface-container', text: 'text-on-surface' }
}
