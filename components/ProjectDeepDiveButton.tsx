"use client"

import { useCallback, useState } from "react"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "../lib/language-context"
import type { ExperienceItem } from "../lib/i18n"
import ProjectDeepDive from "./ProjectDeepDive"

interface ProjectDeepDiveButtonProps {
  project: ExperienceItem
}

export default function ProjectDeepDiveButton({ project }: ProjectDeepDiveButtonProps) {
  const { dict: t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = useCallback(() => setIsOpen(false), [])

  if (!project.deepDive) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 rounded-md transition-all duration-300 bg-muted/5 hover:bg-muted/10 cursor-pointer"
      >
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{t.viewDeepDive}</span>
      </button>
      <ProjectDeepDive project={project} isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
