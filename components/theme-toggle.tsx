"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      console.log("[v0] Current theme:", theme)
      console.log("[v0] Resolved theme:", resolvedTheme)
    }
  }, [mounted, theme, resolvedTheme])

  if (!mounted) {
    return null
  }

  const handleThemeToggle = () => {
    const currentTheme = resolvedTheme || theme || "light"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    console.log("[v0] Switching theme from", currentTheme, "to", newTheme)

    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)

    setTheme(newTheme)

    setTimeout(() => {
      console.log("[v0] Theme after change:", theme, "Resolved:", resolvedTheme)
      if (!document.documentElement.classList.contains(newTheme)) {
        document.documentElement.classList.add(newTheme)
      }
    }, 100)
  }

  const currentTheme = resolvedTheme || theme || "light"
  const isDark = currentTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeToggle}
      className="h-9 w-9 rounded-lg bg-card/50 hover:bg-card/80 backdrop-blur-sm border border-border/30"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">テーマ切り替え</span>
    </Button>
  )
}
