/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHISPER_API_BASE_URL?: string
  readonly VITE_WHISPER_API_URL?: string
  readonly VITE_LLM_API_BASE_URL?: string
  readonly VITE_LLM_API_URL?: string
  readonly VITE_LLM_CHAT_PATH?: string
  readonly VITE_LLM_SESSION_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
