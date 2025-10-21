"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Search,
  FileText,
  Settings,
  Plus,
  Edit,
  Clock,
  Package,
  Truck,
  AlertCircle,
  BarChart3,
} from "lucide-react"

export default function ProductionOrderManagementPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")

  // サンプルデータ
  const orders = [
    {
      id: "P-2024-001",
      customerName: "株式会社ABC",
      productName: "化粧品パッケージ",
      quantity: 10000,
      dueDate: "2024-02-15",
      status: "生産中",
      priority: "高",
      progress: 65,
      notes: "特殊印刷要求あり",
    },
    {
      id: "P-2024-002",
      customerName: "株式会社XYZ",
      productName: "食品パッケージ",
      quantity: 5000,
      dueDate: "2024-02-20",
      status: "予定",
      priority: "中",
      progress: 0,
      notes: "通常仕様",
    },
  ]

  const scheduleItems = [
    {
      id: 1,
      orderId: "P-2024-001",
      machine: "輪転機A",
      startTime: "08:00",
      endTime: "12:00",
      status: "進行中",
      operator: "田中太郎",
    },
    {
      id: 2,
      orderId: "P-2024-002",
      machine: "輪転機B",
      startTime: "13:00",
      endTime: "17:00",
      status: "予定",
      operator: "佐藤花子",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">受注管理（紙器生産管理）</h1>
          <p className="text-muted-foreground">紙器生産に関する受注管理、スケジュール調整、伝票管理を行います</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規予定入力
        </Button>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            予定入力
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            伝票検索
          </TabsTrigger>
          <TabsTrigger value="important" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            重要指定事項
          </TabsTrigger>
          <TabsTrigger value="schedule-change" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            スケジュール変更
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            運搬振分
          </TabsTrigger>
          <TabsTrigger value="batch-change" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            予定日一括変更
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            帳票出力
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>生産予定入力</CardTitle>
              <CardDescription>新しい生産予定を入力します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="order-id">案件ID</Label>
                    <Input id="order-id" placeholder="P-2024-XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer">顧客名</Label>
                    <Input id="customer" placeholder="顧客名を入力" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">製品名</Label>
                    <Input id="product" placeholder="製品名を入力" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">数量</Label>
                    <Input id="quantity" type="number" placeholder="数量" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">納期</Label>
                    <Input id="due-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">優先度</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="優先度を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machine">使用機械</Label>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">特記事項</Label>
                  <Textarea id="notes" placeholder="特記事項を入力" />
                </div>
                <Button className="w-full">予定を登録</Button>
              </div>
            </CardContent>
          </Card>

          {/* 現在のスケジュール表示 */}
          <Card>
            <CardHeader>
              <CardTitle>本日のスケジュール</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduleItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant={item.status === "進行中" ? "default" : "secondary"}>{item.status}</Badge>
                      <div>
                        <p className="font-medium">
                          {item.orderId} - {item.machine}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.startTime} - {item.endTime} | 作業者: {item.operator}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>伝票検索</CardTitle>
              <CardDescription>過去の伝票や現在進行中の案件を検索します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="search-order-id">案件ID</Label>
                    <Input id="search-order-id" placeholder="P-2024-XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search-customer">顧客名</Label>
                    <Input id="search-customer" placeholder="顧客名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search-status">ステータス</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="ステータス" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="scheduled">予定</SelectItem>
                        <SelectItem value="in-progress">生産中</SelectItem>
                        <SelectItem value="completed">完了</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      <Search className="mr-2 h-4 w-4" />
                      検索
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 検索結果 */}
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <Badge variant={order.status === "生産中" ? "default" : "secondary"}>{order.status}</Badge>
                      <Badge variant={order.priority === "高" ? "destructive" : "outline"}>{order.priority}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {order.customerName} | 納期: {order.dueDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">製品名:</span>
                      <p>{order.productName}</p>
                    </div>
                    <div>
                      <span className="font-medium">数量:</span>
                      <p>{order.quantity.toLocaleString()}個</p>
                    </div>
                    <div>
                      <span className="font-medium">進捗:</span>
                      <p>{order.progress}%</p>
                    </div>
                    <div>
                      <span className="font-medium">特記事項:</span>
                      <p>{order.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="important" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>重要指定事項・照会</CardTitle>
              <CardDescription>重要な指定事項や特別な要求事項を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-orange-800 dark:text-orange-200">P-2024-001: 特殊印刷要求</h4>
                          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                            UV印刷とエンボス加工が必要。通常より2日多く工期を見込む。
                          </p>
                          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                            登録日: 2024-01-10 | 担当: 田中太郎
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800 dark:text-red-200">P-2024-003: 急ぎ対応要求</h4>
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            納期前倒し要求。他の案件より優先して対応すること。
                          </p>
                          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                            登録日: 2024-01-12 | 担当: 佐藤花子
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  新規重要事項を追加
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule-change" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>社内スケジュール変更</CardTitle>
              <CardDescription>生産スケジュールの変更を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="change-order-id">変更対象案件ID</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="案件を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P-2024-001">P-2024-001</SelectItem>
                        <SelectItem value="P-2024-002">P-2024-002</SelectItem>
                        <SelectItem value="P-2024-003">P-2024-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-date">新しい予定日</Label>
                    <Input id="new-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="change-reason">変更理由</Label>
                  <Textarea id="change-reason" placeholder="変更理由を入力" />
                </div>
                <Button>スケジュール変更を適用</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>運搬振分</CardTitle>
              <CardDescription>完成品の運搬先を振り分けます</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transport-order">案件ID</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="案件を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P-2024-001">P-2024-001</SelectItem>
                        <SelectItem value="P-2024-002">P-2024-002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transport-destination">運搬先</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="運搬先を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warehouse-a">倉庫A</SelectItem>
                        <SelectItem value="warehouse-b">倉庫B</SelectItem>
                        <SelectItem value="direct-delivery">直接配送</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transport-date">運搬予定日</Label>
                    <Input id="transport-date" type="date" />
                  </div>
                </div>
                <Button>運搬振分を登録</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch-change" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>予定日一括変更</CardTitle>
              <CardDescription>複数の案件の予定日を一括で変更します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch-from-date">変更対象期間（開始）</Label>
                    <Input id="batch-from-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch-to-date">変更対象期間（終了）</Label>
                    <Input id="batch-to-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch-new-date">新しい予定日</Label>
                    <Input id="batch-new-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch-reason">変更理由</Label>
                    <Input id="batch-reason" placeholder="変更理由" />
                  </div>
                </div>
                <Button>一括変更を実行</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>帳票出力</CardTitle>
              <CardDescription>各種帳票を出力します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <FileText className="h-6 w-6 mb-2" />
                  生産予定表
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  進捗レポート
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Package className="h-6 w-6 mb-2" />
                  在庫状況表
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Truck className="h-6 w-6 mb-2" />
                  配送予定表
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
