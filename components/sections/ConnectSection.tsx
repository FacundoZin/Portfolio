import Link from "next/link"
import type { Dictionary } from "@/lib/i18n"

interface ConnectSectionProps {
  dict: Dictionary
}

const email = "facundozin10@gmail.com"

export default function ConnectSection({ dict: t }: ConnectSectionProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-light">{t.letsTalk}</h2>

        <div className="space-y-6">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t.openToOpportunities}
          </p>

          <div className="space-y-4">
            <Link
              href={`mailto:${email}`}
              className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              <span className="text-base sm:text-lg">{email}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="text-sm text-muted-foreground font-mono">{t.findMeOn}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="https://github.com/FacundoZin"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-3">
              <img
                src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/light.svg"
                alt="GitHub"
                width={24}
                height={24}
                loading="lazy"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div>
                <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">GitHub</div>
                <div className="text-sm text-muted-foreground">@FacundoZin</div>
              </div>
            </div>
          </Link>

          <Link
            href="https://www.linkedin.com/in/facundozin"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-3">
              <img
                src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linkedin/default.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                loading="lazy"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div>
                <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">LinkedIn</div>
                <div className="text-sm text-muted-foreground">Facundo Zin</div>
              </div>
            </div>
          </Link>

          <Link
            href={`mailto:${email}`}
            className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-3">
              <img
                src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gmail/default.svg"
                alt="Gmail"
                width={24}
                height={24}
                loading="lazy"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div>
                <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">Gmail</div>
                <div className="text-sm text-muted-foreground break-all">{email}</div>
              </div>
            </div>
          </Link>

          <Link
            href="https://wa.me/543564653136"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-3">
              <img
                src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                loading="lazy"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div>
                <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">WhatsApp</div>
                <div className="text-sm text-muted-foreground">+54 3564 653136</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
