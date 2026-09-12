"use client"

import dynamic from "next/dynamic"

const GitHubContributions = dynamic(() =>
  import("../GitHubContributions").then((m) => m.GitHubContributions)
)
const GitHubActivity = dynamic(() =>
  import("../GitHubActivity").then((m) => m.GitHubActivity)
)
const GitHubStats = dynamic(() => import("./GitHubStats"))

interface GitHubSectionProps {
  contributionsLabel: string
  recentActivityLabel: string
}

export default function GitHubSection({ contributionsLabel, recentActivityLabel }: GitHubSectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 border border-border rounded-lg bg-muted/5 space-y-4">
        <div className="text-sm font-mono text-muted-foreground">{contributionsLabel}</div>
        <GitHubContributions username="FacundoZin" />
      </div>

      <div className="p-4 sm:p-6 border border-border rounded-lg bg-muted/5 space-y-4">
        <div className="text-sm font-mono text-muted-foreground">{recentActivityLabel}</div>
        <GitHubActivity username="FacundoZin" />
      </div>

      <GitHubStats />
    </div>
  )
}
