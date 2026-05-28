import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export function NotFoundPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-dot flex items-center justify-center p-4">
      <div className="text-center max-w-md animate-fade-in">
        {/* Large 404 */}
        <div className="relative mb-8">
          <p className="font-hanken text-[120px] font-black text-surface-container-highest leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[56px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              search_off
            </span>
          </div>
        </div>

        <h1 className="font-hanken text-[28px] font-bold text-on-surface mb-3">
          Página não encontrada
        </h1>
        <p className="font-inter text-[15px] text-on-surface-variant mb-8">
          A página que você está procurando não existe ou foi movida. Verifique o endereço ou volte para o início.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            leftIcon={<span className="material-symbols-outlined text-[18px]">home</span>}
          >
            {isAuthenticated ? 'Ir ao Dashboard' : 'Ir ao Login'}
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate(-1)}
            leftIcon={<span className="material-symbols-outlined text-[18px]">arrow_back</span>}
          >
            Voltar
          </Button>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-6 border-t border-outline-variant/30">
          <p className="font-inter text-[12px] text-on-surface-variant/50">
            Faaahtech Portal · CPS Digital · v2.4.0
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-secondary opacity-60" />
    </div>
  )
}
