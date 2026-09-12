import Image from "next/image"
import type { Dictionary } from "@/lib/i18n"

interface IntroSectionProps {
  dict: Dictionary
}

export default function IntroSection({ dict: t }: IntroSectionProps) {
  return (
    <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
      <div className="lg:col-span-3 space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-2">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">{t.portfolio}</div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
            Facundo
            <br />
            <span className="text-muted-foreground">Zin</span>
          </h1>
        </div>

        <div className="space-y-6 max-w-md">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            <span className="text-foreground"> {t.aiNative} </span>
             {t.subtitle}
            <span className="text-foreground">{t.scalable}</span>,{t.llms}
            <span className="text-foreground">{t.llmsHighlight}</span>{t.andBuild}
            <span className="text-foreground">{t.enterprise}</span>
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {t.activeSearch}
            </div>
            <div>{t.country}</div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/cv/cv-facundozin-es.pdf"
              download="CV-Facundo-Zin-ES.pdf"
              className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:py-2 font-mono text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 rounded-md transition-all duration-300 bg-muted/5 hover:bg-muted/10 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t.downloadCV}</span>
            </a>
            <a
              href="/cv/cv-facundozin-en.pdf"
              download="CV-Facundo-Zin-EN.pdf"
              className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:py-2 font-mono text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 rounded-md transition-all duration-300 bg-muted/5 hover:bg-muted/10 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t.downloadCVEN}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-6 sm:space-y-8 mt-8 lg:mt-0">
        <div className="relative lg:self-end">
          <div className="absolute -top-[34px] left-[55px] sm:left-[80px] z-10 animate-float">
            {/* Twemoji flag asset — see public/emoji/flag-ar.svg. Uses an SVG
                instead of the native 🇦🇷 emoji because Windows does not render
                flag emoji (it shows "AR" instead). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/emoji/flag-ar.svg"
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              draggable={false}
              className="w-12 h-12 select-none pointer-events-none drop-shadow-[0_3px_10px_rgba(116,172,223,0.45)]"
            />
          </div>

          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-border shadow-lg hover:shadow-xl transition-shadow duration-500 relative">
            <Image
              src="/profile.jpg"
              alt="Facundo Zin"
              width={208}
              height={208}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="text-sm text-muted-foreground font-mono">{t.currently}</div>
          <div className="space-y-2">
            <div className="text-foreground">{t.softwareEngineer}</div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V11h6v10M9 7h.01M12 7h.01M15 7h.01M9 11h.01M15 11h.01" />
              </svg>
              {t.currentCompany}
            </div>
            <div className="text-xs text-muted-foreground">{t.present}</div>
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="text-sm text-muted-foreground font-mono">{t.stack}</div>
          <div className="flex flex-wrap gap-2">
            {["C#", ".NET", "TypeScript", "NestJS", "React", "Docker", "n8n"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
