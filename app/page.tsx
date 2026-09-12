import { cookies } from "next/headers"
import { getDictionary } from "../lib/i18n"
import IntroSection from "../components/sections/IntroSection"
import ExperienceSection from "../components/sections/ExperienceSection"
import EducationSection from "../components/sections/EducationSection"
import PostsSection from "../components/sections/PostsSection"
import ConnectSection from "../components/sections/ConnectSection"
import GitHubSection from "../components/sections/GitHubSection"

import ThemeProvider from "../components/ThemeProvider"
import TopBar from "../components/TopBar"
import SideNav from "../components/SideNav"
import SectionObserver from "../components/SectionObserver"
import FooterInteractive from "../components/FooterInteractive"
import Terminal from "../components/Terminal"
import TechTicker from "../components/TechTicker"

export default async function Home() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("locale")?.value as "es" | "en") || "es"
  const t = getDictionary(locale)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Facundo Zin",
              jobTitle: "Software Engineer",
              url: "https://facundozin.vercel.app",
              email: "facundozin10@gmail.com",
              sameAs: [
                "https://github.com/FacundoZin",
                "https://www.linkedin.com/in/facundozin",
              ],
              knowsAbout: [
                "C#", ".NET", "TypeScript", "NestJS",
                "React", "Docker", "Artificial Intelligence", "LLM Integration",
              ],
              worksFor: { "@type": "Organization", name: "Syntrax Software" },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Universidad Tecnologica Nacional",
              },
            }),
          }}
        />

        <TopBar />
        <SideNav />
        <SectionObserver />

        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1 !important;transform:none !important;}</style>",
          }}
        />

        <header
          id="intro"
          data-reveal
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 min-h-screen flex items-center opacity-0 py-10 sm:py-0"
        >
          <IntroSection dict={t} />
        </header>

        <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <TechTicker />

          <section
            id="work"
            data-reveal
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <ExperienceSection
              dict={t}
              githubSection={
                <GitHubSection
                  contributionsLabel={t.contributions}
                  recentActivityLabel={t.recentActivity}
                />
              }
            />
          </section>

          <section
            id="education"
            data-reveal
            className="pt-10 sm:pt-16 pb-20 sm:pb-32 opacity-0"
          >
            <EducationSection dict={t} />
          </section>

          <section
            id="thoughts"
            data-reveal
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <PostsSection dict={t} />
          </section>

          <section
            id="connect"
            data-reveal
            className="py-20 sm:py-32 opacity-0"
          >
            <ConnectSection dict={t} />
          </section>
        </main>

        <footer className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="py-12 sm:py-16 border-t border-border">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{t.footerRights}</div>
                <div className="text-xs text-muted-foreground">{t.footerDesigned}</div>
              </div>
              <FooterInteractive />
            </div>
          </div>
        </footer>

        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        <Terminal />
      </div>
    </ThemeProvider>
  )
}
