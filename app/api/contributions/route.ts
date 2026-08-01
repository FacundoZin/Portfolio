import { NextRequest, NextResponse } from "next/server"

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
  const primary = await fetch(`https://ghca.duyet.net/v1/${username}?y=${yearParam}`, {
    next: { revalidate: 3600 },
  }).then((r) => (r.ok ? r.json() : null)).catch(() => null)

  if (primary?.contributions) return primary.contributions

  const fallback = await fetch(`https://octo.aayush.cv/contributions/${username}`, {
    next: { revalidate: 3600 },
  }).then((r) => (r.ok ? r.json() : null)).catch(() => null)

  return fallback?.contributions ?? null
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") || "FacundoZin"
  const year = request.nextUrl.searchParams.get("year")
  const discoverYears = request.nextUrl.searchParams.get("discoverYears")

  if (discoverYears === "true") {
    const contributions = await fetchContributions(username, "all")
    if (!contributions?.length) {
      return NextResponse.json({ availableYears: [] }, { status: 200 })
    }
    const years = new Set<number>()
    for (const d of contributions) {
      years.add(new Date(d.date + "T00:00:00Z").getUTCFullYear())
    }
    years.add(new Date().getUTCFullYear())
    return NextResponse.json({ availableYears: [...years].sort((a, b) => b - a) })
  }

  const yearParam = year || "last"
  const contributions = await fetchContributions(username, yearParam)

  if (!contributions?.length) {
    return NextResponse.json({ contributions: [], availableYears: [] }, { status: 200 })
  }

  const years = new Set<number>()
  for (const d of contributions) {
    years.add(new Date(d.date + "T00:00:00Z").getUTCFullYear())
  }
  years.add(new Date().getUTCFullYear())

  const weeks = toWeeks(contributions)

  return NextResponse.json({ contributions: weeks, availableYears: [...years].sort((a, b) => b - a) })
}
