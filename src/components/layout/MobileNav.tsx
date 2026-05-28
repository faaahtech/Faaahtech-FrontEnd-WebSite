import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/secretaria', icon: 'forum', label: 'Secretária AI' },
  { to: '/agenda', icon: 'calendar_month', label: 'Agenda' },
]

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-around px-4 z-30 shadow-top-bar">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all',
              isActive ? 'text-primary' : 'text-on-surface-variant',
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="font-inter text-[10px] font-semibold">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
