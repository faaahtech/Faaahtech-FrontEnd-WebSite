import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  bordered?: boolean
  accentLeft?: boolean
}

export function Card({ children, hover = false, bordered = true, accentLeft = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest rounded-xl shadow-card',
        hover && 'card-hover cursor-pointer',
        bordered && 'border border-outline-variant/30',
        accentLeft && 'border-l-4 border-l-primary',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string
  title: string
  action?: ReactNode
}

export function CardHeader({ icon, title, action, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-surface-variant flex items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
        )}
        <h4 className="font-inter text-[12px] tracking-widest font-semibold text-on-surface uppercase">
          {title}
        </h4>
      </div>
      {action}
    </div>
  )
}

export function CardBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}
