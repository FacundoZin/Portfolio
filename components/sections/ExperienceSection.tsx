import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import type { Dictionary } from "@/lib/i18n"
import type { ReactNode } from "react"

interface ExperienceSectionProps {
  dict: Dictionary
  githubSection: ReactNode
}

export default function ExperienceSection({ dict: t, githubSection }: ExperienceSectionProps) {
  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-light">{t.experienceTitle}</h2>
        <div className="text-sm text-muted-foreground font-mono">{t.experienceYears}</div>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {t.experiences.map((item, index) => (
          <div
            key={index}
            className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
          >
            <div className="lg:col-span-2 space-y-1">
              <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                {item.year}
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {item.type === "project" ? t.project : t.employment}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div>
                <h3 className="text-lg sm:text-xl font-medium">{item.role}</h3>
                <div className="text-muted-foreground">{item.company}</div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-lg">{item.description}</p>
              {item.image && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {item.link && (
                <div className="pt-1">
                  <Link
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 rounded-md transition-all duration-300 bg-muted/5 hover:bg-muted/10"
                  >
                    {item.link.type === "github" ? (
                      <Github className="w-3.5 h-3.5" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5" />
                    )}
                    <span>{item.link.label}</span>
                  </Link>
                </div>
              )}
            </div>

            {item.image ? (
              <div className="lg:col-span-4 flex items-start lg:justify-end mt-4 lg:mt-0">
                <Image
                  src={item.image}
                  alt={item.role}
                  width={112}
                  height={112}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-border/50 object-contain select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0 content-start">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-light">{t.githubActivity}</h3>
          <Link
            href="https://github.com/FacundoZin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {t.viewProfile}
          </Link>
        </div>

        {githubSection}
      </div>
    </div>
  )
}
