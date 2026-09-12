"use client"

import { useEffect, useState } from "react"

// global-error replaces the root layout, so it cannot use the language context.
// A tiny inline map keyed by the document language keeps the copy localized
// without any provider dependency. It defaults to English and never throws.
const STRINGS = {
  en: {
    title: "Something went wrong",
    description:
      "A critical error interrupted the application. You can try again.",
    retry: "Try again",
  },
  es: {
    title: "Algo salió mal",
    description:
      "Un error crítico interrumpió la aplicación. Podés intentarlo de nuevo.",
    retry: "Reintentar",
  },
} as const

type ErrorLocale = keyof typeof STRINGS

function detectLocale(): ErrorLocale {
  try {
    if (typeof document === "undefined") return "en"
    return document.documentElement.lang.toLowerCase().startsWith("es")
      ? "es"
      : "en"
  } catch {
    return "en"
  }
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [locale, setLocale] = useState<ErrorLocale>("en")

  useEffect(() => {
    setLocale(detectLocale())
  }, [])

  useEffect(() => {
    console.error(error)
  }, [error])

  const strings = STRINGS[locale]

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 1rem",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a1a1a1",
            }}
          >
            Error
          </p>
          <h1
            style={{
              margin: "0 0 0.75rem",
              fontSize: "1.5rem",
              fontWeight: 300,
            }}
          >
            {strings.title}
          </h1>
          <p
            style={{
              margin: "0 0 1.5rem",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "#a1a1a1",
            }}
          >
            {strings.description}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              color: "#fafafa",
              backgroundColor: "#262626",
              border: "1px solid #404040",
              borderRadius: "0.625rem",
              cursor: "pointer",
            }}
          >
            {strings.retry}
          </button>
        </div>
      </body>
    </html>
  )
}
