import type { ChatMessage } from '@/types/chat'
import { AI_RESPONSES, DEFAULT_RESPONSE, GREETING_MESSAGE } from '@/mocks/chatResponses'
import { simulateDelay } from '@/utils/cn'

const findResponse = (input: string): string => {
  const lower = input.toLowerCase()
  const match = AI_RESPONSES.find((r) =>
    r.keywords.some((kw) => lower.includes(kw)),
  )
  return match?.response ?? DEFAULT_RESPONSE
}

const createMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  role,
  content,
  timestamp: new Date().toISOString(),
})

export const chatService = {
  getGreeting(): ChatMessage {
    return createMessage('assistant', GREETING_MESSAGE)
  },

  async sendMessage(userInput: string): Promise<ChatMessage> {
    // Typing delay between 800ms and 2000ms for realism
    await simulateDelay(800 + Math.random() * 1200)
    const response = findResponse(userInput)
    return createMessage('assistant', response)
  },
}
