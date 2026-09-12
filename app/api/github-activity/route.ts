import { NextRequest, NextResponse } from "next/server"

export const revalidate = 3600

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
}

// GitHub usernames are alphanumeric plus hyphen, max 39 chars.
const GITHUB_USERNAME = /^[A-Za-z0-9-]{1,39}$/

interface GitHubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  payload: Record<string, unknown>
  created_at: string
}

export async function GET(request: NextRequest) {
  const usernameParam = request.nextUrl.searchParams.get("username")
  const username = usernameParam || "FacundoZin"

  if (!GITHUB_USERNAME.test(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 })
  }

  let res: Response
  try {
    res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: { "User-Agent": "portfolio" },
      next: { revalidate: 3600 },
    })
  } catch {
    return NextResponse.json({ error: "Upstream request failed" }, { status: 502 })
  }

  if (!res.ok) {
    // Preserve the existing contract: the client expects an array.
    return NextResponse.json([], { status: 200 })
  }

  let data: GitHubEvent[]
  try {
    const parsed = await res.json()
    data = Array.isArray(parsed) ? (parsed as GitHubEvent[]) : []
  } catch {
    return NextResponse.json([], { status: 200 })
  }

  return NextResponse.json(data, { headers: CACHE_HEADERS })
}
