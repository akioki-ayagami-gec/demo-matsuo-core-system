"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Edit, Copy, Printer, BarChart3, Receipt, Package } from "lucide-react"

interface DocumentTemplatesProps {
  searchQuery: string
}

export function DocumentTemplates({ searchQuery }: DocumentTemplatesProps) {
  // Mock template data
  const templates = [
    {
      id: "T001",
      name: "受注伝票",
      category: "受注関連",
      description: "顧客からの受注内容を記録する伝票",
      icon: FileText,
      lastModified: "2024-01-20",
      usageCount: 156,
      status: "active",
      fields: ["受注番号", "顧客名", "商品名", "数量", "単価", "合計金額", "納期"],
    },
    {
      id: "T002",
      name: "作業指示書",
      category: "生産関連",
      description: "生産現場への作業指示を記載する書類",
      icon: Printer,
      lastModified: "2024-01-18",
      usageCount: 134,
      status: "active",
      fields: ["指示番号", "機械名", "作業者", "商品仕様", "数量", "開始予定", "完了予定"],
    },
    {
      id: "T003",
      name: "納品書",
      category: "出荷関連",
      description: "商品納品時に発行する書類",
      icon: Package,
      lastModified: "2024-01-22",
      usageCount: 98,
      status: "active",
      fields: ["納品書番号", "納品日", "顧客名", "商品名", "数量", "単価", "合計金額"],
    },
    {
      id: "T004",
      name: "請求書",
      category: "経理関連",
      description: "顧客への請求書",
      icon: Receipt,
      lastModified: "2024-01-25",
      usageCount: 87,
      status: "active",
      fields: ["請求書番号", "請求日", "支払期限", "顧客名", "商品明細", "小計", "消費税", "合計"],
    },
    {
      id: "T005",
      name: "生産実績レポート",
      category: "管理レポート",
      description: "日次・月次の生産実績をまとめたレポート",
      icon: BarChart3,
      lastModified: "2024-01-15",
      usageCount: 45,
      status: "active",
      fields: ["期間", "機械別実績", "品質率", "稼働時間", "完了案件数", "売上金額"],
    },
    {
      id: "T006",
      name: "品質検査報告書",
      category: "品質管理",
      description: "品質検査の結果を記録する報告書",
      icon: FileText,
      lastModified: "2024-01-10",
      usageCount: 67,
      status: "active",
      fields: ["検査番号", "検査日", "検査者", "商品名", "検査項目", "合否判定", "備考"],
    },
  ]

  // Filter templates based on search query
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryBadge = (category: string) => {
    const colors = {
      受注関連: "bg-blue-600",
      生産関連: "bg-green-600",
      出荷関連: "bg-purple-600",
      経理関連: "bg-orange-600",
      管理レポート: "bg-red-600",
      品質管理: "bg-gray-600",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-600"}>{category}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">帳票テンプレート</h2>
          <p className="text-muted-foreground">
            {filteredTemplates.length}件のテンプレートが見つかりました
            {searchQuery && ` (検索: "${searchQuery}")`}
          </p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          新規テンプレート作成
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">{getCategoryBadge(template.category)}</div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>最終更新: {template.lastModified}</p>
                  <p>使用回数: {template.usageCount}回</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">含まれる項目:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.fields.slice(0, 4).map((field, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                    {template.fields.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.fields.length - 4}項目
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    作成
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
