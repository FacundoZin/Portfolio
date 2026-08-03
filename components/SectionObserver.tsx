"use client"

import { useEffect, useRef } from "react"

const sectionIds = ["intro", "work", "education", "thoughts", "connect"]

export default function SectionObserver() {
  const observedRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
    )

    observedRef.current = observer

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
