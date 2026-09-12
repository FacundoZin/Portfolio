"use client"

import { useEffect, useState } from "react"
import { GitCommit, GitFork, Star, Plus, GitPullRequest, Bug, GitBranch, ExternalLink } from "lucide-react"
import { useLanguage } from "../lib/language-context"
import type { ActivityDictionary } from "../lib/i18n"

interface GitHubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  payload: Record<string, unknown>
  created_at: string
}

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`))
}

function timeAgo(date: string, a: ActivityDictionary): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return a.justNow
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return fill(a.minutesAgo, { count: minutes })
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return fill(a.hoursAgo, { count: hours })
  const days = Math.floor(hours / 24)
  if (days < 30) return fill(a.daysAgo, { count: days })
  const months = Math.floor(days / 30)
  if (months < 12) return fill(months === 1 ? a.monthAgo : a.monthsAgo, { count: months })
  const years = Math.floor(months / 12)
  return fill(years === 1 ? a.yearAgo : a.yearsAgo, { count: years })
}

function isNoise(event: GitHubEvent, username: string): boolean {
  const ownRepo = event.repo.name.startsWith(`${username}/`)
  const payload = event.payload

  if (event.type === "PushEvent") {
    const commits = (payload.commits as unknown[] | undefined) ?? []
    return commits.length === 0
  }

  if (event.type === "CreateEvent" && ownRepo) {
    const refType = payload.ref_type as string
    const ref = payload.ref as string
    if (refType === "branch" && (ref === "master" || ref === "main")) return true
  }

  return false
}

function describeEvent(event: GitHubEvent, a: ActivityDictionary): { icon: React.ReactNode; desc: string } {
  const repoShort = event.repo.name
  const payload = event.payload

  switch (event.type) {
    case "PushEvent": {
      const count = (payload.commits as unknown[] | undefined)?.length ?? 0
      return {
        icon: <GitCommit className="w-3.5 h-3.5" />,
        desc: fill(count === 1 ? a.pushedCommit : a.pushedCommits, { count, repo: repoShort }),
      }
    }
    case "CreateEvent": {
      const refType = (payload.ref_type as string) ?? "unknown"
      const ref = (payload.ref as string) ?? ""
      const refTypeLabel = a.refTypes[refType as keyof typeof a.refTypes] ?? refType
      return {
        icon: <Plus className="w-3.5 h-3.5" />,
        desc: ref
          ? fill(a.createdWithRef, { refType: refTypeLabel, ref, repo: repoShort })
          : fill(a.createdWithoutRef, { refType: refTypeLabel, repo: repoShort }),
      }
    }
    case "ForkEvent":
      return {
        icon: <GitFork className="w-3.5 h-3.5" />,
        desc: fill(a.forked, { repo: repoShort }),
      }
    case "WatchEvent":
      return {
        icon: <Star className="w-3.5 h-3.5" />,
        desc: fill(a.starred, { repo: repoShort }),
      }
    case "PullRequestEvent": {
      const action = (payload.action as string) ?? ""
      const actionLabel = (a.actions as Record<string, string>)[action] ?? action
      const prNumber = (payload.number as number) ?? (payload.pull_request as Record<string, unknown> | undefined)?.number
      return {
        icon: <GitPullRequest className="w-3.5 h-3.5" />,
        desc: prNumber
          ? fill(a.pullRequest, { action: actionLabel, number: prNumber, repo: repoShort })
          : fill(a.pullRequestNoNumber, { action: actionLabel, repo: repoShort }),
      }
    }
    case "IssuesEvent": {
      const action = (payload.action as string) ?? ""
      const actionLabel = (a.actions as Record<string, string>)[action] ?? action
      const issueNumber = (payload.number as number) ?? (payload.issue as Record<string, unknown> | undefined)?.number
      return {
        icon: <Bug className="w-3.5 h-3.5" />,
        desc: issueNumber
          ? fill(a.issue, { action: actionLabel, number: issueNumber, repo: repoShort })
          : fill(a.issueNoNumber, { action: actionLabel, repo: repoShort }),
      }
    }
    default:
      return {
        icon: <GitBranch className="w-3.5 h-3.5" />,
        desc: fill(a.fallback, { type: event.type.replace("Event", ""), repo: repoShort }),
      }
  }
}

export function GitHubActivity({ username }: { username: string }) {
  const { dict } = useLanguage()
  const activity = dict.activity
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/github-activity?username=${username}`)
      .then<GitHubEvent[]>((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setEvents([])
          setLoading(false)
          return
        }

        const filtered = data.filter((e) => !isNoise(e, username)).slice(0, 8)
        setEvents(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [username])

  if (loading) {
    return (
      <div className="h-[100px] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
      </div>
    )
  }

  if (!events.length) return null

  return (
    <div className="space-y-3">
      {events.map((event) => {
        const { icon, desc } = describeEvent(event, activity)
        const repoUrl = `https://github.com/${event.repo.name}`
        return (
          <a
            key={event.id}
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 py-2 border-b border-border/30 last:border-0 hover:border-border/60 transition-colors duration-300"
          >
            <div className="mt-0.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-300 shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 truncate">
                {desc}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-muted-foreground font-mono">{timeAgo(event.created_at, activity)}</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors duration-300" />
            </div>
          </a>
        )
      })}
    </div>
  )
}
