import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { ChatMessage } from '@/types/chat'
import type { User } from '@/types/auth'
import { chatService, type ChatContext } from '@/services/chatService'

interface UseChatOptions {
  user?: User | null
  authToken?: string | null
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [input, setInput] = useState('')
  const [chatContext, setChatContext] = useState<ChatContext>({})

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Initialize with greeting
  useEffect(() => {
    const greeting = chatService.getGreeting()
    setMessages([greeting])
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isTranscribing])

  const sendTextToLLM = useCallback(
    async (text: string) => {
      const normalizedText = text.trim()
      if (!normalizedText || isTyping) return

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: normalizedText,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsTyping(true)

      try {
        const response = await chatService.sendMessage({
          text: normalizedText,
          user: options.user,
          authToken: options.authToken,
          context: chatContext,
        })

        if (response.context) {
          setChatContext(response.context)
        }

        setMessages((prev) => [...prev, response.message])
      } catch (error) {
        setMessages((prev) => [...prev, chatService.createErrorMessage(error)])
      } finally {
        setIsTyping(false)
      }
    },
    [chatContext, isTyping, options.authToken, options.user],
  )

  const sendMessage = useCallback(async () => {
    await sendTextToLLM(input)
  }, [input, sendTextToLLM])

  const transcribeAndSendAudio = useCallback(
    async (audioBlob: Blob) => {
      setIsTranscribing(true)

      try {
        const transcription = await chatService.transcribeAudio(audioBlob)
        await sendTextToLLM(transcription)
      } catch (error) {
        setMessages((prev) => [...prev, chatService.createErrorMessage(error)])
      } finally {
        setIsTranscribing(false)
      }
    },
    [sendTextToLLM],
  )

  const startRecording = useCallback(async () => {
    if (isRecording || isTranscribing || isTyping) return

    if (!navigator.mediaDevices?.getUserMedia) {
      setMessages((prev) => [
        ...prev,
        chatService.createErrorMessage('Seu navegador não suporta gravação de áudio.'),
      ])
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      audioChunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const mimeType = recorder.mimeType || 'audio/webm'
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })

        stream.getTracks().forEach((track) => track.stop())
        mediaRecorderRef.current = null
        setIsRecording(false)

        if (audioBlob.size > 0) {
          void transcribeAndSendAudio(audioBlob)
        }
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
    } catch (error) {
      setIsRecording(false)
      setMessages((prev) => [...prev, chatService.createErrorMessage(error)])
    }
  }, [isRecording, isTranscribing, isTyping, transcribeAndSendAudio])

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current

    if (!recorder || recorder.state === 'inactive') {
      setIsRecording(false)
      return
    }

    recorder.stop()
  }, [])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  return {
    messages,
    isTyping,
    isRecording,
    isTranscribing,
    input,
    setInput,
    sendMessage,
    startRecording,
    stopRecording,
    handleKeyDown,
    bottomRef,
  }
}
