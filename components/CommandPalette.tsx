"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "../lib/language-context"
import {
  filterCommands,
  groupCommands,
  type Command,
} from "../lib/commands"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onToggleTheme: () => void
  onToggleLanguage: () => void
}

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleTheme,
  onToggleLanguage,
}: CommandPaletteProps) {
  const { dict: t, locale } = useLanguage()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const commands: Command[] = useMemo(
    () => [
      {
        id: "intro",
        label: locale === "es" ? "Intro" : "Intro",
        description: locale === "es" ? "Ir al inicio" : "Go to top",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        category: "navigation",
        keywords: ["home", "inicio", "hero", "arriba", "top"],
        action: () => {
          document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })
        },
      },
      {
        id: "experience",
        label: locale === "es" ? "Experiencia" : "Experience",
        description: locale === "es" ? "Proyectos y empleos" : "Projects & jobs",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        category: "navigation",
        keywords: ["work", "trabajo", "proyectos", "projects", "empleo", "jobs"],
        action: () => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
        },
      },
      {
        id: "education",
        label: locale === "es" ? "Educación" : "Education",
        description: locale === "es" ? "Formación académica" : "Academic background",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        ),
        category: "navigation",
        keywords: ["estudios", "universidad", "utn", "degree", "university"],
        action: () => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })
        },
      },
      {
        id: "posts",
        label: t.postsTitle,
        description: locale === "es" ? "Artículos en LinkedIn" : "LinkedIn articles",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        ),
        category: "navigation",
        keywords: ["blog", "articulos", "articles", "linkedin", "posts", "publicaciones"],
        action: () => {
          document.getElementById("thoughts")?.scrollIntoView({ behavior: "smooth" })
        },
      },
      {
        id: "connect",
        label: t.letsTalk,
        description: locale === "es" ? "Contacto" : "Contact",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        category: "navigation",
        keywords: ["contacto", "email", "whatsapp", "linkedin", "talk", "hablemos"],
        action: () => {
          document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })
        },
      },
      {
        id: "theme",
        label: locale === "es" ? "Cambiar tema" : "Toggle theme",
        description: locale === "es" ? "Dark / Light" : "Dark / Light",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ),
        category: "actions",
        keywords: ["tema", "dark", "light", "oscuro", "claro", "theme"],
        shortcut: locale === "es" ? "⌘D" : "⌘D",
        action: onToggleTheme,
      },
      {
        id: "language",
        label: locale === "es" ? "Cambiar idioma" : "Switch language",
        description: locale === "es" ? "Cambiar a inglés" : "Switch to Spanish",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
        category: "actions",
        keywords: ["idioma", "español", "english", "spanish", "lang", "es", "en"],
        action: onToggleLanguage,
      },
      {
        id: "cv-es",
        label: locale === "es" ? "Descargar CV (ES)" : "Download CV (ES)",
        description: "PDF",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        category: "actions",
        keywords: ["cv", "resume", "curriculum", "pdf", "descargar", "download"],
        action: () => {
          window.open("/cv/cv-facundozin-es.pdf", "_blank")
        },
      },
      {
        id: "cv-en",
        label: locale === "es" ? "Descargar CV (EN)" : "Download CV (EN)",
        description: "PDF",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        category: "actions",
        keywords: ["cv", "resume", "curriculum", "pdf", "english"],
        action: () => {
          window.open("/cv/cv-facundozin-en.pdf", "_blank")
        },
      },
      {
        id: "github",
        label: "GitHub",
        description: "@FacundoZin",
        icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        ),
        category: "social",
        keywords: ["repo", "repositorio", "code", "codigo", "source"],
        action: () => {
          window.open("https://github.com/FacundoZin", "_blank")
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        description: "Facundo Zin",
        icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
        category: "social",
        keywords: ["profile", "perfil", "network", "profesional"],
        action: () => {
          window.open("https://www.linkedin.com/in/facundozin", "_blank")
        },
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        description: "+54 3564 653136",
        icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        ),
        category: "social",
        keywords: ["msg", "mensaje", "message", "chat", "celular", "phone"],
        action: () => {
          window.open("https://wa.me/543564653136", "_blank")
        },
      },
      {
        id: "terminal",
        label: locale === "es" ? "Abrir terminal" : "Open terminal",
        description: locale === "es" ? "Shell interactivo" : "Interactive shell",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        category: "info",
        keywords: ["shell", "bash", "command", "comando", "cli"],
        action: () => {
          onClose()
          document.querySelector<HTMLButtonElement>("[aria-label='Open terminal']")?.click()
        },
      },
    ],
    [locale, t, onToggleTheme, onToggleLanguage, onClose]
  )

  const filtered = useMemo(() => filterCommands(commands, query), [commands, query])
  const groups = useMemo(() => groupCommands(filtered), [filtered])
  const flatCommands = useMemo(() => groups.flatMap((g) => g.commands), [groups])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setActiveIndex(0)
      const raf = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(raf)
    }
  }, [isOpen])

  useEffect(() => {
    const el = itemRefs.current[activeIndex]
    if (el) {
      el.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex])

  const executeCommand = useCallback(
    (cmd: Command) => {
      cmd.action()
      onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((i) => (i + 1) % flatCommands.length)
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((i) => (i - 1 + flatCommands.length) % flatCommands.length)
          break
        case "Enter":
          e.preventDefault()
          if (flatCommands[activeIndex]) {
            executeCommand(flatCommands[activeIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, flatCommands, activeIndex, executeCommand, onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] transition-all duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={`relative w-full max-w-md mx-4 bg-background border border-border rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg
            className="w-4 h-4 text-muted-foreground shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "es" ? "Buscar comandos..." : "Search commands..."
            }
            className="flex-1 py-3 bg-transparent text-foreground placeholder-muted-foreground/50 outline-none text-sm font-mono"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/50 border border-border/50 rounded">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[320px] overflow-y-auto py-2 scrollbar-thin"
          role="listbox"
        >
          {flatCommands.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground/50 font-mono">
              {locale === "es" ? "Sin resultados" : "No results"}
            </div>
          )}

          {groups.map((group) => {
            let globalIdx = flatCommands.indexOf(group.commands[0])
            return (
              <div key={group.label}>
                <div className="px-4 pt-2 pb-1 text-[10px] font-mono font-semibold tracking-wider text-muted-foreground/40 uppercase select-none">
                  {group.label}
                </div>
                {group.commands.map((cmd) => {
                  const idx = globalIdx++
                  const isActive = idx === activeIndex
                  return (
                    <div
                      key={cmd.id}
                      ref={(el) => { itemRefs.current[idx] = el }}
                      role="option"
                      aria-selected={isActive}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-75 ${
                        isActive
                          ? "bg-muted/80 text-foreground"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => executeCommand(cmd)}
                    >
                      <span className="shrink-0 opacity-60">{cmd.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{cmd.label}</div>
                        {cmd.description && (
                          <div className="text-xs text-muted-foreground/50 truncate">
                            {cmd.description}
                          </div>
                        )}
                      </div>
                      {cmd.shortcut && (
                        <kbd className="shrink-0 text-[10px] font-mono text-muted-foreground/40 border border-border/50 rounded px-1 py-0.5">
                          {cmd.shortcut}
                        </kbd>
                      )}
                      <svg
                        className={`w-3 h-3 shrink-0 transition-opacity duration-75 ${
                          isActive ? "opacity-50" : "opacity-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] font-mono text-muted-foreground/30 select-none">
          <div className="flex items-center gap-2">
            <span>↑↓</span>
            <span>navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <span>↵</span>
            <span>select</span>
          </div>
          <div className="flex items-center gap-2">
            <span>esc</span>
            <span>close</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
