import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "株式会社松尾製作所 生産管理システムシステム",
  description: "株式会社松尾製作所の生産管理システムです。",
  generator: "v0.app",
  keywords: "生産管理,受注管理,帳票管理,株式会社松尾製作所",
  authors: [{ name: "株式会社松尾製作所" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#164e63",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="seki-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
