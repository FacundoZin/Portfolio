"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface DayData {
  date: string
  contributionCount: number
  color: string
  contributionLevel: string
}

interface ApiResponse {
  contributions: DayData[][]
  availableYears: number[]
}

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const LIGHT_CELLS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
const DARK_CELLS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CELL = 11
const GAP = 2

export function GitHubContributions({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<DayData[][]>([])
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ username })
    if (selectedYear) params.set("year", String(selectedYear))

    fetch(`/api/contributions?${params}`)
      .then<ApiResponse>((r) => r.json())
      .then((data) => {
        setWeeks(data.contributions ?? [])
        if (data.availableYears?.length) {
          setAvailableYears((prev) => {
            const merged = new Set([...prev, ...data.availableYears])
            return [...merged].sort((a, b) => b - a)
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))

    fetch(`/api/contributions?username=${username}&discoverYears=true`)
      .then((r) => r.json())
      .then((data) => {
        if (data.availableYears?.length) {
          setAvailableYears((prev) => {
            const merged = new Set([...prev, ...data.availableYears])
            return [...merged].sort((a, b) => b - a)
          })
        }
      })
      .catch(() => {})
  }, [username, selectedYear])

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    setYearDropdownOpen(false)
  }

  const totalContributions = weeks.reduce(
    (sum, week) => sum + week.reduce((s, day) => s + day.contributionCount, 0),
    0
  )

  const cells = isDark ? DARK_CELLS : LIGHT_CELLS

  if (loading) {
    return (
      <div className="h-[130px] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
      </div>
    )
  }

  if (!weeks.length) return null

  const monthLabels: { index: number; label: string }[] = []
  let prevMonth = -1
  weeks.forEach((week, wi) => {
    const realDay = week.find((d) => d.date)
    if (realDay) {
      const m = new Date(realDay.date).getMonth()
      if (m !== prevMonth) {
        monthLabels.push({ index: wi, label: MONTHS[m] })
        prevMonth = m
      }
    }
  })

  const yearsToShow = availableYears.length ? availableYears : [new Date().getFullYear()]

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          {totalContributions.toLocaleString()} contributions in {selectedYear ? selectedYear : "the last year"}
        </span>

        <div className="relative">
          <button
            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-muted-foreground bg-transparent border border-border rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
          >
            {selectedYear ?? "Last year"}
            <svg width="8" height="8" viewBox="0 0 8 8" className={`transition-transform ${yearDropdownOpen ? "rotate-180" : ""}`}>
              <path d="M0 2 L4 6 L8 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {yearDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setYearDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[80px] py-1 bg-popover border border-border rounded-md shadow-md">
                {yearsToShow.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`w-full px-3 py-1 text-left text-xs hover:bg-accent transition-colors cursor-pointer ${
                      year === selectedYear ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-2 sm:pb-0 max-w-full">
        <div className="inline-flex">
          <div
            className="flex flex-col shrink-0 text-[10px] text-muted-foreground/60 leading-none select-none"
            style={{ gap: GAP, paddingTop: 20, paddingRight: 4 }}
          >
            {DAY_LABELS.map((label, i) => (
              <div key={i} style={{ height: CELL }} className="flex items-center">
                {label && <span>{label}</span>}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex" style={{ gap: GAP, height: 20, marginBottom: 2 }}>
              {weeks.map((week, wi) => {
                const label = monthLabels.find((m) => m.index === wi)
                return (
                  <div key={wi} style={{ width: CELL }} className="flex items-end text-[10px] text-muted-foreground/60 leading-none select-none">
                    {label && <span>{label.label}</span>}
                  </div>
                )
              })}
            </div>

            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="relative"
                      onMouseEnter={(e) => {
                        if (!day.date) return
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                        const text = `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${new Date(day.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}`
                        setTooltip({
                          x: Math.min(Math.max(rect.left + rect.width / 2, 100), window.innerWidth - 100),
                          y: rect.top - 8,
                          text,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div
                        className="rounded-[2px]"
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: day.contributionLevel && LEVEL_MAP[day.contributionLevel] !== undefined
                            ? cells[LEVEL_MAP[day.contributionLevel]]
                            : undefined,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-muted-foreground/60 select-none">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="rounded-[2px]"
            style={{ width: 10, height: 10, backgroundColor: cells[level] }}
          />
        ))}
        <span>More</span>
      </div>

      {tooltip && createPortal(
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs whitespace-nowrap pointer-events-none shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.text}
        </div>,
        document.body
      )}
    </div>
  )
}
