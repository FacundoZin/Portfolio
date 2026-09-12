import type { ReactNode } from "react"

export type CommandCategory = "navigation" | "actions" | "social" | "info"

export interface Command {
  id: string
  label: string
  description?: string
  icon: ReactNode
  category: CommandCategory
  keywords: string[]
  shortcut?: string
  action: () => void
}

export interface CommandGroup {
  category: CommandCategory
  commands: Command[]
}

export function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t.includes(q)) return true
  let qi = 0
  for (const ch of t) {
    if (ch === q[qi]) qi++
    if (qi === q.length) return true
  }
  return false
}

export function filterCommands(commands: Command[], query: string): Command[] {
  if (!query.trim()) return commands
  return commands.filter(
    (cmd) =>
      fuzzyMatch(query, cmd.label) ||
      cmd.keywords.some((kw) => fuzzyMatch(query, kw))
  )
}

export function groupCommands(commands: Command[]): CommandGroup[] {
  const groups: Record<string, Command[]> = {}
  for (const cmd of commands) {
    const key = cmd.category
    if (!groups[key]) groups[key] = []
    groups[key].push(cmd)
  }

  const order: CommandCategory[] = ["navigation", "actions", "social", "info"]

  return order
    .filter((key) => groups[key]?.length)
    .map((key) => ({ category: key, commands: groups[key] }))
}
