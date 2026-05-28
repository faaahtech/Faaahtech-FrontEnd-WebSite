import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/utils/cn'

interface NavItem {
  to: string
  icon: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/secretaria', icon: 'forum', label: 'Secretária AI' },
  { to: '/agenda', icon: 'calendar_month', label: 'Agenda' },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant flex-col z-30">
      {/* Brand */}
      <div className="px-6 pt-8 pb-6 border-b border-outline-variant/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-primary-glow">
            <span className="material-symbols-outlined fill text-white text-[20px]">school</span>
          </div>
          <div>
            <h1 className="font-hanken text-[18px] font-bold text-primary tracking-tight leading-none">
              Faaahtech
            </h1>
            <p className="font-inter text-[11px] text-on-surface-variant">Secretária Acadêmica</p>
          </div>
        </div>

        {/* User info */}
        {user && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container">
            <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center text-[13px] font-bold shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="overflow-hidden">
              <p className="font-inter text-[13px] font-semibold text-on-surface truncate leading-tight">
                {user.name.split(' ')[0]} {user.name.split(' ').slice(-1)[0]}
              </p>
              <p className="font-inter text-[11px] text-on-surface-variant truncate">RA: {user.ra}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150 group',
                isActive
                  ? 'bg-primary text-on-primary shadow-primary-glow'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'material-symbols-outlined text-[22px] transition-all',
                    isActive ? 'fill' : '',
                  )}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-inter text-[12px] font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-outline-variant/50 space-y-1">
        <NavLink
          to="/configuracoes"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span className="font-inter text-[12px] font-semibold uppercase tracking-wider">Configurações</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span className="font-inter text-[12px] font-semibold uppercase tracking-wider">Sair</span>
        </button>
      </div>
    </aside>
  )
}
