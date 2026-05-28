import { useState, type FormEvent } from 'react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { simulateDelay, formatPhone } from '@/utils/cn'

type CourseValue = '' | 'ads' | 'si' | 'cc' | 'eng' | 'ge' | 'log' | 'mkt'
type Period = '' | 'manha' | 'tarde' | 'noite'

const COURSES = [
  { value: 'ads', label: 'Análise e Desenvolvimento de Sistemas' },
  { value: 'si', label: 'Sistemas de Informação' },
  { value: 'cc', label: 'Ciência da Computação' },
  { value: 'eng', label: 'Engenharia de Software' },
  { value: 'ge', label: 'Gestão Empresarial' },
  { value: 'log', label: 'Logística' },
  { value: 'mkt', label: 'Marketing Digital' },
]

// const PERIODS = [
//   { value: 'manha', label: 'Manhã', icon: 'wb_sunny' },
//   { value: 'tarde', label: 'Tarde', icon: 'wb_cloudy' },
//   { value: 'noite', label: 'Noite', icon: 'nightlight' },
// ]

export function EnrollmentPage() {
  const [step] = useState(1)
  const [curso, setCurso] = useState<CourseValue>('')
  const [periodo, setPeriodo] = useState<Period>('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePhone = (val: string) => setTelefone(formatPhone(val))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await simulateDelay(2000)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <PublicLayout>
        <div className="flex-1 flex items-center justify-center p-4 min-h-screen">
          <div className="text-center max-w-md animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-[#E6F4EA] flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#137333] text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h2 className="font-hanken text-[28px] font-bold text-on-surface mb-3">Cadastro Enviado!</h2>
            <p className="font-inter text-[15px] text-on-surface-variant mb-6">
              Sua solicitação de matrícula foi enviada para a Secretaria Acadêmica. Você receberá um e-mail de confirmação em breve.
            </p>
            <a href="/login">
              <Button variant="primary" size="lg">
                Ir para o Portal
              </Button>
            </a>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      {/* Mobile Top Bar */}
      <header className="bg-surface-container-lowest shadow-sm flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <a href="/login" className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
          <span className="font-hanken text-[20px] font-bold text-primary">Faaahtech Portal</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-primary hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-primary hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-container-max-width mx-auto px-4 md:px-margin-desktop pt-6 pb-32">
        {/* Header */}
        <div className="mb-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined fill text-white text-[16px]">school</span>
            </div>
            <span className="font-inter text-[12px] font-semibold text-primary uppercase tracking-widest">
              Cadastro de Matrícula / Vestibular
            </span>
          </div>
          <h2 className="font-hanken text-[28px] md:text-[36px] font-bold text-on-surface mb-2">
            Inicie sua jornada
          </h2>
          <p className="font-inter text-[15px] text-on-surface-variant">
            Preencha os dados abaixo para iniciar sua jornada acadêmica na Faaahtech.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-8 max-w-2xl">
          <div className="h-1.5 flex-1 bg-primary rounded-full" />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-surface-container-highest'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-surface-container-highest'}`} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
          {/* Course Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-card border border-outline-variant/20 border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">school</span>
              <h3 className="font-inter text-[12px] font-semibold uppercase tracking-widest text-primary">
                Informações do Curso
              </h3>
            </div>

            <div className="space-y-5">
              {/* Course select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="curso" className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant">
                  Curso
                </label>
                <select
                  id="curso"
                  required
                  value={curso}
                  onChange={(e) => setCurso(e.target.value as CourseValue)}
                  className="w-full bg-[#F1F3F5] border-0 border-b-2 border-transparent py-3 px-4 rounded-t-lg font-inter text-[16px] text-on-surface outline-none focus:border-b-primary transition-all"
                >
                  <option value="" disabled>Selecione um curso</option>
                  {COURSES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Period */}
              <div className="flex flex-col gap-2">
                <label className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant">
                  Período
                </label>
                <div className="grid grid-cols-3 gap-3 mt-1">
                  {[
                    { value: 'manha', label: 'Manhã', icon: 'wb_sunny' },
                    { value: 'tarde', label: 'Tarde', icon: 'wb_cloudy' },
                    { value: 'noite', label: 'Noite', icon: 'nightlight' },
                  ].map((p) => (
                    <label key={p.value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="periodo"
                        value={p.value}
                        required
                        checked={periodo === p.value}
                        onChange={() => setPeriodo(p.value as Period)}
                        className="sr-only peer"
                      />
                      <div className="p-3 text-center border border-outline-variant rounded-xl peer-checked:bg-secondary-container peer-checked:border-primary transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant peer-checked:text-primary mb-1 block">
                          {p.icon}
                        </span>
                        <span className="font-inter text-[12px] font-semibold text-on-surface">{p.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Data Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-card border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-inter text-[12px] font-semibold uppercase tracking-widest text-primary">
                Dados Pessoais
              </h3>
            </div>
            <div className="space-y-5">
              <Input
                id="nome"
                label="Nome Completo"
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <Input
                id="email"
                label="E-mail"
                type="email"
                placeholder="seu.nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="telefone"
                label="Telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => handlePhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-card border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <h3 className="font-inter text-[12px] font-semibold uppercase tracking-widest text-primary">
                Endereço de Residência
              </h3>
            </div>
            <Input
              id="endereco"
              label="Endereço"
              type="text"
              placeholder="Rua, Número, Bairro, Cidade — UF"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {[
              { icon: 'verified', title: 'Reconhecimento', desc: 'Cursos avaliados com excelência pelo MEC e CPS.' },
              { icon: 'work', title: 'Empregabilidade', desc: 'Parcerias estratégicas com líderes globais de tecnologia.' },
              { icon: 'rocket_launch', title: 'Inovação', desc: 'Laboratórios de última geração e ensino prático focado.' },
            ].map((card) => (
              <div key={card.title} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 shadow-card text-center">
                <span className="material-symbols-outlined text-primary text-[36px] mb-2 block">{card.icon}</span>
                <h4 className="font-inter text-[12px] font-semibold uppercase tracking-wider text-primary mb-1">{card.title}</h4>
                <p className="font-inter text-[13px] text-on-surface-variant">{card.desc}</p>
              </div>
            ))}
          </div>
        </form>
      </main>

      {/* Sticky bottom action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface-container-lowest shadow-top-bar z-50 border-t border-outline-variant/30">
        <div className="max-w-2xl mx-auto">
          <Button
            type="submit"
            form="enrollmentForm"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full rounded-xl"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(e as unknown as FormEvent)
            }}
            rightIcon={<span className="material-symbols-outlined">chevron_right</span>}
          >
            Finalizar Cadastro
          </Button>
          <p className="text-center mt-3 font-inter text-[12px] text-on-surface-variant">
            Ao finalizar, você concorda com nossos termos de privacidade e uso de dados acadêmicos.
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
