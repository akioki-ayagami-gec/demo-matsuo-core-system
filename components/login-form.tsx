"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, User, Lock, Sun, Moon } from "lucide-react"
import Image from "next/image"

function LoginThemeToggle() {
  const [theme, setTheme] = useState<string>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 初期テーマを確認
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setTheme(currentTheme)
    console.log("[v0] Login theme initialized:", currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    console.log("[v0] Login switching theme from", theme, "to", newTheme)

    // HTMLクラスを直接操作
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    setTheme(newTheme)

    // 変更後の確認
    setTimeout(() => {
      const actualTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
      console.log("[v0] Login theme after change:", actualTheme)
    }, 100)
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-background/80 backdrop-blur-sm border-border/50"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement authentication logic
    console.log("Login attempt:", { username, password })
    // Redirect to dashboard after successful login
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <LoginThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-xl border-border/50 glass-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/images/seki-logo-login.png"
              alt="セキ株式会社"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Sシステム</CardTitle>
            <CardDescription className="text-muted-foreground">セキ株式会社 統合管理システム</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                ユーザー名
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="ユーザー名を入力"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                パスワード
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワードを入力"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-border/50"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              ログイン
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>システムに関するお問い合わせは</p>
            <p>システム管理者までご連絡ください</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
