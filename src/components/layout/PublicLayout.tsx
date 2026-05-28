import { type ReactNode } from 'react'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-dot flex flex-col">
      {children}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-secondary opacity-60 pointer-events-none" />
    </div>
  )
}
