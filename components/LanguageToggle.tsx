"use client"

import { useRouter } from "next/navigation"
import { useLanguage } from "../lib/language-context"

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage()
  const router = useRouter()

  const handleToggle = () => {
    toggleLanguage()
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      className="group relative flex items-center h-9 sm:h-8 w-20 rounded-full border border-border/40 bg-muted/40 p-[3px] cursor-pointer select-none transition-all duration-300 hover:border-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
    >
      <span
        className={`absolute top-[3px] bottom-[3px] left-[3px] w-[35px] rounded-full bg-foreground shadow-sm transition-transform duration-300 ease-out ${
          locale === "en" ? "translate-x-[39px]" : "translate-x-0"
        }`}
      />
      <span
        className={`absolute left-[3px] w-[35px] text-center text-xs font-mono font-bold tracking-wider z-10 pointer-events-none select-none transition-colors duration-300 ${
          locale === "es" ? "text-background" : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        ES
      </span>
      <span
        className={`absolute right-[3px] w-[35px] text-center text-xs font-mono font-bold tracking-wider z-10 pointer-events-none select-none transition-colors duration-300 ${
          locale === "en" ? "text-background" : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        EN
      </span>
    </button>
  )
}
