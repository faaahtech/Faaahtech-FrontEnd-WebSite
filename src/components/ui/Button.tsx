import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-inter font-semibold transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100'

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-[#6a000e] shadow-primary-glow',
    secondary: 'bg-surface-container-high text-secondary hover:bg-surface-container-highest border border-outline-variant',
    ghost: 'bg-transparent text-primary hover:bg-primary-container/10',
    danger: 'bg-error text-on-error hover:bg-[#9c0d0d]',
  }

  const sizes = {
    sm: 'text-xs px-4 py-2 rounded-full',
    md: 'text-sm px-6 py-3 rounded-lg',
    lg: 'text-base px-8 py-4 rounded-xl',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="material-symbols-outlined animate-spin-slow text-[18px]">sync</span>
          Processando...
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
}
