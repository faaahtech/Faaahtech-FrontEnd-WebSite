import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/utils/cn'

interface TopBarProps {
  title?: string
}

export function TopBar({ title = 'Secretária Digital' }: TopBarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="hidden md:flex justify-between items-center h-16 px-margin-desktop w-full sticky top-0 bg-surface border-b border-outline-variant z-20">
      <h2 className="font-hanken text-[22px] font-bold text-on-surface">{title}</h2>

      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative hidden lg:block w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-[14px] font-inter focus:ring-2 focus:ring-primary/20 outline-none text-on-surface placeholder:text-on-surface-variant"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-outline-variant pl-5">
          {/* Notifications */}
          <button className="relative text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container-low">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
          </button>

          {/* Help */}
          <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container-low">
            <span className="material-symbols-outlined">help_outline</span>
          </button>

          {/* Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center text-[13px] font-bold border-2 border-surface hover:ring-2 hover:ring-primary/30 transition-all"
            >
              {user ? getInitials(user.name) : 'U'}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/50 py-2 w-48 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-outline-variant/30">
                  <p className="font-inter text-[13px] font-semibold text-on-surface">{user?.name}</p>
                  <p className="font-inter text-[11px] text-on-surface-variant">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-on-surface hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Meu Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-error hover:bg-error-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
