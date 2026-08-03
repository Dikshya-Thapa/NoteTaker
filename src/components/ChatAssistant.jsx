import { useEffect, useRef, useState } from 'react'
import { askAssistant } from '../api/aiApi'

const suggestions = [
  'Summarise my notes',
  'What are my Work notes about?',
  'Which note should I do first?',
]

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)

  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  async function sendMessage(text) {
    const question = text.trim()

    if (!question || isThinking) return

    setMessages((current) => [...current, { from: 'user', text: question }])
    setInput('')

    try {
      setIsThinking(true)

      const response = await askAssistant(question)

      setMessages((current) => [
        ...current,
        { from: 'bot', text: response.data },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          from: 'bot',
          text:
            error.response?.data?.error ||
            'Sorry, I could not answer that right now. Please try again.',
          isError: true,
        },
      ])
    } finally {
      setIsThinking(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:bg-emerald-700"
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <section
          aria-label="NoteTaker assistant"
          className="fixed bottom-24 right-4 z-40 flex h-[32rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6"
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
            <img
              src="/logo.png"
              alt=""
              className="h-9 w-9 rounded-full"
            />

            <div>
              <h2 className="font-display text-sm font-bold text-slate-900">
                Note Assistant
              </h2>

              <p className="text-xs text-slate-500">Ask about your notes</p>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="pt-2">
                <p className="text-center text-sm leading-6 text-slate-500">
                  Hi! I can summarise your notes, find what you wrote, or help
                  you organise them.
                </p>

                <div className="mt-5 space-y-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                    message.from === 'user'
                      ? 'bg-slate-900 text-white'
                      : message.isError
                        ? 'bg-red-50 text-red-700 ring-1 ring-red-200'
                        : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </span>
                </p>
              </div>
            )}

            <div ref={endOfMessagesRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-slate-200 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about your notes..."
              aria-label="Your message"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-800 bg-emerald-600 text-white shadow-[0_2px_0_0_#065f46] transition-all hover:bg-emerald-500 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </>
  )
}