import { useRef, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'
import { useChat } from '@/hooks/useChat'
import { useAuth } from '@/hooks/useAuth'
import { getInitials, formatTime } from '@/utils/cn'
import { cn } from '@/utils/cn'

// Simple markdown-like renderer for bold and newlines
function renderMessage(content: string) {
  const parts = content.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) => {
    if (i % 2 === 1) return <strong key={i}>{part}</strong>
    return part.split('\n').map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < part.split('\n').length - 1 && <br />}
      </span>
    ))
  })
}

export function AISecretaryPage() {
  const { user } = useAuth()
  const { messages, isTyping, input, setInput, sendMessage, handleKeyDown, bottomRef } = useChat()
  const textareaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — igual ao PrivateLayout */}
      <Sidebar />

      {/* Main chat area */}
      <div className="flex flex-col flex-1 h-screen bg-surface-bright md:ml-64 overflow-hidden">

        {/* Header */}
        <header className="bg-surface border-b border-outline-variant px-4 md:px-margin-desktop py-4 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-on-primary-container text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
            <div>
              <h2 className="font-hanken text-[16px] font-bold text-on-surface">Secretária Virtual</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="font-inter text-[12px] text-on-surface-variant">Online · Faaahtech AI</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>
        </header>

        {/* Messages scroll area */}
        <main
          className="flex-1 overflow-y-auto px-4 md:px-margin-desktop py-6 flex flex-col gap-5"
          style={{
            backgroundImage: 'radial-gradient(#e2e2e5 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Date chip */}
          <div className="flex justify-center">
            <span className="font-inter text-[11px] font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">
              Hoje, {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-3 max-w-[85%] md:max-w-[70%] animate-fade-in',
                msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start',
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full shrink-0 flex items-center justify-center border',
                  msg.role === 'assistant'
                    ? 'bg-primary-container border-outline-variant'
                    : 'bg-secondary-container border-outline-variant overflow-hidden',
                )}
              >
                {msg.role === 'assistant' ? (
                  <span
                    className="material-symbols-outlined text-on-primary-container text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    smart_toy
                  </span>
                ) : (
                  <span className="font-inter text-[12px] font-bold text-on-secondary-container">
                    {user ? getInitials(user.name) : 'U'}
                  </span>
                )}
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  'px-5 py-4 flex flex-col gap-1 shadow-sm',
                  msg.role === 'assistant'
                    ? 'bg-surface-container-lowest rounded-2xl rounded-bl-sm border border-outline-variant/40'
                    : 'bg-primary rounded-2xl rounded-br-sm shadow-primary-glow',
                )}
              >
                <p
                  className={cn(
                    'font-inter text-[14px] leading-relaxed',
                    msg.role === 'assistant' ? 'text-on-surface' : 'text-on-primary',
                  )}
                >
                  {renderMessage(msg.content)}
                </p>
                <span
                  className={cn(
                    'text-[10px] font-inter self-end mt-1',
                    msg.role === 'assistant' ? 'text-on-surface-variant/60' : 'text-on-primary/70',
                  )}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-3 max-w-[70%] self-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary-container border border-outline-variant flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-on-primary-container text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  smart_toy
                </span>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl rounded-bl-sm px-5 py-4 border border-outline-variant/40 shadow-sm flex items-center gap-1.5 h-12">
                {[0, 200, 400].map((delay) => (
                  <div
                    key={delay}
                    className="w-2 h-2 rounded-full bg-primary/50 animate-bounce-dot"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </main>

        {/* Input area */}
        <div className="bg-surface border-t border-outline-variant/40 px-4 md:px-margin-desktop py-4 shrink-0 shadow-top-bar">
          <div className="max-w-4xl mx-auto">
            {/* Quick suggestion chips */}
            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
              {[
                'Solicitar histórico',
                'Ver minhas notas',
                'Prazo de matrícula',
                'Contato da secretaria',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion)
                    textareaRef.current?.focus()
                  }}
                  className="shrink-0 px-3 py-1.5 bg-surface-container-low border border-outline-variant/40 rounded-full font-inter text-[12px] text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container hover:border-primary/30 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-3 bg-surface-container-low rounded-full px-3 py-2 border border-outline-variant/40 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0">
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>

              <input
                ref={textareaRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem para a secretaria..."
                className="flex-1 bg-transparent border-none focus:ring-0 font-inter text-[15px] text-on-surface placeholder:text-on-surface-variant/60 py-2 outline-none"
              />

              <div className="flex items-center gap-1 shrink-0">
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-[#6a000e] transition-all shadow-primary-glow active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    send
                  </span>
                </button>
              </div>
            </div>

            <p className="text-center mt-2 font-inter text-[10px] text-on-surface-variant/50">
              A inteligência artificial pode cometer erros. Confirme informações importantes nos portais oficiais.
            </p>
          </div>
        </div>

      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}
