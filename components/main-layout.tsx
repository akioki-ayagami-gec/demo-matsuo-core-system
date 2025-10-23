"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Factory,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  X,
  GitBranch,
  Package,
  Truck,
  History,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface MainLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

const navigationItems = [
  { name: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard, color: "text-blue-500" },
  { name: "ワークフロー管理", href: "/workflow", icon: GitBranch, color: "text-purple-500" },
  { name: "生産管理", href: "/production", icon: Factory, color: "text-orange-500" },
  { name: "受注管理", href: "/orders", icon: ShoppingCart, color: "text-green-500" },
  { name: "日報管理", href: "/daily-reports", icon: Calendar, color: "text-teal-500" },
  { name: "資材・調達管理", href: "/materials", icon: Package, color: "text-yellow-500" },
  { name: "外注・製品管理", href: "/outsourcing", icon: Truck, color: "text-indigo-500" },
  { name: "物流・自動化", href: "/logistics", icon: Truck, color: "text-cyan-500" },
  { name: "帳票管理", href: "/reports", icon: FileText, color: "text-pink-500" },
  { name: "操作履歴・添付", href: "/audit", icon: History, color: "text-red-500" },
  { name: "設定", href: "/settings", icon: Settings, color: "text-gray-500" },
]

export function MainLayout({ children, currentPage }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // TODO: Implement logout logic
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="fixed inset-y-0 left-0 z-50 w-64 glass-card border-r border-border/50">
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-center p-6 border-b border-sidebar-border/30">
            <div className="flex items-center justify-center">
              <Image
                src="https://kk-matsuo-ss.co.jp/wp-corp/wp-content/uploads/2023/05/img-matsuo.jpg"
                alt="株式会社松尾製作所"
                width={240}
                height={30}
                className="object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden absolute right-4"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation with scroll functionality */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.name
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-lg"
                        : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground hover:shadow-md backdrop-blur-sm"
                        }`}
                    >
                      {/* Icon with color applied */}
                      <Icon className={`h-5 w-5 ${isActive ? "" : item.color}`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-sidebar-border/30">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive rounded-xl py-3 transition-all duration-200"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3 text-red-500" />
              <span className="font-medium">ログアウト</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <header className="sticky top-0 z-30 glass-card border-b border-border/50 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="px-6 py-3 bg-card/50 rounded-lg border border-border/30">
                <h2 className="text-2xl font-bold text-foreground">{currentPage || "ダッシュボード"}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                {new Date().toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
