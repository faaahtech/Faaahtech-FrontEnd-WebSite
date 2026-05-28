import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  size?: 'sm' | 'md'
  icon?: string
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', icon, className }: BadgeProps) {
  const variants = {
    default: 'bg-surface-container text-on-surface',
    primary: 'bg-primary-container/20 text-primary',
    success: 'bg-[#E6F4EA] text-[#137333]',
    warning: 'bg-[#FFF3CD] text-[#856404]',
    danger: 'bg-error-container text-on-error-container',
    secondary: 'bg-secondary-container text-on-secondary-container',
  }

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[12px] px-3 py-1',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold uppercase tracking-wide rounded-full',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  )
}
