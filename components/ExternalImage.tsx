"use client"

import { useState, type ImgHTMLAttributes } from "react"
import { useLanguage } from "../lib/language-context"

interface ExternalImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string
}

export default function ExternalImage({
  fallbackText,
  alt,
  className,
  onError,
  ...props
}: ExternalImageProps) {
  const { dict } = useLanguage()
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center overflow-hidden border border-border rounded-md bg-muted/5 px-3 py-2 text-center text-xs text-muted-foreground ${
          className ?? ""
        }`}
      >
        {fallbackText ?? dict.imageUnavailable}
      </div>
    )
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      onError={(event) => {
        onError?.(event)
        setFailed(true)
      }}
    />
  )
}
