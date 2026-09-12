import type { MetadataRoute } from "next"

export const dynamic = "force-static"

// Bump this when page content meaningfully changes. Using a fixed date avoids
// telling crawlers the page changed on every crawl, which dilutes the signal.
const LAST_MODIFIED = new Date("2026-09-12")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://facundozin.vercel.app",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
