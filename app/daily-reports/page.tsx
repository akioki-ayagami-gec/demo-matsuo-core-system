"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, FileText, BarChart3, Plus, Edit, Trash2 } from "lucide-react"
import { DailyReportForm } from "@/components/daily-report-form"

export default function DailyReportsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMachine, setSelectedMachine] = useState("")

  // サンプルデータ
  const dailyReports = [
    {
      id: 1,
      date: "2024-01-15",
      machine: "輪転機A",
      operator: "田中太郎",
      startTime: "08:00",
      endTime: "17:00",
      projectId: "P-2024-001",
      quantity: 5000,
      defects: 50,
      status: "完了",
      notes: "順調に作業完了",
    },
    {
      id: 2,
      date: "2024-01-15",
      machine: "輪転機B",
      operator: "佐藤花子",
      startTime: "08:30",
      endTime: "16:30",
      projectId: "P-2024-002",
      quantity: 3500,
      defects: 25,
      status: "完了",
      notes: "軽微な調整あり",
    },
  ]

  return (
    <MainLayout currentPage="日報管理">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">日報管理</h1>
            <p className="text-muted-foreground">日報の入力、編集、検索、集計を管理します</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規日報作成
          </Button>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="list" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              日報一覧
            </TabsTrigger>
            <TabsTrigger value="input" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              日報入力（輪転）
            </TabsTrigger>
            <TabsTrigger value="simple" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              シンプル日報入力
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              小日程
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              日次集計表
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* 検索・フィルター */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  検索・フィルター
                </CardTitle>
                <CardDescription>日報の検索とフィルタリングを行います</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">日付</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machine">機械名</Label>
                    <Select value={selectedMachine} onValueChange={setSelectedMachine}>
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
                  <div className="space-y-2">
                    <Label htmlFor="search">キーワード検索</Label>
                    <Input
                      id="search"
                      placeholder="案件ID、作業者名など"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      <Search className="mr-2 h-4 w-4" />
                      検索
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 日報一覧 */}
            <div className="grid gap-4">
              {dailyReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-lg">{report.machine}</CardTitle>
                        <Badge variant="outline">{report.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {report.date} | 作業者: {report.operator}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">作業時間:</span>
                        <p>
                          {report.startTime} - {report.endTime}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">案件ID:</span>
                        <p>{report.projectId}</p>
                      </div>
                      <div>
                        <span className="font-medium">生産数量:</span>
                        <p>{report.quantity.toLocaleString()}枚</p>
                      </div>
                      <div>
                        <span className="font-medium">不良品数:</span>
                        <p>{report.defects}枚</p>
                      </div>
                    </div>
                    {report.notes && (
                      <div className="mt-4 pt-4 border-t">
                        <span className="font-medium">備考:</span>
                        <p className="text-muted-foreground">{report.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>日報入力（輪転）</CardTitle>
                <CardDescription>輪転機の詳細な作業日報を入力します</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyReportForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simple">
            <Card>
              <CardHeader>
                <CardTitle>シンプル日報入力</CardTitle>
                <CardDescription>簡易的な日報入力フォームです</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="simple-date">日付</Label>
                      <Input id="simple-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="simple-machine">機械名</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="機械を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rotary-a">輪転機A</SelectItem>
                          <SelectItem value="rotary-b">輪転機B</SelectItem>
                          <SelectItem value="rotary-c">輪転機C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="simple-operator">作業者</Label>
                      <Input id="simple-operator" placeholder="作業者名を入力" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="simple-quantity">生産数量</Label>
                      <Input id="simple-quantity" type="number" placeholder="数量を入力" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="simple-notes">備考</Label>
                    <Input id="simple-notes" placeholder="備考を入力" />
                  </div>
                  <Button className="w-full">日報を保存</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>小日程</CardTitle>
                <CardDescription>日別の作業スケジュールを管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input type="date" className="w-auto" />
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      スケジュール表示
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">輪転機A - 08:00-12:00</h4>
                            <p className="text-sm text-muted-foreground">案件: P-2024-001</p>
                          </div>
                          <Badge>予定</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">輪転機A - 13:00-17:00</h4>
                            <p className="text-sm text-muted-foreground">案件: P-2024-002</p>
                          </div>
                          <Badge variant="secondary">進行中</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>日次集計表</CardTitle>
                <CardDescription>日別の生産実績と統計情報を表示します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">8,500</div>
                        <p className="text-xs text-muted-foreground">総生産数量（枚）</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">75</div>
                        <p className="text-xs text-muted-foreground">不良品数（枚）</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">99.1%</div>
                        <p className="text-xs text-muted-foreground">良品率</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">稼働機械数</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">機械別実績</h4>
                    <div className="space-y-2">
                      {["輪転機A", "輪転機B", "輪転機C"].map((machine) => (
                        <div key={machine} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{machine}</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span>生産: 2,800枚</span>
                            <span>不良: 25枚</span>
                            <span className="text-green-600">良品率: 99.1%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
