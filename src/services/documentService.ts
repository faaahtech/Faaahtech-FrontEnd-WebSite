import type { AcademicDocument, DocumentRequest, DocumentType } from '@/types/document'
import { MOCK_DOCUMENTS } from '@/mocks/documents'
import { simulateDelay } from '@/utils/cn'

// In-memory store for runtime additions
let documentStore: AcademicDocument[] = [...MOCK_DOCUMENTS]

const DOCUMENT_LABELS: Record<DocumentType, string> = {
  historico_escolar: 'Histórico Escolar',
  atestado_matricula: 'Atestado de Matrícula',
  certificado_conclusao: 'Certificado de Conclusão',
  declaracao_frequencia: 'Declaração de Frequência',
  diploma: 'Diploma',
}

const DOCUMENT_ICONS: Record<DocumentType, string> = {
  historico_escolar: 'history_edu',
  atestado_matricula: 'verified',
  certificado_conclusao: 'workspace_premium',
  declaracao_frequencia: 'event_available',
  diploma: 'school',
}

export const documentService = {
  async getAll(): Promise<AcademicDocument[]> {
    await simulateDelay(800)
    return [...documentStore]
  },

  async getById(id: string): Promise<AcademicDocument | undefined> {
    await simulateDelay(400)
    return documentStore.find((d) => d.id === id)
  },

  async request(req: DocumentRequest): Promise<AcademicDocument> {
    await simulateDelay(1200)

    const newDoc: AcademicDocument = {
      id: `doc-${Date.now()}`,
      type: req.type,
      label: DOCUMENT_LABELS[req.type],
      icon: DOCUMENT_ICONS[req.type],
      status: 'pending',
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: req.urgent ? 'Solicitação urgente — prazo reduzido para 2 dias úteis.' : undefined,
    }

    documentStore = [newDoc, ...documentStore]
    return newDoc
  },

  async cancel(id: string): Promise<void> {
    await simulateDelay(600)
    documentStore = documentStore.filter((d) => d.id !== id)
  },
}
