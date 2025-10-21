"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Mail, Eye, FileText, Calendar, User } from "lucide-react"

interface ReportHistoryProps {
  searchQuery: string
}

export function ReportHistory({ searchQuery }: ReportHistoryProps) {
  // Mock history data
  const reportHistory = [
    {
      id: "H001",
      reportName: "受注伝票",
      orderNumber: "2024-001",
      customer: "松山市役所",
      generatedBy: "営業部 田中",
      generatedAt: "2024-01-28 10:30",
      status: "completed",
      format: "PDF",
      size: "245KB",
      downloads: 3,
      emailSent: true,
    },
    {
      id: "H002",
      reportName: "作業指示書",
      orderNumber: "2024-002",
      customer: "愛媛県庁",
      generatedBy: "生産管理 佐藤",
      generatedAt: "2024-01-28 11:15",
      status: "completed",
      format: "PDF",
      size: "189KB",
      downloads: 1,
      emailSent: false,
    },
    {
      id: "H003",
      reportName: "納品書",
      orderNumber: "2024-003",
      customer: "地元企業A",
      generatedBy: "営業部 鈴木",
      generatedAt: "2024-01-28 09:45",
      status: "completed",
      format: "PDF",
      size: "156KB",
      downloads: 2,
      emailSent: true,
    },
    {
      id: "H004",
      reportName: "請求書",
      orderNumber: "2024-001",
      customer: "松山市役所",
      generatedBy: "経理部 山田",
      generatedAt: "2024-01-27 16:20",
      status: "completed",
      format: "PDF",
      size: "198KB",
      downloads: 5,
      emailSent: true,
    },
    {
      id: "H005",
      reportName: "生産実績レポート",
      orderNumber: "-",
      customer: "内部資料",
      generatedBy: "生産管理 田中",
      generatedAt: "2024-01-27 18:00",
      status: "completed",
      format: "PDF",
      size: "432KB",
      downloads: 8,
      emailSent: false,
    },
    {
      id: "H006",
      reportName: "品質検査報告書",
      orderNumber: "2024-002",
      customer: "愛媛県庁",
      generatedBy: "品質管理 高橋",
      generatedAt: "2024-01-27 14:30",
      status: "completed",
      format: "PDF",
      size: "278KB",
      downloads: 1,
      emailSent: true,
    },
  ]

  // Filter history based on search query
  const filteredHistory = reportHistory.filter(
    (report) =>
      report.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.generatedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600">完了</Badge>
      case "generating":
        return <Badge variant="secondary">作成中</Badge>
      case "failed":
        return <Badge variant="destructive">失敗</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">帳票履歴</h2>
          <p className="text-muted-foreground">
            {filteredHistory.length}件の帳票履歴が見つかりました
            {searchQuery && ` (検索: "${searchQuery}")`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>帳票作成履歴</CardTitle>
          <CardDescription>過去に作成された帳票の一覧と詳細情報</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>帳票名</TableHead>
                  <TableHead>関連情報</TableHead>
                  <TableHead>作成者</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>ファイル情報</TableHead>
                  <TableHead>配信状況</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{report.reportName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.customer}</p>
                        {report.orderNumber !== "-" && (
                          <p className="text-xs text-muted-foreground">{report.orderNumber}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <User className="h-3 w-3" />
                        <span>{report.generatedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{report.generatedAt}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{report.format}</p>
                        <p className="text-muted-foreground">{report.size}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Download className="h-3 w-3" />
                          <span>{report.downloads}回</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          <span>{report.emailSent ? "送信済み" : "未送信"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled={report.status !== "completed"}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled={report.status !== "completed"}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
