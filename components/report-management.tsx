"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Mail,
  Search,
  Plus,
  Calendar,
  BarChart3,
  Printer,
  Filter,
  Archive,
  Clock,
} from "lucide-react"
import { DocumentTemplates } from "@/components/document-templates"
import { ReportHistory } from "@/components/report-history"
import { ReportScheduler } from "@/components/report-scheduler"
import { DollarSign, FileEdit } from "lucide-react" // Import DollarSign and FileEdit

export function ReportManagement() {
  const [activeTab, setActiveTab] = useState("templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false)

  // Mock data for report overview
  const reportStats = {
    totalReports: 342,
    generatedToday: 15,
    scheduledReports: 8,
    pendingReports: 3,
    totalDownloads: 1250,
  }

  const recentReports = [
    {
      id: "R001",
      name: "受注伝票",
      orderNumber: "2024-001",
      customer: "松山市役所",
      generatedAt: "2024-01-28 10:30",
      status: "completed",
      format: "PDF",
      size: "245KB",
      generatedBy: "田中太郎",
      downloadCount: 3,
    },
    {
      id: "R002",
      name: "作業指示書",
      orderNumber: "2024-002",
      customer: "愛媛県庁",
      generatedAt: "2024-01-28 11:15",
      status: "completed",
      format: "PDF",
      size: "189KB",
      generatedBy: "佐藤花子",
      downloadCount: 1,
    },
    {
      id: "R003",
      name: "生産実績レポート",
      orderNumber: "-",
      customer: "内部資料",
      generatedAt: "2024-01-28 12:00",
      status: "generating",
      format: "PDF",
      size: "-",
      generatedBy: "システム自動",
      downloadCount: 0,
    },
    {
      id: "R004",
      name: "日報集計表",
      orderNumber: "DR-2024-001",
      customer: "内部資料",
      generatedAt: "2024-01-28 13:00",
      status: "completed",
      format: "Excel",
      size: "156KB",
      generatedBy: "システム自動",
      downloadCount: 5,
    },
    {
      id: "R005",
      name: "紙器CZ OCR日報",
      orderNumber: "OCR-2024-001",
      customer: "内部資料",
      generatedAt: "2024-01-28 14:30",
      status: "completed",
      format: "PDF",
      size: "298KB",
      generatedBy: "田中太郎",
      downloadCount: 2,
    },
    {
      id: "R006",
      name: "営業承認伝票",
      orderNumber: "S-2024-001",
      customer: "株式会社ABC",
      generatedAt: "2024-01-28 15:45",
      status: "completed",
      format: "PDF",
      size: "178KB",
      generatedBy: "佐藤花子",
      downloadCount: 1,
    },
  ]

  const quickActions = [
    { name: "受注伝票", icon: FileText, description: "新規受注の伝票を作成", category: "order" },
    { name: "作業指示書", icon: Printer, description: "生産指示書を作成", category: "production" },
    { name: "納品書", icon: FileText, description: "納品書を作成", category: "delivery" },
    { name: "請求書", icon: FileText, description: "請求書を作成", category: "invoice" },
    { name: "生産実績", icon: BarChart3, description: "生産実績レポートを作成", category: "production" },
    { name: "月次レポート", icon: Calendar, description: "月次集計レポートを作成", category: "report" },
    { name: "日報集計表", icon: BarChart3, description: "日報の集計表を作成", category: "daily-report" },
    { name: "作業伝票検索", icon: Search, description: "作業伝票を検索・出力", category: "search" },
    { name: "営業承認伝票", icon: FileText, description: "営業承認用伝票を作成", category: "sales" },
    { name: "下請伝票", icon: FileText, description: "下請業者向け伝票を作成", category: "subcontract" },
    { name: "売上処理表", icon: DollarSign, description: "売上処理レポートを作成", category: "sales" },
    { name: "仕様変更指示書", icon: FileEdit, description: "仕様変更指示書を作成", category: "change" },
  ]

  const integratedSearchCategories = [
    { value: "all", label: "すべて" },
    { value: "daily-reports", label: "日報関連" },
    { value: "production-orders", label: "生産管理" },
    { value: "sales-orders", label: "営業管理" },
    { value: "materials", label: "資材管理" },
    { value: "logistics", label: "物流管理" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">各種帳票の作成・管理・出力・統合検索</p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新規帳票作成
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>新規帳票作成</DialogTitle>
                <DialogDescription>作成する帳票の種類を選択してください</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">帳票種類</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="帳票を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">受注伝票</SelectItem>
                      <SelectItem value="work">作業指示書</SelectItem>
                      <SelectItem value="delivery">納品書</SelectItem>
                      <SelectItem value="invoice">請求書</SelectItem>
                      <SelectItem value="production">生産実績</SelectItem>
                      <SelectItem value="daily-report">日報集計表</SelectItem>
                      <SelectItem value="sales-approval">営業承認伝票</SelectItem>
                      <SelectItem value="subcontract">下請伝票</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">受注番号</Label>
                  <Input id="orderNumber" placeholder="2024-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">顧客名</Label>
                  <Input id="customer" placeholder="松山市役所" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">出力形式</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">帳票作成</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                定期レポート設定
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>定期レポート設定</DialogTitle>
                <DialogDescription>自動生成するレポートの設定を行います</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">レポート名</Label>
                  <Input id="reportName" placeholder="月次生産実績レポート" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">生成頻度</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="頻度を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">毎日</SelectItem>
                      <SelectItem value="weekly">毎週</SelectItem>
                      <SelectItem value="monthly">毎月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">生成時刻</Label>
                  <Input id="time" type="time" defaultValue="09:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients">送信先</Label>
                  <Input id="recipients" placeholder="manager@seki-corp.co.jp" />
                </div>
                <Button className="w-full">設定保存</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総帳票数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.totalReports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日作成</CardTitle>
            <Plus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{reportStats.generatedToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">定期レポート</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{reportStats.scheduledReports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">処理待ち</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{reportStats.pendingReports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総DL数</CardTitle>
            <Download className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{reportStats.totalDownloads}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            統合検索機能
          </CardTitle>
          <CardDescription>日報、受注管理、生産管理など全システムの帳票を横断検索</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="案件ID、顧客名、作業者名、機械名などで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {integratedSearchCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={advancedSearchOpen} onOpenChange={setAdvancedSearchOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    詳細検索
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>詳細検索</DialogTitle>
                    <DialogDescription>複数の条件を組み合わせて検索できます</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>期間（開始）</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>期間（終了）</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>システム</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="システムを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべて</SelectItem>
                          <SelectItem value="daily-reports">日報管理</SelectItem>
                          <SelectItem value="production">生産管理</SelectItem>
                          <SelectItem value="sales">営業管理</SelectItem>
                          <SelectItem value="materials">資材管理</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>ステータス</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="ステータスを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべて</SelectItem>
                          <SelectItem value="completed">完了</SelectItem>
                          <SelectItem value="in-progress">進行中</SelectItem>
                          <SelectItem value="pending">待機中</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>作成者</Label>
                      <Input placeholder="作成者名" />
                    </div>
                    <div className="space-y-2">
                      <Label>機械名</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="機械を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべて</SelectItem>
                          <SelectItem value="rotary-a">輪転機A</SelectItem>
                          <SelectItem value="rotary-b">輪転機B</SelectItem>
                          <SelectItem value="rotary-c">輪転機C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setAdvancedSearchOpen(false)}>
                      キャンセル
                    </Button>
                    <Button onClick={() => setAdvancedSearchOpen(false)}>検索実行</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            クイック帳票作成
          </CardTitle>
          <CardDescription>よく使用される帳票をワンクリックで作成</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Dialog key={action.name}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent hover:bg-primary/5">
                      <Icon className="h-6 w-6" />
                      <span className="text-sm">{action.name}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{action.name}作成</DialogTitle>
                      <DialogDescription>{action.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="quickOrderNumber">受注番号</Label>
                        <Input id="quickOrderNumber" placeholder="2024-001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quickCustomer">顧客名</Label>
                        <Input id="quickCustomer" placeholder="松山市役所" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quickDate">作成日</Label>
                        <Input id="quickDate" type="date" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          プレビュー
                        </Button>
                        <Button className="flex-1">作成</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            最近の帳票
          </CardTitle>
          <CardDescription>最近作成された帳票の一覧（全システム統合）</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <Dialog key={report.id}>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border cursor-pointer hover:bg-muted/70 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{report.customer}</span>
                          {report.orderNumber !== "-" && (
                            <>
                              <span>•</span>
                              <span>{report.orderNumber}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{report.generatedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <Badge
                          variant={
                            report.status === "completed"
                              ? "default"
                              : report.status === "generating"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {report.status === "completed" && "完了"}
                          {report.status === "generating" && "作成中"}
                          {report.status === "pending" && "待機中"}
                        </Badge>
                        <p className="text-muted-foreground">
                          {report.format} • {report.size}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>帳票詳細: {report.id}</DialogTitle>
                    <DialogDescription>帳票の詳細情報と操作</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>帳票名</Label>
                        <p className="text-sm font-medium">{report.name}</p>
                      </div>
                      <div>
                        <Label>受注番号</Label>
                        <p className="text-sm font-medium">{report.orderNumber}</p>
                      </div>
                      <div>
                        <Label>顧客名</Label>
                        <p className="text-sm font-medium">{report.customer}</p>
                      </div>
                      <div>
                        <Label>作成者</Label>
                        <p className="text-sm font-medium">{report.generatedBy}</p>
                      </div>
                      <div>
                        <Label>作成日時</Label>
                        <p className="text-sm font-medium">{report.generatedAt}</p>
                      </div>
                      <div>
                        <Label>ファイル形式</Label>
                        <p className="text-sm font-medium">{report.format}</p>
                      </div>
                      <div>
                        <Label>ファイルサイズ</Label>
                        <p className="text-sm font-medium">{report.size}</p>
                      </div>
                      <div>
                        <Label>ダウンロード回数</Label>
                        <p className="text-sm font-medium">{report.downloadCount}回</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled={report.status !== "completed"}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        ダウンロード
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled={report.status !== "completed"}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        メール送信
                      </Button>
                      <Button className="flex-1">再作成</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="帳票名、顧客名、受注番号で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Archive className="h-4 w-4 mr-2" />
          アーカイブ検索
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">帳票テンプレート</TabsTrigger>
          <TabsTrigger value="history">帳票履歴</TabsTrigger>
          <TabsTrigger value="scheduler">定期レポート</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <DocumentTemplates searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="history">
          <ReportHistory searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="scheduler">
          <ReportScheduler />
        </TabsContent>
      </Tabs>
    </div>
  )
}
