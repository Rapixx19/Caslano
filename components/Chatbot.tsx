'use client'

import { useState, useRef, useEffect } from 'react'
import { useApp } from '@/lib/context'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Buongiorno! Sono l\'assistente virtuale di Residenza Caslano. Come posso aiutarti oggi?',
  timestamp: new Date(),
}

const SUGGESTIONS = [
  'Prezzi Blocco A',
  'Disponibilità',
  'Come arrivare',
  'Prenota visita',
]

export function Chatbot() {
  const { isChatOpen, toggleChat, closeChat, openModal } = useApp()
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showBadge, setShowBadge] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isChatOpen) {
      setShowBadge(false)
      inputRef.current?.focus()
    }
  }, [isChatOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    setShowSuggestions(false)
    const userMessage: Message = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const assistantContent = data.content?.[0]?.text || 'Mi scuso, si è verificato un errore. Riprova.'

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: assistantContent,
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Mi scuso, si è verificato un errore di connessione. Riprova più tardi.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  }

  const renderMessageContent = (content: string) => {
    if (content.includes('[BTN_VISITA]') || content.includes('[BTN_CHIAMATA]')) {
      const parts = content.split(/(\[BTN_VISITA\]|\[BTN_CHIAMATA\])/)
      return (
        <>
          {parts.map((part, i) => {
            if (part === '[BTN_VISITA]') {
              return (
                <button
                  key={i}
                  onClick={() => { closeChat(); openModal('visit') }}
                  className="block mt-2 px-3 py-2 bg-charcoal text-white text-[11px] tracking-wide uppercase rounded hover:bg-amber transition-colors"
                >
                  🏛️ Prenota una visita →
                </button>
              )
            }
            if (part === '[BTN_CHIAMATA]') {
              return (
                <button
                  key={i}
                  onClick={() => { closeChat(); openModal('call') }}
                  className="block mt-2 px-3 py-2 bg-charcoal text-white text-[11px] tracking-wide uppercase rounded hover:bg-amber transition-colors"
                >
                  📞 Prenota una chiamata →
                </button>
              )
            }
            return <span key={i}>{part}</span>
          })}
        </>
      )
    }
    return content
  }

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={toggleChat}
        className="fixed z-[450] w-[52px] h-[52px] rounded-full bg-charcoal flex items-center justify-center hover:bg-amber hover:scale-[1.06] transition-all duration-200"
        style={{
          right: 'max(20px, env(safe-area-inset-right))',
          bottom: 'max(20px, calc(env(safe-area-inset-bottom) + 8px))',
        }}
        aria-label="Chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber rounded-full flex items-center justify-center text-white text-[10px] font-sans">
            1
          </span>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed z-[451] bg-offwhite shadow-[0_12px_48px_rgba(0,0,0,0.18)] flex flex-col transition-all duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isChatOpen
            ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
            : 'opacity-0 pointer-events-none translate-y-4 scale-[0.94]'
          }
          /* Mobile bottom sheet */
          max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:w-full max-sm:rounded-t-[20px] max-sm:max-h-[88svh]
          /* Desktop positioned panel */
          sm:w-[360px] sm:rounded-[16px] sm:max-h-[min(600px,calc(100svh-120px))]`}
        style={{
          right: 'max(20px, env(safe-area-inset-right))',
          bottom: '88px',
          borderWidth: '0.5px',
          borderColor: 'rgba(30,29,27,0.12)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-charcoal/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-white font-serif text-sm">
              RC
            </div>
            <div>
              <div className="font-sans text-[13px] font-medium text-charcoal">Assistente Residenza Caslano</div>
              <div className="font-sans text-[10px] text-muted flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Online · risposta immediata
              </div>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="w-10 h-10 flex items-center justify-center text-muted text-[20px] hover:text-charcoal"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[88%] px-[13px] py-[10px] font-sans text-[13px] font-light leading-[1.6]
                  ${msg.role === 'user'
                    ? 'bg-charcoal text-white rounded-[12px_12px_3px_12px]'
                    : 'bg-white text-charcoal border border-charcoal/10 rounded-[12px_12px_12px_3px]'
                  }`}
              >
                {renderMessageContent(msg.content)}
              </div>
              <span className="font-sans text-[8px] text-muted mt-1">{formatTime(msg.timestamp)}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div className="flex gap-1 px-[13px] py-[10px] bg-white border border-charcoal/10 rounded-[12px_12px_12px_3px]">
                {[0, 200, 400].map(delay => (
                  <div
                    key={delay}
                    className="w-[6px] h-[6px] rounded-full bg-muted animate-typingPulse"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="border border-travertine rounded-full px-[13px] py-[6px] font-sans text-[11px] text-muted font-light hover:border-charcoal hover:text-charcoal transition-colors min-h-[36px]"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-charcoal/10 flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            rows={1}
            className="flex-1 resize-none border border-charcoal/[0.14] rounded-lg px-[13px] py-[10px] font-sans text-[15px] text-charcoal placeholder:text-muted outline-none focus:border-charcoal bg-white"
            style={{ fontSize: '16px', maxHeight: '120px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-[38px] h-[38px] bg-charcoal rounded-lg flex items-center justify-center hover:bg-amber transition-colors disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
