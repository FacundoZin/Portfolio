"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"
import { getDictionary, type Locale, type Dictionary } from "./i18n"

const COOKIE_NAME = "locale"

interface LanguageContextType {
  locale: Locale
  dict: Dictionary
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function setLocaleCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "es" ? "en" : "es"
      setLocaleCookie(next)
      return next
    })
  }, [])

  const dict = useMemo(() => getDictionary(locale), [locale])

  const value = useMemo(
    () => ({ locale, dict, toggleLanguage }),
    [locale, dict, toggleLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
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
