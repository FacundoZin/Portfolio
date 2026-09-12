import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"
export const OG_ALT = "Facundo Zin - Software Engineer"

const TECHS = ["C#", ".NET", "TypeScript", "NestJS", "React", "Docker"]

/**
 * Shared social preview renderer used by both app/opengraph-image.tsx and
 * app/twitter-image.tsx. Rendered to PNG at request time by next/og, because
 * social crawlers do not support SVG previews.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 60,
            height: 3,
            background: "#40c463",
            borderRadius: 2,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
          <span style={{ fontSize: 76, color: "#ffffff", fontWeight: 300, letterSpacing: -1 }}>
            Facundo
          </span>
          <span style={{ fontSize: 76, color: "#888888", fontWeight: 300, letterSpacing: -1 }}>
            Zin
          </span>
        </div>
        <span
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "#666666",
            letterSpacing: 3,
            fontFamily: "monospace",
          }}
        >
          SOFTWARE ENGINEER
        </span>
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {TECHS.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "6px 16px",
                border: "1px solid #333333",
                borderRadius: 14,
                color: "#888888",
                fontSize: 14,
                fontFamily: "monospace",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
        <span
          style={{
            position: "absolute",
            right: 80,
            bottom: 56,
            fontSize: 16,
            color: "#444444",
            fontFamily: "monospace",
          }}
        >
          facundozin.vercel.app
        </span>
      </div>
    ),
    OG_SIZE,
  )
}
