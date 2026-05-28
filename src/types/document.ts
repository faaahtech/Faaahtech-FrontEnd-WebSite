export type DocumentStatus = 'pending' | 'analyzing' | 'ready' | 'rejected'
export type DocumentType =
  | 'historico_escolar'
  | 'atestado_matricula'
  | 'certificado_conclusao'
  | 'declaracao_frequencia'
  | 'diploma'

export interface AcademicDocument {
  id: string
  type: DocumentType
  label: string
  icon: string
  status: DocumentStatus
  requestedAt: string
  updatedAt: string
  downloadUrl?: string
  notes?: string
}

export interface DocumentRequest {
  type: DocumentType
  purpose: string
  urgent: boolean
}
