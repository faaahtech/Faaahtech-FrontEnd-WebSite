import { useState } from 'react'
import { PrivateLayout } from '@/components/layout/PrivateLayout'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/utils/cn'

export function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const TABS = [
    { value: 'profile', label: 'Perfil', icon: 'person' },
    { value: 'security', label: 'Segurança', icon: 'lock' },
    { value: 'notifications', label: 'Notificações', icon: 'notifications' },
  ] as const

  return (
    <PrivateLayout title="Configurações">
      <div className="flex flex-col gap-6 animate-fade-in max-w-3xl">
        <div>
          <h2 className="font-hanken text-[24px] font-bold text-on-surface mb-1">Configurações</h2>
          <p className="font-inter text-[14px] text-on-surface-variant">
            Gerencie suas informações e preferências.
          </p>
        </div>

        {/* Profile banner */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card border border-outline-variant/30 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-[22px] font-bold font-hanken shrink-0">
            {user ? getInitials(user.name) : 'U'}
          </div>
          <div>
            <h3 className="font-hanken text-[20px] font-bold text-on-surface">{user?.name}</h3>
            <p className="font-inter text-[13px] text-on-surface-variant">
              {user?.course} · {user?.ra}
            </p>
            <p className="font-inter text-[13px] text-on-surface-variant">{user?.email}</p>
          </div>
          <button className="ml-auto p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">photo_camera</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-container-high p-1 rounded-xl">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-inter text-[13px] font-semibold transition-all ${
                activeTab === tab.value
                  ? 'bg-surface-container-lowest shadow-card text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader icon="person" title="Informações Pessoais" />
            <CardBody className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Nome Completo" type="text" defaultValue={user?.name} />
                <Input label="E-mail Institucional" type="email" defaultValue={user?.email} />
                <Input label="Registro do Aluno (RA)" type="text" defaultValue={user?.ra} disabled />
                <Input label="Telefone" type="tel" placeholder="(00) 00000-0000" />
              </div>

              <div>
                <label className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Curso
                </label>
                <div className="w-full bg-[#F1F3F5] border-0 border-b-2 border-transparent rounded-t-lg px-4 py-3 font-inter text-[15px] text-on-surface-variant cursor-not-allowed">
                  {user?.course}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-2">
                    Período
                  </label>
                  <div className="w-full bg-[#F1F3F5] border-0 border-b-2 border-transparent rounded-t-lg px-4 py-3 font-inter text-[15px] text-on-surface-variant cursor-not-allowed capitalize">
                    {user?.period ?? '—'}
                  </div>
                </div>
                <div>
                  <label className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-2">
                    Semestre
                  </label>
                  <div className="w-full bg-[#F1F3F5] border-0 border-b-2 border-transparent rounded-t-lg px-4 py-3 font-inter text-[15px] text-on-surface-variant cursor-not-allowed">
                    {user?.semester}º Semestre
                  </div>
                </div>
              </div>

              {saved && (
                <div className="p-3 bg-[#E6F4EA] border border-[#B7DFC0] rounded-xl flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-[#137333] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <p className="font-inter text-[13px] text-[#137333] font-medium">Informações salvas com sucesso!</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="primary" size="md" onClick={handleSave}>
                  Salvar Alterações
                </Button>
                <Button variant="secondary" size="md">
                  Cancelar
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Security tab */}
        {activeTab === 'security' && (
          <Card>
            <CardHeader icon="lock" title="Segurança e Acesso" />
            <CardBody className="flex flex-col gap-5">
              <Input label="Senha Atual" type="password" placeholder="••••••••" />
              <Input label="Nova Senha" type="password" placeholder="••••••••" />
              <Input label="Confirmar Nova Senha" type="password" placeholder="••••••••" />

              <div className="p-4 bg-secondary-container/30 border border-secondary-fixed-dim rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-0.5">info</span>
                <p className="font-inter text-[13px] text-on-surface-variant">
                  A senha deve ter no mínimo <strong>8 caracteres</strong>, incluindo letras maiúsculas, minúsculas e números.
                </p>
              </div>

              <Button variant="primary" size="md" className="w-fit">
                Alterar Senha
              </Button>

              <div className="pt-4 border-t border-outline-variant/30">
                <h4 className="font-inter text-[14px] font-semibold text-on-surface mb-3">Sessões Ativas</h4>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">computer</span>
                  <div className="flex-1">
                    <p className="font-inter text-[13px] font-semibold text-on-surface">Este dispositivo</p>
                    <p className="font-inter text-[12px] text-on-surface-variant">Sessão atual · Faaahtech Portal</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Notifications tab */}
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader icon="notifications" title="Preferências de Notificação" />
            <CardBody className="flex flex-col gap-4">
              {[
                { label: 'Documentos prontos para download', desc: 'Receba aviso quando seus documentos estiverem disponíveis', default: true },
                { label: 'Datas de provas e avaliações', desc: 'Lembretes 48h antes de cada avaliação', default: true },
                { label: 'Pendências financeiras', desc: 'Alertas de boletos e vencimentos', default: true },
                { label: 'Comunicados da secretaria', desc: 'Avisos gerais sobre a instituição', default: false },
                { label: 'Novidades do portal', desc: 'Atualizações e novas funcionalidades', default: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/40 bg-surface-container-low hover:border-primary/20 transition-colors">
                  <div>
                    <p className="font-inter text-[14px] font-semibold text-on-surface">{item.label}</p>
                    <p className="font-inter text-[12px] text-on-surface-variant">{item.desc}</p>
                  </div>
                  <label className="relative cursor-pointer ml-4">
                    <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:bg-primary transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all peer-checked:translate-x-5" />
                  </label>
                </div>
              ))}

              <Button variant="primary" size="md" className="w-fit mt-2" onClick={handleSave}>
                Salvar Preferências
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    </PrivateLayout>
  )
}
