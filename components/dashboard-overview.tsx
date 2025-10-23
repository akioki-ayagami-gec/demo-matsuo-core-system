"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Factory,
  ShoppingCart,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Printer,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
} from "lucide-react"

export function DashboardOverview() {
  // Mock data - これらは実際のAPIから取得される予定
  const productionStats = {
    activeJobs: 12,
    completedToday: 8,
    machineUtilization: 85,
    qualityRate: 98.5,
  }

  const orderStats = {
    newOrders: 5,
    pendingOrders: 23,
    urgentOrders: 3,
    totalRevenue: "¥2,450,000",
  }

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "輪転機2号機のメンテナンス期限が近づいています",
      time: "10分前",
      details: "次回メンテナンス予定: 2024-02-01",
      action: "メンテナンス予約",
    },
    {
      id: 2,
      type: "info",
      message: "松山市役所からの新規受注が登録されました",
      time: "30分前",
      details: "受注番号: O-2024-015 | 金額: ¥450,000",
      action: "受注確認",
    },
    {
      id: 3,
      type: "urgent",
      message: "緊急案件の納期調整が必要です",
      time: "1時間前",
      details: "愛媛県庁 観光パンフレット | 納期: 2024-02-07",
      action: "納期調整",
    },
  ]

  const todaySchedule = [
    {
      time: "09:00",
      task: "印刷機1号機 - パンフレット印刷",
      status: "completed",
      operator: "佐藤花子",
      details: "企業パンフレット 2000部",
    },
    {
      time: "11:00",
      task: "輪転機2号機 - チラシ印刷",
      status: "in-progress",
      operator: "田中太郎",
      details: "販促チラシ 5000部",
    },
    { time: "14:00", task: "後加工 - 製本作業", status: "pending", operator: "鈴木一郎", details: "冊子製本 1000冊" },
    {
      time: "16:00",
      task: "品質検査 - 最終チェック",
      status: "pending",
      operator: "山田次郎",
      details: "全案件品質確認",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">おはようございます</h1>
          <p className="text-muted-foreground">本日の業務概要をご確認ください</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">最終更新</p>
          <p className="text-sm font-medium">{new Date().toLocaleTimeString("ja-JP")}</p>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <p className="font-medium text-primary">システム統合完了</p>
            <p className="text-sm text-muted-foreground">
              全モジュールが正常に稼働しています。生産管理、受注管理、帳票管理の各機能をご利用いただけます。
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">稼働中の案件</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{productionStats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">本日完了: {productionStats.completedToday}件</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新規受注</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{orderStats.newOrders}</div>
            <p className="text-xs text-muted-foreground">保留中: {orderStats.pendingOrders}件</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">機械稼働率</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{productionStats.machineUtilization}%</div>
            <Progress value={productionStats.machineUtilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">品質率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{productionStats.qualityRate}%</div>
            <p className="text-xs text-muted-foreground">目標: 98.0%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              重要な通知
            </CardTitle>
            <CardDescription>システムからの最新アラートと通知</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <Dialog key={alert.id}>
                <DialogTrigger asChild>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      {alert.type === "urgent" && <XCircle className="h-4 w-4 text-destructive" />}
                      {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>通知詳細</DialogTitle>
                    <DialogDescription>アラートの詳細情報と対応</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>通知内容</Label>
                      <p className="text-sm font-medium">{alert.message}</p>
                    </div>
                    <div>
                      <Label>詳細情報</Label>
                      <p className="text-sm text-muted-foreground">{alert.details}</p>
                    </div>
                    <div>
                      <Label>発生時刻</Label>
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        後で対応
                      </Button>
                      <Button className="flex-1">{alert.action}</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              すべての通知を表示
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              本日のスケジュール
            </CardTitle>
            <CardDescription>今日の生産予定と進捗状況</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((item, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                    <div className="flex-shrink-0">
                      <Badge
                        variant={
                          item.status === "completed"
                            ? "default"
                            : item.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status === "completed" && "完了"}
                        {item.status === "in-progress" && "進行中"}
                        {item.status === "pending" && "予定"}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>スケジュール詳細</DialogTitle>
                    <DialogDescription>作業の詳細情報と操作</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>作業内容</Label>
                        <p className="text-sm font-medium">{item.task}</p>
                      </div>
                      <div>
                        <Label>予定時刻</Label>
                        <p className="text-sm font-medium">{item.time}</p>
                      </div>
                      <div>
                        <Label>担当者</Label>
                        <p className="text-sm font-medium">{item.operator}</p>
                      </div>
                      <div>
                        <Label>ステータス</Label>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.status === "completed" && "完了"}
                          {item.status === "in-progress" && "進行中"}
                          {item.status === "pending" && "予定"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label>詳細</Label>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        時間変更
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        担当者変更
                      </Button>
                      <Button className="flex-1">作業開始</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              詳細スケジュールを表示
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            クイックアクション
          </CardTitle>
          <CardDescription>よく使用される機能への素早いアクセス</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Factory className="h-6 w-6" />
                  <span className="text-sm">日報入力</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>日報入力</DialogTitle>
                  <DialogDescription>本日の作業実績を入力してください</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quickMachine">機械名</Label>
                    <Input id="quickMachine" placeholder="輪転機1号機" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickOperator">作業者</Label>
                    <Input id="quickOperator" placeholder="田中太郎" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickHours">作業時間</Label>
                    <Input id="quickHours" type="number" placeholder="8" />
                  </div>
                  <Button className="w-full">日報保存</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-sm">新規受注</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新規受注</DialogTitle>
                  <DialogDescription>新しい受注を登録します</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quickCustomer">顧客名</Label>
                    <Input id="quickCustomer" placeholder="松山市役所" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickProject">案件名</Label>
                    <Input id="quickProject" placeholder="市政だより印刷" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickDue">納期</Label>
                    <Input id="quickDue" type="date" />
                  </div>
                  <Button className="w-full">受注登録</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">伝票発行</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>伝票発行</DialogTitle>
                  <DialogDescription>各種伝票を発行します</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quickDocType">伝票種類</Label>
                    <Input id="quickDocType" placeholder="受注伝票" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickOrderNum">受注番号</Label>
                    <Input id="quickOrderNum" placeholder="2024-001" />
                  </div>
                  <Button className="w-full">伝票発行</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">顧客管理</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>顧客管理</DialogTitle>
                  <DialogDescription>顧客情報を管理します</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quickCustomerName">顧客名</Label>
                    <Input id="quickCustomerName" placeholder="松山市役所" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickContact">担当者</Label>
                    <Input id="quickContact" placeholder="田中部長" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quickPhone">電話番号</Label>
                    <Input id="quickPhone" placeholder="089-948-6688" />
                  </div>
                  <Button className="w-full">顧客情報更新</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Revenue and Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">本日の売上</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{orderStats.totalRevenue}</div>
            <p className="text-sm text-muted-foreground">前日比 +12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">緊急案件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{orderStats.urgentOrders}</div>
            <p className="text-sm text-muted-foreground">要対応案件</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">稼働時間</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">7.5h</div>
            <p className="text-sm text-muted-foreground">本日の実働時間</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
