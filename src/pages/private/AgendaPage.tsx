import { PrivateLayout } from '@/components/layout/PrivateLayout'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { useStudent } from '@/hooks/useStudent'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { cn } from '@/utils/cn'

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // Adjust: week starts on Monday (0=Mon ... 6=Sun)
  const startOffset = (firstDay + 6) % 7
  const days: (number | null)[] = Array(startOffset).fill(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return days
}

const HIGHLIGHTED_DAYS = [15, 20, 22, 28] // exam/event days

export function AgendaPage() {
  const { exams, isLoading } = useStudent()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const calendarDays = buildCalendarDays(year, month)

  const WEEKLY_SCHEDULE = [
    { day: 'Segunda', subjects: [{ name: 'Algoritmos e Programação', time: '19:00–20:40', room: 'Lab 101', code: 'ALG' }, { name: 'Banco de Dados I', time: '20:50–22:30', room: 'Lab 203', code: 'BD1' }] },
    { day: 'Terça', subjects: [{ name: 'Engenharia de Software', time: '19:00–20:40', room: 'Sala 302', code: 'ENG' }, { name: 'Design de Interfaces', time: '20:50–22:30', room: 'Lab 105', code: 'DSG' }] },
    { day: 'Quarta', subjects: [{ name: 'Matemática Discreta', time: '19:00–20:40', room: 'Sala 201', code: 'MAT' }] },
    { day: 'Quinta', subjects: [{ name: 'Sistemas Operacionais', time: '19:00–20:40', room: 'Sala 304', code: 'SO' }, { name: 'Banco de Dados I', time: '20:50–22:30', room: 'Lab 203', code: 'BD1' }] },
    { day: 'Sexta', subjects: [{ name: 'Algoritmos e Programação', time: '19:00–20:40', room: 'Lab 101', code: 'ALG' }] },
  ]

  const SUBJECT_COLORS: Record<string, string> = {
    ALG: 'bg-primary/10 border-primary/30 text-primary',
    BD1: 'bg-secondary-container border-secondary/30 text-on-secondary-container',
    ENG: 'bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32]',
    DSG: 'bg-[#FFF3E0] border-[#FFCC80] text-[#E65100]',
    MAT: 'bg-[#F3E5F5] border-[#CE93D8] text-[#6A1B9A]',
    SO: 'bg-error-container border-error/30 text-on-error-container',
  }

  return (
    <PrivateLayout title="Agenda">
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div>
          <h2 className="font-hanken text-[24px] font-bold text-on-surface mb-1">Agenda Acadêmica</h2>
          <p className="font-inter text-[14px] text-on-surface-variant">
            Grade de aulas e próximas avaliações do semestre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Calendar */}
          <div className="md:col-span-5">
            <Card>
              <CardHeader
                icon="calendar_month"
                title={`${MONTHS[month]} ${year}`}
                action={
                  <div className="flex gap-1">
                    <button className="p-1 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="p-1 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                }
              />
              <CardBody>
                {/* Weekday headers */}
                <div className="grid grid-cols-7 mb-2">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="text-center font-inter text-[11px] font-semibold text-on-surface-variant py-1">
                      {d}
                    </div>
                  ))}
                </div>
                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => {
                    const isToday = day === today
                    const isHighlighted = day !== null && HIGHLIGHTED_DAYS.includes(day)
                    return (
                      <button
                        key={i}
                        disabled={day === null}
                        className={cn(
                          'aspect-square flex items-center justify-center rounded-xl text-[13px] font-inter transition-all',
                          day === null && 'invisible',
                          isToday && 'bg-primary text-on-primary font-bold shadow-primary-glow',
                          !isToday && isHighlighted && 'bg-secondary-container text-on-secondary-container font-semibold',
                          !isToday && !isHighlighted && day !== null && 'hover:bg-surface-container-high text-on-surface',
                        )}
                      >
                        {day}
                        {isHighlighted && !isToday && (
                          <span className="sr-only">evento</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-inter text-[11px] text-on-surface-variant">Hoje</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-secondary-container" />
                    <span className="font-inter text-[11px] text-on-surface-variant">Eventos</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Upcoming exams */}
            <Card className="mt-6">
              <CardHeader icon="assignment" title="Próximas Avaliações" />
              <CardBody className="flex flex-col gap-3">
                {isLoading ? (
                  <SkeletonCard className="shadow-none border-0 p-0" />
                ) : exams.length === 0 ? (
                  <p className="font-inter text-[13px] text-on-surface-variant text-center py-4">
                    Nenhuma avaliação agendada.
                  </p>
                ) : (
                  exams.map((exam) => {
                    const d = new Date(exam.date)
                    const isPast = d < now
                    return (
                      <div
                        key={exam.id}
                        className={cn(
                          'flex items-center gap-4 p-3 rounded-xl border transition-colors',
                          isPast
                            ? 'border-outline-variant/30 bg-surface-container opacity-60'
                            : 'border-outline-variant/40 bg-surface-container-low hover:border-primary/30',
                        )}
                      >
                        <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-xl p-2.5 min-w-[48px] border border-outline-variant/30">
                          <span className="font-inter text-[10px] font-bold text-primary uppercase">
                            {d.toLocaleString('pt-BR', { month: 'short' })}
                          </span>
                          <span className="font-hanken text-[20px] font-bold text-on-surface leading-tight">
                            {d.getDate()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-inter text-[13px] font-semibold text-on-surface truncate">
                            {exam.subject}
                          </p>
                          <p className="font-inter text-[12px] text-on-surface-variant">
                            {exam.room} · {exam.time}
                          </p>
                        </div>
                        <span className="font-inter text-[11px] font-bold px-2 py-1 bg-primary-container/20 text-primary rounded-lg">
                          {exam.type}
                        </span>
                      </div>
                    )
                  })
                )}
              </CardBody>
            </Card>
          </div>

          {/* Weekly schedule */}
          <div className="md:col-span-7">
            <Card className="h-full">
              <CardHeader icon="schedule" title="Grade Semanal — Noturno" />
              <CardBody className="flex flex-col gap-4">
                {WEEKLY_SCHEDULE.map((daySchedule) => (
                  <div key={daySchedule.day}>
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
                      {daySchedule.day}
                    </p>
                    <div className="flex flex-col gap-2">
                      {daySchedule.subjects.map((subj) => (
                        <div
                          key={subj.name}
                          className={cn(
                            'flex items-center gap-4 p-3 rounded-xl border transition-all hover:-translate-y-0.5 cursor-default',
                            SUBJECT_COLORS[subj.code] ?? 'bg-surface-container border-outline-variant/30 text-on-surface',
                          )}
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center shrink-0">
                            <span className="font-inter text-[11px] font-bold">{subj.code}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-inter text-[13px] font-semibold truncate">{subj.name}</p>
                            <p className="font-inter text-[11px] opacity-80">{subj.room}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-inter text-[12px] font-semibold opacity-90">{subj.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Empty Sat/Sun */}
                <div className="mt-2 p-4 rounded-xl bg-surface-container/50 border border-dashed border-outline-variant/50 text-center">
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-[28px] mb-1 block">weekend</span>
                  <p className="font-inter text-[12px] text-on-surface-variant/60">Sem aulas nos finais de semana</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}
