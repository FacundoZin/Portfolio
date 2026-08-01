"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { useLanguage } from "../lib/language-context"
import type { ExperienceItem } from "../lib/i18n"
import ArchitectureDiagram from "./ArchitectureDiagram"

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

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      requestAnimationFrame(() => setIsVisible(true))
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setIsVisible(false)
    timeoutRef.current = setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }

  if (!project.deepDive || (!isOpen && !isClosing)) return null

  const sections = [
    { key: "context", label: t.deepDiveContext, content: project.deepDive.context },
    { key: "challenge", label: t.deepDiveChallenge, content: project.deepDive.challenge },
    { key: "solution", label: t.deepDiveSolution, content: project.deepDive.solution },
    { key: "result", label: t.deepDiveResult, content: project.deepDive.result },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl transition-all duration-200 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-2"}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-background/95 backdrop-blur-sm border-b border-border/40">
          <div className="flex items-center gap-2.5">
            {project.image && (
              <img
                src={project.image}
                alt={project.role}
                className="w-7 h-7 rounded border border-border/50 object-contain"
              />
            )}
            <div>
              <h3 className="text-base font-light leading-tight">{project.role}</h3>
              <p className="text-[11px] text-muted-foreground">{project.company}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-150"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {project.deepDive.architecture && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-muted-foreground/70 tracking-wider uppercase">
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
    </div>
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

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden transition-colors duration-200 hover:border-border/80">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors duration-150"
      >
        <span className="text-sm font-medium">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
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