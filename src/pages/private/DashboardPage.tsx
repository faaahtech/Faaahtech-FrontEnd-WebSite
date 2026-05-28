import { useNavigate } from 'react-router-dom'
import { PrivateLayout } from '@/components/layout/PrivateLayout'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { useDocuments } from '@/hooks/useDocuments'
import { useStudent } from '@/hooks/useStudent'
import { formatDate, documentStatusLabel, documentStatusColors } from '@/utils/cn'

export function DashboardPage() {
  const { user } = useAuth()
  const { documents, isLoading: docsLoading } = useDocuments()
  const { grades, exams, stats, isLoading: studentLoading } = useStudent()
  const navigate = useNavigate()

  const firstName = user?.name.split(' ')[0] ?? 'Aluno'
  const pendingDocs = documents.filter((d) => d.status === 'pending' || d.status === 'analyzing')
  const readyDocs = documents.filter((d) => d.status === 'ready')

  return (
    <PrivateLayout title="Dashboard">
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Welcome Banner */}
        <section className="relative bg-surface-container-lowest rounded-xl p-6 shadow-card border border-outline-variant/30 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative z-10">
            <p className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant mb-1">
              Bem-vindo de volta
            </p>
            <h3 className="font-hanken text-[24px] md:text-[28px] font-bold text-on-background mb-2">
              Olá, {firstName} 👋
            </h3>
            <p className="font-inter text-[14px] text-on-surface-variant">
              {stats?.pendingItems ? (
                <>
                  Você tem{' '}
                  <span className="font-semibold text-primary">{stats.pendingItems} pendência{stats.pendingItems > 1 ? 's' : ''}</span>{' '}
                  hoje.
                </>
              ) : (
                'Tudo em dia! Continue assim. 🎓'
              )}
            </p>
          </div>
          <div className="flex gap-3 z-10">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/secretaria')}
              leftIcon={<span className="material-symbols-outlined text-[18px]">forum</span>}
            >
              Falar com a IA
            </Button>
            <Button
              variant="secondary"
              size="md"
              leftIcon={<span className="material-symbols-outlined text-[18px]">add</span>}
            >
              Nova Solicitação
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-secondary-container/20 rounded-full blur-xl pointer-events-none" />
        </section>

        {/* Stats row */}
        {!studentLoading && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Média Geral', value: stats.gpa.toFixed(1), icon: 'grade', color: 'text-primary' },
              { label: 'Presença', value: `${stats.attendance}%`, icon: 'event_available', color: 'text-[#137333]' },
              { label: 'Créditos', value: `${stats.completedCredits}/${stats.totalCredits}`, icon: 'workspace_premium', color: 'text-secondary' },
              { label: 'Pendências', value: String(stats.pendingItems), icon: 'pending_actions', color: stats.pendingItems > 0 ? 'text-error' : 'text-[#137333]' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container-lowest rounded-xl p-4 shadow-card border border-outline-variant/20 text-center">
                <span className={`material-symbols-outlined text-[28px] mb-1 ${stat.color}`}>{stat.icon}</span>
                <p className={`font-hanken text-[22px] font-bold ${stat.color}`}>{stat.value}</p>
                <p className="font-inter text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Documents (8 cols) */}
          <section className="md:col-span-8">
            <Card>
              <CardHeader
                icon="description"
                title="Documentos Solicitados"
                action={
                  <button className="font-inter text-[12px] text-primary font-semibold hover:underline">
                    Ver todos
                  </button>
                }
              />
              <CardBody className="flex flex-col gap-3">
                {docsLoading ? (
                  <>
                    <SkeletonCard className="shadow-none border-0 p-3" />
                    <SkeletonCard className="shadow-none border-0 p-3" />
                  </>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[40px] mb-2 block">folder_open</span>
                    <p className="font-inter text-[14px]">Nenhum documento solicitado ainda.</p>
                  </div>
                ) : (
                  documents.slice(0, 4).map((doc) => {
                    const { bg, text } = documentStatusColors(doc.status)
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-on-secondary-container text-[20px]">
                              {doc.icon}
                            </span>
                          </div>
                          <div>
                            <p className="font-inter text-[14px] font-semibold text-on-surface">{doc.label}</p>
                            <p className="font-inter text-[12px] text-on-surface-variant">
                              Solicitado em {formatDate(doc.requestedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${bg} ${text}`}>
                            {doc.status === 'ready' && (
                              <span className="material-symbols-outlined text-[12px]">check_circle</span>
                            )}
                            {documentStatusLabel(doc.status)}
                          </Badge>
                          {doc.status === 'ready' ? (
                            <button className="text-on-surface-variant hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[20px]">download</span>
                            </button>
                          ) : (
                            <button className="text-on-surface-variant hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </CardBody>
            </Card>
          </section>

          {/* Right column (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Pending alert */}
            {pendingDocs.length > 0 && (
              <div className="bg-primary text-on-primary rounded-xl p-6 shadow-primary-glow relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                    <Badge className="bg-white/20 text-white border-0" size="sm">Atenção</Badge>
                  </div>
                  <p className="font-hanken text-[24px] font-bold mb-1">{pendingDocs.length} Em Análise</p>
                  <p className="font-inter text-[13px] text-primary-fixed-dim mb-4">
                    Documentos em processamento pela secretaria
                  </p>
                  <button className="bg-white text-primary font-inter text-[12px] font-semibold py-2 px-4 rounded-full hover:bg-surface-container-low transition-colors">
                    Acompanhar
                  </button>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              </div>
            )}

            {/* Ready docs */}
            {readyDocs.length > 0 && (
              <div className="bg-[#E6F4EA] rounded-xl p-5 border border-[#B7DFC0]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#137333] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <h4 className="font-inter text-[12px] font-semibold uppercase tracking-wider text-[#137333]">
                    {readyDocs.length} Pronto{readyDocs.length > 1 ? 's' : ''} para Download
                  </h4>
                </div>
                {readyDocs.slice(0, 2).map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b border-[#B7DFC0] last:border-0">
                    <p className="font-inter text-[13px] text-[#137333] font-medium">{d.label}</p>
                    <button className="text-[#137333] hover:text-[#0a5c28] transition-colors">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Next exam */}
            {!studentLoading && exams.length > 0 && (
              <Card>
                <CardHeader icon="event" title="Próxima Prova" />
                <CardBody>
                  {exams.slice(0, 1).map((exam) => {
                    const d = new Date(exam.date)
                    return (
                      <div key={exam.id} className="flex items-start gap-4">
                        <div className="flex flex-col items-center justify-center bg-surface-container-low rounded-xl p-3 min-w-[52px] border border-outline-variant/40">
                          <span className="font-inter text-[11px] font-bold text-primary uppercase">
                            {d.toLocaleString('pt-BR', { month: 'short' })}
                          </span>
                          <span className="font-hanken text-[22px] font-bold text-on-surface">{d.getDate()}</span>
                        </div>
                        <div>
                          <p className="font-inter text-[14px] font-semibold text-on-surface mb-1">{exam.subject}</p>
                          <p className="font-inter text-[12px] text-on-surface-variant">
                            {exam.room} · {exam.time}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </CardBody>
              </Card>
            )}
          </div>
        </div>

        {/* Grades + Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grades */}
          <Card>
            <CardHeader icon="bar_chart" title="Minhas Notas" />
            <CardBody className="space-y-4">
              {studentLoading ? (
                <SkeletonCard className="shadow-none border-0 p-0" />
              ) : (
                grades.map((g) => (
                  <div key={g.subjectCode}>
                    <div className="flex justify-between items-center text-[13px] font-semibold mb-1.5">
                      <span className="text-on-surface">{g.subject}</span>
                      <span className={g.grade >= 7 ? 'text-primary' : 'text-secondary'}>{g.grade.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${g.grade >= 7 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: `${(g.grade / g.maxGrade) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
              <Button variant="secondary" size="sm" className="w-full mt-2">
                Ver Boletim Completo
              </Button>
            </CardBody>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader icon="account_tree" title="Fluxos do Aluno" />
            <CardBody>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button className="bg-secondary-container p-4 rounded-xl flex flex-col items-start gap-2 hover:brightness-95 transition-all active:scale-95 text-left">
                  <span className="material-symbols-outlined text-on-secondary-container text-[26px]">payments</span>
                  <p className="font-inter text-[12px] font-semibold text-on-secondary-container">Financeiro e Boletos</p>
                </button>
                <button
                  onClick={() => navigate('/cadastro')}
                  className="bg-primary p-4 rounded-xl flex flex-col items-start gap-2 hover:bg-[#6a000e] transition-all active:scale-95 text-left"
                >
                  <span className="material-symbols-outlined text-on-primary text-[26px]">how_to_reg</span>
                  <p className="font-inter text-[12px] font-semibold text-on-primary">Rematrícula 2024.2</p>
                </button>
              </div>
              <button className="w-full bg-surface-container-low rounded-xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors border border-outline-variant/40">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">menu_book</span>
                  <span className="font-inter text-[13px] font-semibold text-on-surface">Biblioteca Virtual</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_forward_ios</span>
              </button>
            </CardBody>
          </Card>
        </div>
      </div>
    </PrivateLayout>
  )
}
