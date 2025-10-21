"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, Mail, Plus, Edit, Trash2, BarChart3 } from "lucide-react"

export function ReportScheduler() {
  // Mock scheduled report data
  const scheduledReports = [
    {
      id: "S001",
      name: "日次生産実績レポート",
      description: "毎日の生産実績を自動集計してレポート作成",
      schedule: "毎日 18:00",
      nextRun: "2024-01-29 18:00",
      lastRun: "2024-01-28 18:00",
      status: "active",
      recipients: ["production@seki-corp.co.jp", "manager@seki-corp.co.jp"],
      format: "PDF",
      enabled: true,
    },
    {
      id: "S002",
      name: "週次売上レポート",
      description: "週間の売上実績と前週比較レポート",
      schedule: "毎週月曜日 09:00",
      nextRun: "2024-02-05 09:00",
      lastRun: "2024-01-29 09:00",
      status: "active",
      recipients: ["sales@seki-corp.co.jp", "accounting@seki-corp.co.jp"],
      format: "PDF",
      enabled: true,
    },
    {
      id: "S003",
      name: "月次品質管理レポート",
      description: "月間の品質管理状況と改善点をまとめたレポート",
      schedule: "毎月1日 10:00",
      nextRun: "2024-02-01 10:00",
      lastRun: "2024-01-01 10:00",
      status: "active",
      recipients: ["quality@seki-corp.co.jp", "manager@seki-corp.co.jp"],
      format: "PDF",
      enabled: true,
    },
    {
      id: "S004",
      name: "顧客別受注状況レポート",
      description: "主要顧客の受注状況と売上推移レポート",
      schedule: "毎月15日 14:00",
      nextRun: "2024-02-15 14:00",
      lastRun: "2024-01-15 14:00",
      status: "active",
      recipients: ["sales@seki-corp.co.jp"],
      format: "Excel",
      enabled: false,
    },
    {
      id: "S005",
      name: "設備稼働状況レポート",
      description: "各機械の稼働率とメンテナンス状況レポート",
      schedule: "毎週金曜日 17:00",
      nextRun: "2024-02-02 17:00",
      lastRun: "2024-01-26 17:00",
      status: "active",
      recipients: ["maintenance@seki-corp.co.jp", "production@seki-corp.co.jp"],
      format: "PDF",
      enabled: true,
    },
  ]

  const getStatusBadge = (status: string, enabled: boolean) => {
    if (!enabled) {
      return <Badge variant="secondary">停止中</Badge>
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">稼働中</Badge>
      case "error":
        return <Badge variant="destructive">エラー</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getFormatBadge = (format: string) => {
    const colors = {
      PDF: "bg-red-600",
      Excel: "bg-green-600",
      CSV: "bg-blue-600",
    }
    return <Badge className={colors[format as keyof typeof colors] || "bg-gray-600"}>{format}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">定期レポート設定</h2>
          <p className="text-muted-foreground">自動生成される定期レポートの管理</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規定期レポート作成
        </Button>
      </div>

      {/* Scheduler Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総定期レポート</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledReports.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">稼働中</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{scheduledReports.filter((r) => r.enabled).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">停止中</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{scheduledReports.filter((r) => !r.enabled).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日の実行予定</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {scheduledReports.filter((r) => r.nextRun.includes("2024-01-29")).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports List */}
      <div className="space-y-4">
        {scheduledReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status, report.enabled)}
                  {getFormatBadge(report.format)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    実行スケジュール
                  </p>
                  <p className="text-sm text-muted-foreground">{report.schedule}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    次回実行予定
                  </p>
                  <p className="text-sm text-muted-foreground">{report.nextRun}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    前回実行
                  </p>
                  <p className="text-sm text-muted-foreground">{report.lastRun}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    送信先
                  </p>
                  <p className="text-sm text-muted-foreground">{report.recipients.length}件</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">送信先一覧:</p>
                <div className="flex flex-wrap gap-1">
                  {report.recipients.map((recipient, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {recipient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={report.enabled} />
                  <span className="text-sm">{report.enabled ? "有効" : "無効"}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    編集
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    今すぐ実行
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
