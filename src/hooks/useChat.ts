import { useState, useEffect, useRef } from 'react'
import type { ChatMessage } from '@/types/chat'
import { chatService } from '@/services/chatService'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Initialize with greeting
  useEffect(() => {
    const greeting = chatService.getGreeting()
    setMessages([greeting])
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const response = await chatService.sendMessage(text)
      setMessages((prev) => [...prev, response])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return {
    messages,
    isTyping,
    input,
    setInput,
    sendMessage,
    handleKeyDown,
    bottomRef,
  }
}
