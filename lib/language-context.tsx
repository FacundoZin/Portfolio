"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { getDictionary, type Locale, type Dictionary } from "./i18n"

const COOKIE_NAME = "locale"

interface LanguageContextType {
  locale: Locale
  dict: Dictionary
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return "es"
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  const value = match?.[1]
  if (value === "es" || value === "en") return value
  return "es"
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es")

  useEffect(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "es" ? "en" : "es"
      setLocaleCookie(next)
      return next
    })
  }, [])

  const dict = getDictionary(locale)

  return (
    <LanguageContext.Provider value={{ locale, dict, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
