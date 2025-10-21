"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, ClipboardCheck, BarChart3 } from "lucide-react"

export function QualityControl() {
  // Mock quality data
  const qualityStats = {
    totalInspections: 45,
    passedInspections: 42,
    failedInspections: 2,
    pendingInspections: 1,
    qualityRate: 93.3,
  }

  const inspectionResults = [
    {
      id: "Q001",
      jobId: "J001",
      title: "松山市役所 広報誌印刷",
      inspector: "品質管理部 田中",
      status: "passed",
      score: 98,
      timestamp: "10:30",
      issues: [],
    },
    {
      id: "Q002",
      jobId: "J002",
      title: "企業パンフレット印刷",
      inspector: "品質管理部 佐藤",
      status: "failed",
      score: 75,
      timestamp: "11:15",
      issues: ["色合いの調整が必要", "印刷位置のずれ"],
    },
    {
      id: "Q003",
      jobId: "J003",
      title: "チラシ印刷 1000部",
      inspector: "品質管理部 鈴木",
      status: "pending",
      score: null,
      timestamp: "12:00",
      issues: [],
    },
  ]

  const checklistItems = [
    { item: "印刷品質", status: "completed" },
    { item: "色合い確認", status: "completed" },
    { item: "サイズ・位置", status: "completed" },
    { item: "紙質・厚み", status: "in-progress" },
    { item: "最終検査", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">品質管理</h2>
          <p className="text-muted-foreground">工程内検査と品質管理記録</p>
        </div>
        <Button>
          <ClipboardCheck className="h-4 w-4 mr-2" />
          新規検査
        </Button>
      </div>

      {/* Quality Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総検査数</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualityStats.totalInspections}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">合格</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{qualityStats.passedInspections}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">不合格</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{qualityStats.failedInspections}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">検査待ち</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{qualityStats.pendingInspections}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">品質率</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{qualityStats.qualityRate}%</div>
            <Progress value={qualityStats.qualityRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inspection Results */}
        <Card>
          <CardHeader>
            <CardTitle>検査結果</CardTitle>
            <CardDescription>最新の品質検査結果</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inspectionResults.map((result) => (
              <div key={result.id} className="p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{result.jobId}</Badge>
                    <Badge
                      variant={
                        result.status === "passed"
                          ? "default"
                          : result.status === "failed"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {result.status === "passed" && "合格"}
                      {result.status === "failed" && "不合格"}
                      {result.status === "pending" && "検査中"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{result.timestamp}</div>
                </div>
                <h4 className="font-medium mb-1">{result.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">検査者: {result.inspector}</p>
                {result.score && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">品質スコア:</span>
                    <span className="font-medium">{result.score}点</span>
                    <Progress value={result.score} className="flex-1 h-2" />
                  </div>
                )}
                {result.issues.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-destructive">指摘事項:</p>
                    {result.issues.map((issue, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        • {issue}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quality Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>品質チェックリスト</CardTitle>
            <CardDescription>標準検査項目の進捗状況</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex-shrink-0">
                  {item.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {item.status === "in-progress" && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                  {item.status === "pending" && (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.item}</p>
                </div>
                <Badge
                  variant={
                    item.status === "completed" ? "default" : item.status === "in-progress" ? "secondary" : "outline"
                  }
                >
                  {item.status === "completed" && "完了"}
                  {item.status === "in-progress" && "進行中"}
                  {item.status === "pending" && "待機"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
