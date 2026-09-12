import { NextRequest, NextResponse } from "next/server"

export const revalidate = 3600

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
}

// GitHub usernames are alphanumeric plus hyphen, max 39 chars.
const GITHUB_USERNAME = /^[A-Za-z0-9-]{1,39}$/

const LEVEL_MAP: Record<number, string> = {
  0: "NONE",
  1: "FIRST_QUARTILE",
  2: "SECOND_QUARTILE",
  3: "THIRD_QUARTILE",
  4: "FOURTH_QUARTILE",
}

interface FlatDay {
  date: string
  count: number
  level: number
}

interface ContributionsPayload {
  contributions?: FlatDay[]
}

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: CACHE_HEADERS })
}

// Fetches and parses JSON defensively: network errors, non-ok responses and
// non-JSON bodies all resolve to null instead of throwing.
async function fetchJson<T>(
  url: string,
  init?: Parameters<typeof fetch>[1],
): Promise<T | null> {
  try {
    const res = await fetch(url, init)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

function toWeeks(contributions: FlatDay[]) {
  const byDate = new Map<string, FlatDay>()
  for (const d of contributions) byDate.set(d.date, d)

  const sorted = [...byDate.keys()].sort()
  const first = new Date(sorted[0] + "T00:00:00Z")
  const last = new Date(sorted[sorted.length - 1] + "T00:00:00Z")

  const start = new Date(first)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())

  const end = new Date(last)
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()))

  const weeks: { date: string; contributionCount: number; contributionLevel: string }[][] = []
  const cursor = new Date(start)

  while (cursor <= end) {
    const week: { date: string; contributionCount: number; contributionLevel: string }[] = []
    for (let day = 0; day < 7; day++) {
      const iso = cursor.toISOString().slice(0, 10)
      const found = byDate.get(iso)
      if (found) {
        week.push({
          date: iso,
          contributionCount: found.count,
          contributionLevel: LEVEL_MAP[found.level] ?? "NONE",
        })
      } else {
        week.push({ date: "", contributionCount: 0, contributionLevel: "NONE" })
      }
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

async function fetchContributions(username: string, yearParam: string): Promise<FlatDay[] | null> {
  const primary = await fetchJson<ContributionsPayload>(
    `https://ghca.duyet.net/v1/${username}?y=${yearParam}`,
    { next: { revalidate: 3600 } },
  )

  if (primary?.contributions) return primary.contributions

  const fallback = await fetchJson<ContributionsPayload>(
    `https://octo.aayush.cv/contributions/${username}`,
    { next: { revalidate: 3600 } },
  )

  return fallback?.contributions ?? null
}

export async function GET(request: NextRequest) {
  const usernameParam = request.nextUrl.searchParams.get("username")
  const username = usernameParam || "FacundoZin"

  if (!GITHUB_USERNAME.test(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 })
  }

  const year = request.nextUrl.searchParams.get("year")
  const discoverYears = request.nextUrl.searchParams.get("discoverYears")

  if (discoverYears === "true") {
    const contributions = await fetchContributions(username, "all")
    if (!contributions?.length) {
      return jsonResponse({ availableYears: [] })
    }
    const years = new Set<number>()
    for (const d of contributions) {
      years.add(new Date(d.date + "T00:00:00Z").getUTCFullYear())
    }
    years.add(new Date().getUTCFullYear())
    return jsonResponse({ availableYears: [...years].sort((a, b) => b - a) })
  }

  const yearParam = year || "last"
  const contributions = await fetchContributions(username, yearParam)

  if (!contributions?.length) {
    return jsonResponse({ contributions: [], availableYears: [] })
  }

  const years = new Set<number>()
  for (const d of contributions) {
    years.add(new Date(d.date + "T00:00:00Z").getUTCFullYear())
  }
  years.add(new Date().getUTCFullYear())

  const weeks = toWeeks(contributions)

  return jsonResponse({ contributions: weeks, availableYears: [...years].sort((a, b) => b - a) })
}
