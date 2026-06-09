import type { ChatMessage } from '@/types/chat'
import type { User } from '@/types/auth'
import { GREETING_MESSAGE } from '@/mocks/chatResponses'

export type ChatContext = Record<string, unknown>

export interface SendMessageParams {
  text: string
  user?: User | null
  authToken?: string | null
  context?: ChatContext
}

export interface ChatServiceResult {
  message: ChatMessage
  context?: ChatContext
}

const WHISPER_API_BASE_URL =
  import.meta.env.VITE_WHISPER_API_BASE_URL ??
  import.meta.env.VITE_WHISPER_API_URL ??
  'http://127.0.0.1:8001'

const LLM_API_BASE_URL =
  import.meta.env.VITE_LLM_API_BASE_URL ??
  import.meta.env.VITE_LLM_API_URL ??
  'http://127.0.0.1:8002'

const LLM_CHAT_PATH = import.meta.env.VITE_LLM_CHAT_PATH ?? '/chat/message'
const CONFIGURED_SESSION_ID = import.meta.env.VITE_LLM_SESSION_ID
const SESSION_STORAGE_KEY = 'faaahtech.llm.session_id'

const normalizeBaseUrl = (url: string): string => url.replace(/\/+$/, '')

const buildUrl = (baseUrl: string, path: string): string => {
  const normalizedBase = normalizeBaseUrl(baseUrl)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

const createMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  role,
  content,
  timestamp: new Date().toISOString(),
})

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getOrCreateSessionId = (): string => {
  if (CONFIGURED_SESSION_ID?.trim()) {
    return CONFIGURED_SESSION_ID.trim()
  }

  const existingSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY)
  if (existingSessionId) {
    return existingSessionId
  }

  const newSessionId = `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  window.localStorage.setItem(SESSION_STORAGE_KEY, newSessionId)
  return newSessionId
}

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

const extractTextFromUnknown = (payload: unknown): string | null => {
  if (typeof payload === 'string') {
    return payload.trim() || null
  }

  if (!isRecord(payload)) {
    return null
  }

  const preferredKeys = [
    'response',
    'answer',
    'content',
    'text',
    'output',
    'assistant_response',
    'assistantResponse',
  ]

  for (const key of preferredKeys) {
    const value = payload[key]
    const extracted = extractTextFromUnknown(value)
    if (extracted) {
      return extracted
    }
  }

  const data = payload.data
  const extractedFromData = extractTextFromUnknown(data)
  if (extractedFromData) {
    return extractedFromData
  }

  const message = extractTextFromUnknown(payload.message)
  if (message) {
    return message
  }

  const choices = payload.choices
  if (Array.isArray(choices) && choices.length > 0) {
    return extractTextFromUnknown(choices[0])
  }

  return null
}

const extractContext = (payload: unknown): ChatContext | undefined => {
  if (!isRecord(payload)) {
    return undefined
  }

  const contextCandidates = [
    payload.context,
    payload.additionalProps,
    payload.additional_props,
    isRecord(payload.data) ? payload.data.context : undefined,
    isRecord(payload.data) ? payload.data.additionalProps : undefined,
    isRecord(payload.data) ? payload.data.additional_props : undefined,
  ]

  return contextCandidates.find(isRecord)
}

const extractApiError = (payload: unknown, fallback: string): string => {
  if (isRecord(payload)) {
    const detail = payload.detail
    if (typeof detail === 'string') {
      return detail
    }

    const message = payload.message
    if (typeof message === 'string') {
      return message
    }

    if (Array.isArray(detail) && detail.length > 0) {
      const firstDetail = detail[0]
      if (isRecord(firstDetail) && typeof firstDetail.msg === 'string') {
        return firstDetail.msg
      }
    }
  }

  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  return fallback
}

const extractWhisperText = (payload: unknown): string => {
  const data = isRecord(payload) ? payload.data : undefined

  if (isRecord(data) && typeof data.text === 'string') {
    return data.text.trim()
  }

  const extractedText = extractTextFromUnknown(payload)
  return extractedText ?? ''
}

const getAlunoId = (user?: User | null): number => {
  const parsedId = Number.parseInt(user?.id ?? '', 10)
  return Number.isFinite(parsedId) ? parsedId : 1
}

export const chatService = {
  getGreeting(): ChatMessage {
    return createMessage('assistant', GREETING_MESSAGE)
  },

  createErrorMessage(error: unknown): ChatMessage {
    const message = error instanceof Error ? error.message : 'Não foi possível concluir a solicitação.'
    return createMessage('assistant', `Não consegui processar agora. ${message}`)
  },

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    const formData = new FormData()
    const filename = `audio-${Date.now()}.webm`

    formData.append('audio_file', audioBlob, filename)
    formData.append('language', 'pt')
    formData.append('task', 'transcribe')

    const response = await fetch(buildUrl(WHISPER_API_BASE_URL, '/whisper/send/audio'), {
      method: 'POST',
      body: formData,
    })

    const payload = await parseResponseBody(response)

    if (!response.ok) {
      throw new Error(extractApiError(payload, 'Erro ao transcrever o áudio.'))
    }

    const transcription = extractWhisperText(payload)

    if (!transcription) {
      throw new Error('O Whisper não retornou uma transcrição válida.')
    }

    return transcription
  },

  async sendMessage(params: SendMessageParams): Promise<ChatServiceResult> {
    const text = params.text.trim()

    if (!text) {
      throw new Error('Mensagem vazia.')
    }

    const authToken = params.authToken || 'string'
    const alunoId = getAlunoId(params.user)

    const body = {
      message: text,
      session_id: getOrCreateSessionId(),
      aluno_id: alunoId,
      auth_token: authToken,
      context: params.context ?? {},
    }

    const response = await fetch(buildUrl(LLM_API_BASE_URL, LLM_CHAT_PATH), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    })

    const payload = await parseResponseBody(response)

    if (!response.ok) {
      throw new Error(extractApiError(payload, 'Erro ao consultar a LLM.'))
    }

    const assistantText =
      extractTextFromUnknown(payload) ??
      'Recebi sua solicitação, mas a resposta veio em um formato inesperado.'

    return {
      message: createMessage('assistant', assistantText),
      context: extractContext(payload),
    }
  },
}
