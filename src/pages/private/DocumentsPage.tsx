import { useState } from 'react'
import { PrivateLayout } from '@/components/layout/PrivateLayout'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { useDocuments } from '@/hooks/useDocuments'
import { formatDate, documentStatusLabel, documentStatusColors, cn } from '@/utils/cn'
import type { DocumentType } from '@/types/document'

const DOCUMENT_TYPES: { value: DocumentType; label: string; icon: string; desc: string }[] = [
  { value: 'historico_escolar', label: 'Histórico Escolar', icon: 'history_edu', desc: 'Registro completo das disciplinas cursadas' },
  { value: 'atestado_matricula', label: 'Atestado de Matrícula', icon: 'verified', desc: 'Comprovante de vínculo com a instituição' },
  { value: 'declaracao_frequencia', label: 'Declaração de Frequência', icon: 'event_available', desc: 'Declaração de presença no semestre atual' },
  { value: 'certificado_conclusao', label: 'Certificado de Conclusão', icon: 'workspace_premium', desc: 'Certificado de conclusão de curso' },
  { value: 'diploma', label: 'Diploma', icon: 'school', desc: 'Diploma digital reconhecido pelo MEC' },
]

type FilterStatus = 'all' | 'pending' | 'analyzing' | 'ready' | 'rejected'

export function DocumentsPage() {
  const { documents, isLoading, isRequesting, requestDocument, cancelDocument } = useDocuments()
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedType, setSelectedType] = useState<DocumentType | ''>('')
  const [purpose, setPurpose] = useState('')
  const [urgent, setUrgent] = useState(false)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [successMsg, setSuccessMsg] = useState('')

  const filtered = filter === 'all' ? documents : documents.filter((d) => d.status === filter)

  const handleRequest = async () => {
    if (!selectedType) return
    const doc = await requestDocument({ type: selectedType as DocumentType, purpose, urgent })
    if (doc) {
      setShowRequestModal(false)
      setSelectedType('')
      setPurpose('')
      setUrgent(false)
      setSuccessMsg(`${doc.label} solicitado com sucesso! Prazo: ${urgent ? '2' : '5'} dias úteis.`)
      setTimeout(() => setSuccessMsg(''), 5000)
    }
  }

  const FILTER_TABS: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: 'Pendente' },
    { value: 'analyzing', label: 'Em Análise' },
    { value: 'ready', label: 'Prontos' },
    { value: 'rejected', label: 'Recusados' },
  ]

  return (
    <PrivateLayout title="Documentos">
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-hanken text-[24px] font-bold text-on-surface mb-1">Documentos Acadêmicos</h2>
            <p className="font-inter text-[14px] text-on-surface-variant">
              Solicite, acompanhe e baixe seus documentos oficiais.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowRequestModal(true)}
            leftIcon={<span className="material-symbols-outlined text-[18px]">add</span>}
          >
            Nova Solicitação
          </Button>
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="p-4 bg-[#E6F4EA] border border-[#B7DFC0] rounded-xl flex items-center gap-3 animate-fade-in">
            <span className="material-symbols-outlined text-[#137333]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <p className="font-inter text-[14px] text-[#137333] font-medium">{successMsg}</p>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: documents.length, icon: 'folder', color: 'text-secondary' },
            { label: 'Em Análise', value: documents.filter(d => d.status === 'analyzing').length, icon: 'pending', color: 'text-primary' },
            { label: 'Prontos', value: documents.filter(d => d.status === 'ready').length, icon: 'check_circle', color: 'text-[#137333]' },
            { label: 'Pendentes', value: documents.filter(d => d.status === 'pending').length, icon: 'schedule', color: 'text-[#856404]' },
          ].map((s) => (
            <div key={s.label} className="bg-surface-container-lowest rounded-xl p-4 shadow-card border border-outline-variant/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              </div>
              <div>
                <p className={`font-hanken text-[22px] font-bold ${s.color}`}>{s.value}</p>
                <p className="font-inter text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full font-inter text-[12px] font-semibold transition-all',
                filter === tab.value
                  ? 'bg-primary text-on-primary shadow-primary-glow'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Documents list */}
        <Card>
          <CardHeader icon="description" title={`${filtered.length} documento${filtered.length !== 1 ? 's' : ''}`} />
          <CardBody className="flex flex-col gap-3">
            {isLoading ? (
              <>
                <SkeletonCard className="shadow-none border-0 p-3" />
                <SkeletonCard className="shadow-none border-0 p-3" />
                <SkeletonCard className="shadow-none border-0 p-3" />
              </>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-on-surface-variant/40 text-[48px] mb-3 block">folder_open</span>
                <p className="font-inter text-[15px] text-on-surface-variant mb-1">Nenhum documento encontrado</p>
                <p className="font-inter text-[13px] text-on-surface-variant/60">
                  {filter !== 'all' ? 'Tente outro filtro.' : 'Clique em "Nova Solicitação" para começar.'}
                </p>
              </div>
            ) : (
              filtered.map((doc) => {
                const { bg, text } = documentStatusColors(doc.status)
                return (
                  <div
                    key={doc.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 hover:border-primary/30 transition-all gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-secondary-container text-[22px]">
                          {doc.icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-inter text-[15px] font-semibold text-on-surface">{doc.label}</p>
                        <p className="font-inter text-[12px] text-on-surface-variant">
                          Solicitado em {formatDate(doc.requestedAt)} · Atualizado em {formatDate(doc.updatedAt)}
                        </p>
                        {doc.notes && (
                          <p className="font-inter text-[12px] text-on-surface-variant/80 mt-1 italic">{doc.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-16 md:ml-0">
                      <span className={cn('inline-flex items-center gap-1 px-3 py-1 rounded-full font-inter text-[11px] font-bold uppercase tracking-wide', bg, text)}>
                        {doc.status === 'ready' && (
                          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        )}
                        {doc.status === 'analyzing' && (
                          <span className="material-symbols-outlined text-[13px] animate-spin-slow">sync</span>
                        )}
                        {documentStatusLabel(doc.status)}
                      </span>

                      {doc.status === 'ready' && (
                        <Button variant="secondary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">download</span>}>
                          Baixar
                        </Button>
                      )}

                      {(doc.status === 'pending') && (
                        <button
                          onClick={() => cancelDocument(doc.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-lg hover:bg-error-container"
                          title="Cancelar solicitação"
                        >
                          <span className="material-symbols-outlined text-[20px]">cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </CardBody>
        </Card>

        {/* Info box */}
        <div className="p-4 bg-secondary-container/30 border border-secondary-fixed-dim rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary mt-0.5">info</span>
          <div>
            <p className="font-inter text-[13px] font-semibold text-on-surface mb-1">Prazo de emissão</p>
            <p className="font-inter text-[13px] text-on-surface-variant">
              Documentos padrão: até <strong>5 dias úteis</strong>. Urgente: até <strong>2 dias úteis</strong>.
              Para retirada presencial ou envio por e-mail, entre em contato com a secretaria.
            </p>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-outline-variant/30 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="font-hanken text-[20px] font-bold text-on-surface">Nova Solicitação</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Document type */}
              <div>
                <label className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-3">
                  Tipo de Documento *
                </label>
                <div className="flex flex-col gap-2">
                  {DOCUMENT_TYPES.map((dt) => (
                    <label
                      key={dt.value}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all',
                        selectedType === dt.value
                          ? 'border-primary bg-primary-container/10'
                          : 'border-outline-variant/40 hover:border-primary/30 hover:bg-surface-container-low',
                      )}
                    >
                      <input
                        type="radio"
                        name="docType"
                        value={dt.value}
                        checked={selectedType === dt.value}
                        onChange={() => setSelectedType(dt.value)}
                        className="sr-only"
                      />
                      <span className="material-symbols-outlined text-primary text-[22px]">{dt.icon}</span>
                      <div>
                        <p className="font-inter text-[14px] font-semibold text-on-surface">{dt.label}</p>
                        <p className="font-inter text-[12px] text-on-surface-variant">{dt.desc}</p>
                      </div>
                      {selectedType === dt.value && (
                        <span className="material-symbols-outlined text-primary ml-auto" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="font-inter text-[12px] font-semibold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Finalidade (opcional)
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Ex: Processo seletivo de estágio, solicitação bancária..."
                  rows={3}
                  className="w-full bg-[#F1F3F5] border-0 border-b-2 border-transparent focus:border-b-primary rounded-t-lg px-4 py-3 font-inter text-[14px] text-on-surface outline-none resize-none transition-all placeholder:text-on-surface-variant/60"
                />
              </div>

              {/* Urgent toggle */}
              <label className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/40 cursor-pointer hover:border-primary/30 transition-all">
                <div className={cn(
                  'w-12 h-6 rounded-full transition-colors relative',
                  urgent ? 'bg-primary' : 'bg-surface-container-highest',
                )}>
                  <div className={cn(
                    'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm',
                    urgent ? 'left-6' : 'left-0.5',
                  )} />
                </div>
                <div>
                  <p className="font-inter text-[14px] font-semibold text-on-surface">Urgente</p>
                  <p className="font-inter text-[12px] text-on-surface-variant">Prazo de 2 dias úteis (sujeito à disponibilidade)</p>
                </div>
                <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="sr-only" />
              </label>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <Button variant="secondary" size="md" className="flex-1" onClick={() => setShowRequestModal(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                isLoading={isRequesting}
                disabled={!selectedType}
                onClick={handleRequest}
                rightIcon={<span className="material-symbols-outlined text-[18px]">send</span>}
              >
                Solicitar
              </Button>
            </div>
          </div>
        </div>
      )}
    </PrivateLayout>
  )
}
