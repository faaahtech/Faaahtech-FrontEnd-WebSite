import { cn } from '@/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullPage?: boolean
}

export function LoadingSpinner({ size = 'md', className, fullPage = false }: LoadingSpinnerProps) {
  const sizes = { sm: 'text-[20px]', md: 'text-[32px]', lg: 'text-[48px]' }

  const spinner = (
    <span
      className={cn('material-symbols-outlined text-primary animate-spin-slow', sizes[size], className)}
    >
      sync
    </span>
  )

  if (fullPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface">
        {spinner}
        <p className="font-inter text-[14px] text-on-surface-variant">Carregando...</p>
      </div>
    )
  }

  return spinner
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/30 p-6 animate-pulse', className)}>
      <div className="h-4 w-32 bg-surface-container-high rounded mb-4" />
      <div className="h-3 w-full bg-surface-container rounded mb-2" />
      <div className="h-3 w-3/4 bg-surface-container rounded" />
    </div>
  )
}
