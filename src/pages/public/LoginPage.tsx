import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    clearError()
    await login({ identifier, password })
    if (!error) navigate(from, { replace: true })
  }

  return (
    <PublicLayout>
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-margin-desktop min-h-screen">
        <main className="w-full max-w-[420px] flex flex-col items-center animate-fade-in">
          {/* Header / Logos */}
          <header className="w-full flex flex-col items-center mb-8">
            <div className="flex items-center gap-5 mb-6">
              {/* CPS Logo placeholder */}
              <div className="h-14 w-14 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/30 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-primary mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined fill text-white text-[18px]">account_balance</span>
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-outline-variant" />

              {/* Faaahtech Logo */}
              <div className="h-14 w-14 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined fill text-primary text-[28px]">school</span>
              </div>
            </div>

            <h1 className="font-hanken text-[28px] font-bold text-primary text-center leading-tight">
              Secretária Digital
            </h1>
            <p className="font-inter text-[14px] text-on-surface-variant text-center mt-1">
              Centro Paula Souza — Faaahtech
            </p>
          </header>

          {/* Demo credentials hint */}
          <div className="w-full mb-4 p-3 bg-secondary-container/40 border border-secondary-fixed-dim rounded-xl">
            <p className="font-inter text-[12px] text-on-secondary-container text-center">
              <span className="font-semibold">Demo:</span> RA <code className="bg-secondary-fixed px-1 rounded">2024001234</code> · Senha <code className="bg-secondary-fixed px-1 rounded">123456</code>
            </p>
          </div>

          {/* Form Card */}
          <section className="w-full bg-surface-container-lowest shadow-card rounded-xl p-8 border border-outline-variant/30">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Error message */}
              {error && (
                <div className="p-3 bg-error-container rounded-xl flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-on-error-container text-[18px]">error</span>
                  <p className="font-inter text-[13px] text-on-error-container">{error}</p>
                </div>
              )}

              <Input
                id="identifier"
                label="Matrícula / CPF / E-mail"
                type="text"
                placeholder="Digite seu acesso"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                leftIcon={<span className="material-symbols-outlined text-[20px]">person</span>}
                required
                autoComplete="username"
              />

              <Input
                id="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<span className="material-symbols-outlined text-[20px]">lock</span>}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                }
                required
                autoComplete="current-password"
              />

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary accent-primary"
                  />
                  <span className="font-inter text-[13px] text-on-surface-variant">Lembrar de mim</span>
                </label>
                <a href="#" className="font-inter text-[13px] text-primary font-semibold hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full mt-2 rounded-xl"
                rightIcon={<span className="material-symbols-outlined text-[18px]">login</span>}
              >
                ACESSAR PORTAL
              </Button>
            </form>
          </section>

          {/* Footer actions */}
          <footer className="mt-6 flex flex-col items-center gap-4">
            <p className="font-inter text-[13px] text-on-surface-variant">
              Não possui acesso?{' '}
              <a href="/cadastro" className="text-primary font-bold hover:underline">
                Solicitar Matrícula
              </a>
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-secondary text-[18px]">help_outline</span>
                <span className="font-inter text-[12px] text-secondary font-semibold">Suporte</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-secondary text-[18px]">language</span>
                <span className="font-inter text-[12px] text-secondary font-semibold">PT-BR</span>
              </button>
            </div>
            <p className="font-inter text-[11px] text-on-surface-variant/40 mt-2">
              v2.4.0 · CPS Digital · Faaahtech Portal
            </p>
          </footer>
        </main>
      </div>
    </PublicLayout>
  )
}
