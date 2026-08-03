"use client"

import React from "react"

interface TechIcon {
  name: string
  hoverColor: string
  slug?: string
  customSvg?: React.ReactNode
}

const icons: TechIcon[] = [
  {
    name: "C#",
    slug: "cs",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(35,145,32,0.4)]",
  },
  {
    name: ".NET",
    slug: "dotnet",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(81,43,212,0.4)]",
  },
  {
    name: "TypeScript",
    slug: "ts",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(49,120,198,0.4)]",
  },
  {
    name: "Python",
    slug: "py",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(55,118,171,0.4)]",
  },
  {
    name: "React",
    slug: "react",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(97,218,251,0.4)]",
  },
  {
    name: "Next.js",
    slug: "nextjs",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
  },
  {
    name: "NestJS",
    slug: "nestjs",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(224,35,78,0.4)]",
  },
  {
    name: "Node.js",
    slug: "nodejs",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(104,179,100,0.4)]",
  },
  {
    name: "Vue.js",
    slug: "vue",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(79,192,141,0.4)]",
  },
  {
    name: "PostgreSQL",
    slug: "postgres",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(51,103,145,0.4)]",
  },
  {
    name: "Docker",
    slug: "docker",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(36,150,237,0.4)]",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwind",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]",
  },
  {
    name: "pnpm",
    slug: "pnpm",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(254,200,50,0.4)]",
  },
  {
    name: "Git",
    slug: "git",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(240,80,50,0.4)]",
  },
  {
    name: "GitHub",
    slug: "github",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
  },
  {
    name: "GitHub Actions",
    slug: "githubactions",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(0,200,100,0.4)]",
  },
  {
    name: "Linux",
    slug: "linux",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(248,200,50,0.4)]",
  },
  {
    name: "VS Code",
    slug: "vscode",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(52,134,219,0.4)]",
  },
  {
    name: "JWT",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(255,51,102,0.4)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-rose-400">
          <path d="M12 2L9 7l3 5-3 5 3 5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2l3 5-3 5 3 5-3 5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>
    ),
  },
  {
    name: "n8n",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(255,111,0,0.4)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-orange-400">
          <path d="M4 20L12 4l8 16H4z" strokeLinejoin="round" />
          <path d="M12 4v16" strokeWidth="1.5" opacity="0.4" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    ),
  },
  {
    name: "DDD",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-purple-400">
          <circle cx="12" cy="12" r="8" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="4" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.5" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
    ),
  },
  {
    name: "SDD",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-cyan-400">
          <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinejoin="round" />
          <path d="M8 8h8M8 12h6M8 16h4" strokeLinecap="round" strokeWidth="2" />
          <path d="M17 2v2M7 2v2" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>
    ),
  },
  {
    name: "LLMs",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-emerald-400">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2a10 10 0 00-10 10" opacity="0.4" />
          <path d="M12 2a10 10 0 0110 10" opacity="0.4" />
          <path d="M2 12h20" opacity="0.3" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="6" cy="18" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="18" cy="18" r="1.5" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>
    ),
  },
  {
    name: "RAG",
    hoverColor: "hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-yellow-400">
          <circle cx="10" cy="10" r="5" />
          <path d="M21 21l-6-6" strokeLinecap="round" />
          <path d="M10 6v8M6 10h8" opacity="0.5" strokeWidth="1.5" />
        </svg>
      </div>
    ),
  },
  {
    name: "Antigravity",
    hoverColor: "hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]",
    customSvg: (
      <div className="w-10 h-10 bg-[#1d1d20] rounded-xl flex items-center justify-center border border-border/20 shadow-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-emerald-400">
          <path d="M12 4L6 14h12L12 4z" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
          <circle cx="12" cy="10.5" r="2" fill="currentColor" fillOpacity="0.2" className="animate-pulse" />
        </svg>
      </div>
    ),
  },
]

function renderIcon(icon: TechIcon, index: string) {
  return (
    <div
      key={index}
      className={`flex items-center gap-3 transition-transform duration-300 cursor-pointer group/icon hover:scale-110 shrink-0 ${icon.hoverColor}`}
      title={icon.name}
    >
      {icon.slug ? (
        <img
          src={`/icons/${icon.slug}.svg`}
          alt={icon.name}
          className="w-10 h-10 rounded-xl object-contain select-none pointer-events-none bg-background/5"
          loading="lazy"
        />
      ) : (
        icon.customSvg
      )}
      <span className="font-mono text-sm tracking-wider text-muted-foreground group-hover/icon:text-foreground transition-colors duration-300">
        {icon.name}
      </span>
    </div>
  )
}

export default function TechTicker() {
  return (
    <div className="w-full py-8 border-y border-border/40 my-12 bg-muted/5 relative overflow-hidden group/marquee">
      <div className="flex w-full overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex gap-12 sm:gap-16 items-center py-2 shrink-0 pr-12 sm:pr-16">
          {icons.map((icon, idx) => renderIcon(icon, `t1-${idx}`))}
        </div>
        <div className="animate-marquee flex gap-12 sm:gap-16 items-center py-2 shrink-0 pr-12 sm:pr-16" aria-hidden="true">
          {icons.map((icon, idx) => renderIcon(icon, `t1c-${idx}`))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </div>
  )
}
