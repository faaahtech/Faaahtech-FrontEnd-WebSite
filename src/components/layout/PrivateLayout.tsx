import { type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { MobileNav } from './MobileNav'

interface PrivateLayoutProps {
  children: ReactNode
  title?: string
}

export function PrivateLayout({ children, title }: PrivateLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <TopBar title={title} />

        <main className="flex-1 p-4 md:p-margin-desktop bg-background overflow-y-auto pb-24 md:pb-8">
          <div className="max-w-container-max-width mx-auto">{children}</div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
