"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal as TerminalIcon, X } from "lucide-react"
import { useLanguage } from "../lib/language-context"

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "welcome";
}

interface TerminalProps {
  onOpenPalette?: () => void
}

export default function Terminal({ onOpenPalette }: TerminalProps) {
  const { dict: t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: t.terminalWelcome1, type: "welcome" },
    { text: t.terminalWelcome2, type: "welcome" },
  ])
  const [input, setInput] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(raf)
    }
  }, [isOpen])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    const inputLine: TerminalLine = { text: `facundozin ~ % ${cmd}`, type: "input" }

    if (trimmed === "palette" || trimmed === "cmdk") {
      setHistory((prev) => [...prev, inputLine,
        { text: "Opening command palette...", type: "output" },
      ])
      onOpenPalette?.()
      return
    }

    if (trimmed.startsWith("goto ")) {
      const section = trimmed.slice(5).trim()
      const sections = ["intro", "work", "education", "thoughts", "connect"]
      if (sections.includes(section)) {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
        setHistory((prev) => [...prev, inputLine,
          { text: `Navigating to ${section}...`, type: "output" },
        ])
      } else {
        setHistory((prev) => [...prev, inputLine,
          { text: `Section "${section}" not found. Available: ${sections.join(", ")}`, type: "error" },
        ])
      }
      return
    }

    switch (trimmed) {
      case "help":
        setHistory((prev) => [...prev, inputLine,
          { text: "Available commands:", type: "output" },
          { text: "  about    - Learn more about Facundo", type: "output" },
          { text: "  projects - List main software development projects", type: "output" },
          { text: "  skills   - Show primary technical stack", type: "output" },
          { text: "  cv       - Download curriculum vitae", type: "output" },
          { text: "  goto     - Navigate to section (e.g. goto work)", type: "output" },
          { text: "  palette  - Open command palette (⌘K)", type: "output" },
          { text: "  clear    - Clear the terminal screen", type: "output" },
        ])
        break
      case "about":
        setHistory((prev) => [...prev, inputLine,
          { text: "Facundo Zin - AI Native Software Engineer based in Argentina.", type: "output" },
          { text: "Focusing on scalable systems, LLM integrations, and robust architectures.", type: "output" },
        ])
        break
      case "projects":
        setHistory((prev) => [...prev, inputLine,
          { text: "• ASOCIARG: Modular C#/.NET SaaS for civil associations.", type: "output" },
          { text: "• AFRelay: Python-based ARCA invoicing middleware with multitenancy.", type: "output" },
          { text: "• Rappi Delivery App: NestJS academic backend with PostgreSQL.", type: "output" },
        ])
        break
      case "skills":
        setHistory((prev) => [...prev, inputLine,
          { text: "Languages & Frameworks:", type: "output" },
          { text: "  C#, .NET, Python, TypeScript, NestJS, React, PostgreSQL", type: "output" },
          { text: "Tools & Architectures:", type: "output" },
          { text: "  Docker, Alembic, DDD, SDD, CI/CD, Git", type: "output" },
        ])
        break
      case "cv":
        setHistory((prev) => [...prev, inputLine,
          { text: "CV Links:", type: "output" },
          { text: "  - [ES] /cv/cv-facundozin-es.pdf", type: "output" },
          { text: "  - [EN] /cv/cv-facundozin-en.pdf", type: "output" },
          { text: "Opening download dialogs...", type: "output" },
        ])
        window.open("/cv/cv-facundozin-es.pdf", "_blank")
        break
      case "clear":
        setHistory([])
        break
      default:
        setHistory((prev) => [...prev, inputLine,
          { text: t.terminalNotFound.replace("{cmd}", cmd), type: "error" },
        ])
    }
  }

  const commands = ["about", "projects", "skills", "cv", "goto", "palette", "clear", "help"]

  const suggestion = input && commands.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()) || ""

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      if (suggestion) {
        e.preventDefault()
        setInput(suggestion)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-xs">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-green-500/30 via-border to-green-500/30 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group relative cursor-pointer ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
        aria-label="Open terminal"
      >
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-green-400 select-none border border-green-500/20 shadow-inner group-hover:border-green-500/50 transition-colors duration-300">
          <TerminalIcon className="w-5 h-5" />
        </div>
        <span className="absolute right-14 bg-background border border-border text-foreground px-2.5 py-1 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-sm pointer-events-none">
          {t.terminalTooltip}
        </span>
      </button>

      {/* Terminal Widget Window */}
      <div
        className={`w-[340px] sm:w-[400px] max-w-[calc(100vw-2rem)] border border-border rounded-lg bg-black/95 text-green-400 overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none absolute bottom-0 right-0"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Top window bar */}
        <div className="bg-muted/10 border-b border-border px-4 py-2 flex items-center justify-between select-none">
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] flex items-center justify-center text-[6px] text-black hover:opacity-85 cursor-pointer"
              aria-label="Close"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[6px] text-black hover:opacity-85 cursor-pointer"
              aria-label="Minimize"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-muted-foreground text-[10px]">facundozin@terminal:~</div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Area */}
        <div
          ref={containerRef}
          className="p-4 h-[272px] overflow-y-auto space-y-2 flex flex-col justify-between"
        >
          <div className="space-y-1.5 flex-1">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.type === "input"
                    ? "text-foreground"
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "welcome"
                    ? "text-muted-foreground/80"
                    : "text-green-400"
                }
              >
                {line.text}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <span className="text-muted-foreground select-none">facundozin ~ %</span>
              <div className="relative flex-1 flex items-center">
                {suggestion && (
                  <span className="absolute left-0 text-muted-foreground/30 pointer-events-none select-none">
                    {input + suggestion.slice(input.length)}
                  </span>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-foreground p-0 focus:ring-0 focus:outline-none relative z-10"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </div>
            </form>
          </div>

          {/* Clickable Suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/10 text-[10px] text-muted-foreground select-none">
            <span className="mr-0.5">{t.terminalClickLabel}</span>
            {commands.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCommand(cmd)
                }}
                className="hover:text-green-400 border border-border/20 rounded px-1.5 py-0.5 bg-muted/5 transition-colors duration-200 cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
