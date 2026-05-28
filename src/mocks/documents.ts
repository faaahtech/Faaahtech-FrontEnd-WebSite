import type { AcademicDocument } from '@/types/document'

export const MOCK_DOCUMENTS: AcademicDocument[] = [
  {
    id: 'doc-001',
    type: 'historico_escolar',
    label: 'Histórico Escolar',
    icon: 'history_edu',
    status: 'analyzing',
    requestedAt: '2024-10-12T10:30:00Z',
    updatedAt: '2024-10-13T08:00:00Z',
    notes: 'Documento em análise pela secretaria. Prazo: 5 dias úteis.',
  },
  {
    id: 'doc-002',
    type: 'atestado_matricula',
    label: 'Atestado de Matrícula',
    icon: 'verified',
    status: 'ready',
    requestedAt: '2024-10-05T14:20:00Z',
    updatedAt: '2024-10-07T16:00:00Z',
    downloadUrl: '#',
  },
  {
    id: 'doc-003',
    type: 'certificado_conclusao',
    label: 'Certificado de Conclusão',
    icon: 'workspace_premium',
    status: 'ready',
    requestedAt: '2024-10-05T09:00:00Z',
    updatedAt: '2024-10-08T11:30:00Z',
    downloadUrl: '#',
  },
  {
    id: 'doc-004',
    type: 'declaracao_frequencia',
    label: 'Declaração de Frequência',
    icon: 'event_available',
    status: 'pending',
    requestedAt: '2024-10-15T11:00:00Z',
    updatedAt: '2024-10-15T11:00:00Z',
    notes: 'Aguardando início do processamento.',
  },
]
