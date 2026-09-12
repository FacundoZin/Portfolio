"use client"

import { useEffect } from "react"
import { useLanguage } from "../lib/language-context"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { dict } = useLanguage()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md w-full text-center space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Error
        </p>
        <h1 className="text-2xl sm:text-3xl font-light">{dict.errorTitle}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {dict.errorDescription}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 text-sm border border-border rounded-lg bg-muted/5 hover:bg-muted/10 hover:border-muted-foreground/50 transition-colors duration-300"
        >
          {dict.errorRetry}
        </button>
      </div>
    </div>
  )
}
