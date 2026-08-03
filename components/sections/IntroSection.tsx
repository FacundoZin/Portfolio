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
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 rounded-md transition-all duration-300 bg-muted/5 hover:bg-muted/10 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t.downloadCV}</span>
            </a>
            <a
              href="/cv/cv-facundozin-en.pdf"
              download="CV-Facundo-Zin-EN.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 rounded-md transition-all duration-300 bg-muted/5 hover:bg-muted/10 cursor-pointer"
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
          <div className="absolute -top-[34px] left-[55px] sm:left-[80px] z-10 animate-bounce" style={{ animationDuration: "3s" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(64,196,99,0.2)]">
              <path d="M 6 14 Q 2 15 3 10" stroke="#40c463" strokeWidth="2.5" strokeLinecap="round" className="mascot-wag" />
              <rect x="7" y="15" width="2" height="3" fill="#2d8744" rx="0.5" />
              <rect x="12" y="15" width="2" height="3" fill="#2d8744" rx="0.5" />
              <rect x="6" y="10" width="9" height="6" rx="2" fill="#40c463" />
              <path d="M 8 10 L 9 7 L 10 10" fill="#f59e0b" />
              <path d="M 11 10 L 12 7 L 13 10" fill="#f59e0b" />
              <g className="mascot-bob">
                <rect x="13" y="8" width="6" height="6" rx="1.5" fill="#40c463" />
                <path d="M 15 8 L 16 5 L 17 8" fill="#f59e0b" />
                <circle cx="17" cy="10.5" r="0.8" fill="black" />
                <circle cx="17.2" cy="10.2" r="0.3" fill="white" />
              </g>
            </svg>
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
