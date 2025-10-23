"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Factory, Calendar, ClipboardCheck, Settings, Play, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react"
import { ProductionScheduler } from "@/components/production-scheduler"
import { QualityControl } from "@/components/quality-control"
import { MachineStatus } from "@/components/machine-status"

export function ProductionManagement() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for production overview
  const productionOverview = {
    totalJobs: 15,
    activeJobs: 8,
    completedJobs: 7,
    delayedJobs: 2,
    overallProgress: 73,
  }

  const machineStatus = [
    {
      id: 1,
      name: "CNCばね成形機A",
      status: "running",
      progress: 85,
      operator: "田中太郎",
      job: "トヨタ向け圧縮ばね加工",
      startTime: "08:00",
      estimatedEnd: "12:00",
    },
    {
      id: 2,
      name: "プレス機1号機",
      status: "maintenance",
      progress: 0,
      operator: "-",
      job: "定期メンテナンス中",
      startTime: "-",
      estimatedEnd: "15:00",
    },
    {
      id: 3,
      name: "ばね巻き機B",
      status: "running",
      progress: 45,
      operator: "佐藤花子",
      job: "引張ばね製造",
      startTime: "09:30",
      estimatedEnd: "16:00",
    },
    {
      id: 4,
      name: "深絞りプレス機",
      status: "idle",
      progress: 0,
      operator: "-",
      job: "待機中",
      startTime: "-",
      estimatedEnd: "-",
    },
    {
      id: 5,
      name: "組立・検査ライン",
      status: "running",
      progress: 92,
      operator: "鈴木一郎",
      job: "温度センサー組立作業",
      startTime: "10:00",
      estimatedEnd: "14:00",
    },
  ]

  const todayJobs = [
    {
      id: "J001",
      title: "トヨタ向け圧縮ばね製造",
      machine: "CNCばね成形機A",
      status: "in-progress",
      progress: 85,
      startTime: "08:00",
      estimatedEnd: "12:00",
      priority: "high",
      operator: "田中太郎",
      quantity: "5000個",
      paperType: "ピアノ線 SWP-A φ3.0",
      colors: "亜鉛メッキ",
    },
    {
      id: "J002",
      title: "引張ばね製造",
      machine: "ばね巻き機B",
      status: "in-progress",
      progress: 45,
      startTime: "09:30",
      estimatedEnd: "15:00",
      priority: "medium",
      operator: "佐藤花子",
      quantity: "2000個",
      paperType: "硬鋼線 SWC φ2.5",
      colors: "無処理",
    },
    {
      id: "J003",
      title: "温度センサー組立",
      machine: "組立・検査ライン",
      status: "pending",
      progress: 0,
      startTime: "13:00",
      estimatedEnd: "16:00",
      priority: "low",
      operator: "未割当",
      quantity: "500個",
      paperType: "バイメタル",
      colors: "ニッケルメッキ",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">生産スケジュール・進捗・品質管理</p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <ClipboardCheck className="h-4 w-4 mr-2" />
                日報入力
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>日報入力</DialogTitle>
                <DialogDescription>本日の作業実績を入力してください</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="machine">機械名</Label>
                  <Input id="machine" placeholder="CNCばね成形機A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operator">作業者</Label>
                  <Input id="operator" placeholder="田中太郎" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workHours">作業時間</Label>
                  <Input id="workHours" type="number" placeholder="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="production">生産数</Label>
                  <Input id="production" type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">備考</Label>
                  <Textarea id="notes" placeholder="特記事項があれば入力してください" />
                </div>
                <Button className="w-full">日報を保存</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                スケジュール調整
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>スケジュール調整</DialogTitle>
                <DialogDescription>生産スケジュールの変更を行います</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobId">案件ID</Label>
                  <Input id="jobId" placeholder="J001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newStartTime">新開始時刻</Label>
                  <Input id="newStartTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newMachine">変更先機械</Label>
                  <Input id="newMachine" placeholder="ばね巻き機B" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">変更理由</Label>
                  <Textarea id="reason" placeholder="スケジュール変更の理由を入力" />
                </div>
                <Button className="w-full">スケジュール変更</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Production Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総案件数</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productionOverview.totalJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">稼働中</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{productionOverview.activeJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完了</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{productionOverview.completedJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">遅延</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{productionOverview.delayedJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">全体進捗</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{productionOverview.overallProgress}%</div>
            <Progress value={productionOverview.overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="schedule">スケジュール</TabsTrigger>
          <TabsTrigger value="quality">品質管理</TabsTrigger>
          <TabsTrigger value="machines">設備管理</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Machine Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  機械稼働状況
                </CardTitle>
                <CardDescription>各機械の現在の稼働状況と進捗</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {machineStatus.map((machine) => (
                  <Dialog key={machine.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                        <div className="flex-shrink-0">
                          <Badge
                            variant={
                              machine.status === "running"
                                ? "default"
                                : machine.status === "maintenance"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {machine.status === "running" && "稼働中"}
                            {machine.status === "maintenance" && "メンテナンス"}
                            {machine.status === "idle" && "待機中"}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{machine.name}</p>
                          <p className="text-xs text-muted-foreground">
                            作業者: {machine.operator} | {machine.job}
                          </p>
                          {machine.progress > 0 && <Progress value={machine.progress} className="mt-1 h-2" />}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{machine.progress}%</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{machine.name} 詳細情報</DialogTitle>
                        <DialogDescription>機械の詳細状況と操作</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>ステータス</Label>
                            <p className="text-sm font-medium">
                              {machine.status === "running"
                                ? "稼働中"
                                : machine.status === "maintenance"
                                  ? "メンテナンス"
                                  : "待機中"}
                            </p>
                          </div>
                          <div>
                            <Label>進捗率</Label>
                            <p className="text-sm font-medium">{machine.progress}%</p>
                          </div>
                          <div>
                            <Label>作業者</Label>
                            <p className="text-sm font-medium">{machine.operator}</p>
                          </div>
                          <div>
                            <Label>作業内容</Label>
                            <p className="text-sm font-medium">{machine.job}</p>
                          </div>
                          <div>
                            <Label>開始時刻</Label>
                            <p className="text-sm font-medium">{machine.startTime}</p>
                          </div>
                          <div>
                            <Label>完了予定</Label>
                            <p className="text-sm font-medium">{machine.estimatedEnd}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 bg-transparent">
                            一時停止
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            メンテナンス
                          </Button>
                          <Button className="flex-1">詳細設定</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>

            {/* Today's Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  本日の作業予定
                </CardTitle>
                <CardDescription>今日予定されている生産作業</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayJobs.map((job) => (
                  <Dialog key={job.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                        <div className="flex-shrink-0">
                          <Badge
                            variant={
                              job.priority === "high"
                                ? "destructive"
                                : job.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {job.priority === "high" && "高"}
                            {job.priority === "medium" && "中"}
                            {job.priority === "low" && "低"}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {job.machine} | {job.startTime} - {job.estimatedEnd}
                          </p>
                          <Progress value={job.progress} className="mt-1 h-2" />
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{job.progress}%</p>
                          <Badge variant="outline" className="text-xs">
                            {job.status === "in-progress" && "進行中"}
                            {job.status === "pending" && "待機中"}
                            {job.status === "completed" && "完了"}
                          </Badge>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>案件詳細: {job.id}</DialogTitle>
                        <DialogDescription>作業の詳細情報と操作</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>案件名</Label>
                            <p className="text-sm font-medium">{job.title}</p>
                          </div>
                          <div>
                            <Label>優先度</Label>
                            <p className="text-sm font-medium">
                              {job.priority === "high" ? "高" : job.priority === "medium" ? "中" : "低"}
                            </p>
                          </div>
                          <div>
                            <Label>担当機械</Label>
                            <p className="text-sm font-medium">{job.machine}</p>
                          </div>
                          <div>
                            <Label>作業者</Label>
                            <p className="text-sm font-medium">{job.operator}</p>
                          </div>
                          <div>
                            <Label>数量</Label>
                            <p className="text-sm font-medium">{job.quantity}</p>
                          </div>
                          <div>
                            <Label>材質</Label>
                            <p className="text-sm font-medium">{job.paperType}</p>
                          </div>
                          <div>
                            <Label>表面処理</Label>
                            <p className="text-sm font-medium">{job.colors}</p>
                          </div>
                          <div>
                            <Label>進捗</Label>
                            <p className="text-sm font-medium">{job.progress}%</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 bg-transparent">
                            進捗更新
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            問題報告
                          </Button>
                          <Button className="flex-1">完了報告</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <ProductionScheduler />
        </TabsContent>

        <TabsContent value="quality">
          <QualityControl />
        </TabsContent>

        <TabsContent value="machines">
          <MachineStatus />
        </TabsContent>
      </Tabs>
    </div>
  )
}
