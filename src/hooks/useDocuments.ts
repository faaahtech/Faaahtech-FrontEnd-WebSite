import { useState, useEffect, useCallback } from 'react'
import type { AcademicDocument, DocumentRequest } from '@/types/document'
import { documentService } from '@/services/documentService'

export function useDocuments() {
  const [documents, setDocuments] = useState<AcademicDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState(false)

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const docs = await documentService.getAll()
      setDocuments(docs)
    } catch {
      setError('Erro ao carregar documentos.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const requestDocument = async (req: DocumentRequest): Promise<AcademicDocument | null> => {
    setIsRequesting(true)
    try {
      const doc = await documentService.request(req)
      setDocuments((prev) => [doc, ...prev])
      return doc
    } catch {
      setError('Erro ao solicitar documento.')
      return null
    } finally {
      setIsRequesting(false)
    }
  }

  const cancelDocument = async (id: string): Promise<void> => {
    try {
      await documentService.cancel(id)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
    } catch {
      setError('Erro ao cancelar solicitação.')
    }
  }

  return {
    documents,
    isLoading,
    error,
    isRequesting,
    requestDocument,
    cancelDocument,
    refetch: fetchDocuments,
  }
}
