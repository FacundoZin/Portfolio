"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import LanguageToggle from "./LanguageToggle"
import { useTheme } from "./ThemeProvider"
import { useLanguage } from "../lib/language-context"
import dynamic from "next/dynamic"

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false })

export default function TopBar() {
  const { toggleTheme } = useTheme()
  const { toggleLanguage, dict: t } = useLanguage()
  const router = useRouter()
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  const handleToggleLanguage = useCallback(() => {
    toggleLanguage()
    router.refresh()
  }, [toggleLanguage, router])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsPaletteOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    const handler = () => setIsPaletteOpen(true)
    window.addEventListener("open-command-palette", handler)
    return () => window.removeEventListener("open-command-palette", handler)
  }, [])

  return (
    <>
      <div className="fixed top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={() => setIsPaletteOpen(true)}
          className="hidden sm:flex items-center justify-center w-9 h-9 text-muted-foreground/50 border border-border/40 rounded-lg bg-muted/30 hover:bg-muted/60 hover:text-muted-foreground hover:border-muted-foreground/30 transition-all duration-200 cursor-pointer"
          aria-label={t.commandPaletteLabel}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
          </svg>
        </button>
        <LanguageToggle />
      </div>

      {isPaletteOpen && (
        <CommandPalette
          onClose={() => setIsPaletteOpen(false)}
          onToggleTheme={toggleTheme}
          onToggleLanguage={handleToggleLanguage}
        />
      )}
    </>
  )
}
