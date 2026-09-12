"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../lib/language-context"

const sections = ["intro", "work", "education", "thoughts", "connect"]

export default function SideNav() {
  const { dict } = useLanguage()
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    let frame = 0

    const update = () => {
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    const handler = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    window.addEventListener("scroll", handler, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", handler)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav aria-label="Section navigation" className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-2 h-8 rounded-full transition-all duration-500 ${
              activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
            aria-label={dict.navigateTo.replace("{section}", section)}
            aria-current={activeSection === section ? "true" : undefined}
          />
        ))}
      </div>
    </nav>
  )
}
