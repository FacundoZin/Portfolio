"use client"

import { useState, useRef, useEffect, useCallback, useId } from "react"
import { createPortal } from "react-dom"
import { ChevronDown, X } from "lucide-react"
import { useLanguage } from "../lib/language-context"
import type { ExperienceItem } from "../lib/i18n"
import ArchitectureDiagram, { hasArchitectureDiagram } from "./ArchitectureDiagram"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface ProjectDeepDiveProps {
  project: ExperienceItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDeepDive({ project, isOpen, onClose }: ProjectDeepDiveProps) {
  const { dict: t } = useLanguage()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      requestAnimationFrame(() => setIsVisible(true))
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setIsVisible(false)
    timeoutRef.current = setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }, [onClose])

  // Move focus into the dialog on open, restore it on close/unmount, and lock
  // body scroll while the dialog is open. Compensating the scrollbar width
  // keeps the page behind from shifting sideways when the scrollbar disappears.
  useEffect(() => {
    if (!isOpen) return
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = "hidden"
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
    const raf = requestAnimationFrame(() => dialogRef.current?.focus())
    return () => {
      cancelAnimationFrame(raf)
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      previouslyFocusedRef.current?.focus()
    }
  }, [isOpen])

  // Escape closes the dialog; Tab/Shift+Tab cycle focus within it.
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
        return
      }
      if (e.key !== "Tab") return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) {
        e.preventDefault()
        dialog.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, handleClose])

  if (!project.deepDive || (!isOpen && !isClosing)) return null
  if (typeof document === "undefined") return null

  const sections = [
    { key: "context", label: t.deepDiveContext, content: project.deepDive.context },
    { key: "challenge", label: t.deepDiveChallenge, content: project.deepDive.challenge },
    { key: "solution", label: t.deepDiveSolution, content: project.deepDive.solution },
    { key: "result", label: t.deepDiveResult, content: project.deepDive.result },
  ]

  // Rendered through a portal into <body> on purpose: the animated sections get
  // `transform` from `.animate-fade-in-up` (fill-mode: forwards), and ANY
  // transformed ancestor makes `position: fixed` resolve against that ancestor
  // instead of the viewport — which made this dialog open offset and clipped.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative w-full max-w-4xl max-h-[90vh] max-h-[90dvh] overflow-y-auto overscroll-contain scrollbar-thin bg-background border border-border rounded-xl shadow-2xl outline-none transition-all duration-200 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-2"}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-background/95 backdrop-blur-sm border-b border-border/40">
          <div className="flex items-center gap-2.5">
            {project.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.role}
                className="w-7 h-7 rounded border border-border/50 object-contain"
              />
            )}
            <div>
              <h3 id={titleId} className="text-base font-light leading-tight">{project.role}</h3>
              <p className="text-[11px] text-muted-foreground">{project.company}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label={t.closeDeepDive}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-150"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {project.deepDive.architecture && hasArchitectureDiagram(project.deepDive.architecture) && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                {t.deepDiveArchitecture}
              </span>
              <div className="p-5 border border-border/60 rounded-lg bg-muted/20">
                <ArchitectureDiagram type={project.deepDive.architecture} />
              </div>
            </div>
          )}

          <div className="space-y-2">
            {sections.map((section) => (
              <AccordionSection
                key={section.key}
                label={section.label}
                content={section.content}
                isOpen={activeSection === section.key}
                onToggle={() => setActiveSection(activeSection === section.key ? null : section.key)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[10px] border border-border/60 rounded-full text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function AccordionSection({
  label,
  content,
  isOpen,
  onToggle,
}: {
  label: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const panelId = useId()

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden transition-colors duration-200 hover:border-border/80">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors duration-150"
      >
        <span className="text-sm font-medium">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        ref={contentRef}
        aria-hidden={!isOpen}
        className="overflow-hidden transition-[height] duration-250 ease-out"
        style={{ height: `${height}px` }}
      >
        <div className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  )
}