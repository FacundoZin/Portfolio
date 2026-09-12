"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

const THEME_STORAGE_KEY = "theme"

interface ThemeProviderProps {
  children: ReactNode
}

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // The blocking inline script in app/layout.tsx already applied the persisted
  // theme to <html> before first paint. Derive the initial state from that DOM
  // state so the provider never fights the script. On the server (no document)
  // it falls back to dark, which matches the default applied by the script.
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return true
    return document.documentElement.classList.contains("dark")
  })

  // Reflect user-initiated toggles back onto <html>.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light")
      } catch {
        // Ignore storage access errors (private mode, blocked storage, etc.)
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme])

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
