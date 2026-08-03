import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "../lib/language-context"
import HtmlLang from "../components/HtmlLang"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Facundo Zin - Software Engineer",
  description:
    "AI Native Software Engineer specializing in scalable systems, LLM integration, and enterprise applications. C#, .NET, TypeScript, NestJS, React.",
  metadataBase: new URL("https://facundozin.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Facundo Zin - Software Engineer",
    description:
      "AI Native Software Engineer specializing in scalable systems, LLM integration, and enterprise applications.",
    url: "https://facundozin.vercel.app",
    siteName: "Facundo Zin Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Facundo Zin - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facundo Zin - Software Engineer",
    description:
      "AI Native Software Engineer specializing in scalable systems, LLM integration, and enterprise applications.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://github-readme-stats-sigma-five.vercel.app" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <HtmlLang />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
