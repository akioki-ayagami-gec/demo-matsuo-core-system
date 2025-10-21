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
  title: "セキ株式会社 Sシステム",
  description: "セキ株式会社の統合Sシステム - 生産管理・受注管理・帳票管理",
  generator: "v0.app",
  keywords: "Sシステム,生産管理,受注管理,帳票管理,印刷業,セキ株式会社",
  authors: [{ name: "セキ株式会社" }],
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
