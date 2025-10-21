"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Truck, MapPin, Zap, Package, Plus, Search, RefreshCw, AlertTriangle, Clock, ArrowRight } from "lucide-react"

// モックデータ
const agfVehicles = [
  {
    id: "AGF001",
    name: "AGF-Alpha",
    status: "active",
    currentLocation: "生産エリアA",
    destination: "自動倉庫ラック-A12",
    batteryLevel: 85,
    currentTask: "パレット搬送中",
    taskProgress: 60,
    lastMaintenance: "2024-01-10",
    totalDistance: 1250.5,
  },
  {
    id: "AGF002",
    name: "AGF-Beta",
    status: "idle",
    currentLocation: "充電ステーション",
    destination: null,
    batteryLevel: 100,
    currentTask: "待機中",
    taskProgress: 0,
    lastMaintenance: "2024-01-08",
    totalDistance: 980.2,
  },
  {
    id: "AGF003",
    name: "AGF-Gamma",
    status: "maintenance",
    currentLocation: "メンテナンスエリア",
    destination: null,
    batteryLevel: 45,
    currentTask: "定期点検中",
    taskProgress: 75,
    lastMaintenance: "2024-01-15",
    totalDistance: 1580.8,
  },
]

const transportTasks = [
  {
    id: "TT001",
    type: "normal",
    priority: "high",
    fromLocation: "生産エリアA",
    toLocation: "自動倉庫ラック-B15",
    palletId: "PLT-2024-001",
    productInfo: "松山市役所 広報誌 5000部",
    assignedAGF: "AGF001",
    status: "in-progress",
    createdAt: "2024-01-16 09:30",
    estimatedTime: "15分",
    actualTime: "12分",
  },
  {
    id: "TT002",
    type: "direct",
    priority: "medium",
    fromLocation: "印刷工程",
    toLocation: "製本工程",
    palletId: "PLT-2024-002",
    productInfo: "企業パンフレット 3000部",
    assignedAGF: "AGF002",
    status: "pending",
    createdAt: "2024-01-16 10:15",
    estimatedTime: "8分",
    actualTime: null,
  },
  {
    id: "TT003",
    type: "emergency",
    priority: "urgent",
    fromLocation: "品質検査エリア",
    toLocation: "出荷エリア",
    palletId: "PLT-2024-003",
    productInfo: "緊急案件 チラシ 1000部",
    assignedAGF: null,
    status: "waiting",
    createdAt: "2024-01-16 11:00",
    estimatedTime: "10分",
    actualTime: null,
  },
]

const palletLocations = [
  {
    id: "PLT-2024-001",
    type: "product",
    status: "in-transit",
    currentLocation: "AGF001搭載中",
    productInfo: "松山市役所 広報誌 5000部",
    weight: 125.5,
    dimensions: "120x80x60cm",
    lastMoved: "2024-01-16 09:30",
    destination: "自動倉庫ラック-B15",
  },
  {
    id: "PLT-2024-002",
    type: "product",
    status: "stationed",
    currentLocation: "印刷工程-ST03",
    productInfo: "企業パンフレット 3000部",
    weight: 85.2,
    dimensions: "100x80x45cm",
    lastMoved: "2024-01-16 08:45",
    destination: null,
  },
  {
    id: "PLT-EMPTY-001",
    type: "empty",
    status: "available",
    currentLocation: "パレット保管エリア-A",
    productInfo: null,
    weight: 25.0,
    dimensions: "120x80x15cm",
    lastMoved: "2024-01-15 16:20",
    destination: null,
  },
  {
    id: "PLT-EMPTY-002",
    type: "empty",
    status: "available",
    currentLocation: "パレット保管エリア-B",
    productInfo: null,
    weight: 25.0,
    dimensions: "120x80x15cm",
    lastMoved: "2024-01-15 14:30",
    destination: null,
  },
]

const rackLocations = [
  {
    id: "A12",
    zone: "A",
    level: 1,
    position: 2,
    status: "occupied",
    palletId: "PLT-2023-458",
    productInfo: "在庫品 - カタログ印刷物",
    capacity: "1パレット",
    lastAccess: "2024-01-14 15:30",
    temperature: 22.5,
    humidity: 45,
  },
  {
    id: "B15",
    zone: "B",
    level: 1,
    position: 5,
    status: "reserved",
    palletId: null,
    productInfo: null,
    capacity: "1パレット",
    lastAccess: "2024-01-16 09:30",
    temperature: 23.1,
    humidity: 42,
  },
  {
    id: "C08",
    zone: "C",
    level: 0,
    position: 8,
    status: "empty",
    palletId: null,
    productInfo: null,
    capacity: "1パレット",
    lastAccess: "2024-01-12 11:20",
    temperature: 22.8,
    humidity: 44,
  },
]

export function LogisticsManagement() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newTaskDialog, setNewTaskDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "in-progress":
      case "in-transit":
        return "bg-green-100 text-green-800 border-green-200"
      case "idle":
      case "available":
      case "empty":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance":
      case "pending":
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "occupied":
      case "stationed":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "reserved":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleCreateTask = () => {
    console.log("[v0] 新規搬送タスク作成")
    setNewTaskDialog(false)
  }

  const handleEmergencyStop = (agfId: string) => {
    console.log(`[v0] 緊急停止: ${agfId}`)
  }

  return (
    <div className="space-y-6">
      {/* 物流・自動化概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">稼働中AGF</p>
                <p className="text-2xl font-bold text-green-600">2/3</p>
              </div>
              <Truck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">搬送待ち</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">パレット管理</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ラック稼働率</p>
                <p className="text-2xl font-bold text-purple-600">78%</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agf" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agf">AGF管理</TabsTrigger>
          <TabsTrigger value="tasks">搬送タスク</TabsTrigger>
          <TabsTrigger value="pallets">パレット管理</TabsTrigger>
          <TabsTrigger value="racks">ラック管理</TabsTrigger>
        </TabsList>

        <TabsContent value="agf" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>自動フォークリフト (AGF) 管理</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  状態更新
                </Button>
                <Button variant="destructive">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  全機緊急停止
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {agfVehicles.map((agf) => (
                  <div key={agf.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{agf.name}</h3>
                        <Badge className={getStatusColor(agf.status)}>
                          {agf.status === "active" ? "稼働中" : agf.status === "idle" ? "待機中" : "点検中"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{agf.batteryLevel}%</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">現在位置</p>
                        <p className="font-medium">{agf.currentLocation}</p>
                      </div>
                      {agf.destination && (
                        <div>
                          <p className="text-muted-foreground">目的地</p>
                          <p className="font-medium">{agf.destination}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground">現在のタスク</p>
                        <p className="font-medium">{agf.currentTask}</p>
                      </div>
                    </div>

                    {agf.taskProgress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>進捗</span>
                          <span>{agf.taskProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${agf.taskProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t">
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                          <p>最終点検: {agf.lastMaintenance}</p>
                        </div>
                        <div>
                          <p>総走行距離: {agf.totalDistance}km</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        詳細
                      </Button>
                      {agf.status === "active" && (
                        <Button variant="destructive" size="sm" onClick={() => handleEmergencyStop(agf.id)}>
                          停止
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>搬送タスク管理</CardTitle>
              <Dialog open={newTaskDialog} onOpenChange={setNewTaskDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規搬送指示
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>新規搬送タスク作成</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>搬送タイプ</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="搬送タイプを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">通常搬送</SelectItem>
                            <SelectItem value="direct">直送</SelectItem>
                            <SelectItem value="emergency">緊急搬送</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>優先度</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="優先度を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">緊急</SelectItem>
                            <SelectItem value="high">高</SelectItem>
                            <SelectItem value="medium">中</SelectItem>
                            <SelectItem value="low">低</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>出発地点</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="出発地点を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production-a">生産エリアA</SelectItem>
                            <SelectItem value="production-b">生産エリアB</SelectItem>
                            <SelectItem value="printing">印刷工程</SelectItem>
                            <SelectItem value="binding">製本工程</SelectItem>
                            <SelectItem value="quality">品質検査エリア</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>目的地</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="目的地を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warehouse-a">自動倉庫A</SelectItem>
                            <SelectItem value="warehouse-b">自動倉庫B</SelectItem>
                            <SelectItem value="shipping">出荷エリア</SelectItem>
                            <SelectItem value="binding">製本工程</SelectItem>
                            <SelectItem value="quality">品質検査エリア</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>パレットID</Label>
                      <Input placeholder="パレットIDを入力" />
                    </div>
                    <div>
                      <Label>製品情報</Label>
                      <Input placeholder="製品名・数量など" />
                    </div>
                    <div>
                      <Label>備考</Label>
                      <Textarea placeholder="特記事項・注意点など" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setNewTaskDialog(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={handleCreateTask}>搬送指示作成</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transportTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {task.id}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === "urgent"
                            ? "緊急"
                            : task.priority === "high"
                              ? "高"
                              : task.priority === "medium"
                                ? "中"
                                : "低"}
                        </Badge>
                        <Badge variant="secondary">
                          {task.type === "normal" ? "通常" : task.type === "direct" ? "直送" : "緊急"}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === "in-progress" ? "実行中" : task.status === "pending" ? "待機中" : "割当待ち"}
                        </Badge>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">予定時間</p>
                        <p className="font-medium">{task.estimatedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{task.fromLocation}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{task.toLocation}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">パレットID</p>
                        <p className="font-medium font-mono">{task.palletId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">製品情報</p>
                        <p className="font-medium">{task.productInfo}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">担当AGF</p>
                        <p className="font-medium">{task.assignedAGF || "未割当"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">作成日時</p>
                        <p className="font-medium">{task.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        詳細
                      </Button>
                      {task.status === "waiting" && <Button size="sm">AGF割当</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pallets" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>パレット管理</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  検索
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  パレット登録
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {palletLocations.map((pallet) => (
                  <div key={pallet.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="font-mono">
                          {pallet.id}
                        </Badge>
                        <Badge className={getStatusColor(pallet.status)}>
                          {pallet.status === "in-transit"
                            ? "搬送中"
                            : pallet.status === "stationed"
                              ? "配置済み"
                              : "利用可能"}
                        </Badge>
                      </div>
                      <Badge variant={pallet.type === "product" ? "default" : "secondary"}>
                        {pallet.type === "product" ? "製品" : "空パレット"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">現在位置</p>
                        <p className="font-medium">{pallet.currentLocation}</p>
                      </div>
                      {pallet.productInfo && (
                        <div>
                          <p className="text-muted-foreground">製品情報</p>
                          <p className="font-medium">{pallet.productInfo}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground">重量</p>
                          <p className="font-medium">{pallet.weight}kg</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">寸法</p>
                          <p className="font-medium">{pallet.dimensions}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">最終移動</p>
                        <p className="font-medium">{pallet.lastMoved}</p>
                      </div>
                      {pallet.destination && (
                        <div>
                          <p className="text-muted-foreground">目的地</p>
                          <p className="font-medium">{pallet.destination}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        履歴
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        詳細
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="racks" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>自動倉庫ラック管理</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  状態更新
                </Button>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  ラック検索
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {rackLocations.map((rack) => (
                  <div key={rack.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">ラック-{rack.id}</h3>
                        <Badge className={getStatusColor(rack.status)}>
                          {rack.status === "occupied" ? "使用中" : rack.status === "reserved" ? "予約済み" : "空き"}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ゾーン{rack.zone}-L{rack.level}-P{rack.position}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">容量</p>
                        <p className="font-medium">{rack.capacity}</p>
                      </div>
                      {rack.palletId && (
                        <div>
                          <p className="text-muted-foreground">パレットID</p>
                          <p className="font-medium font-mono">{rack.palletId}</p>
                        </div>
                      )}
                      {rack.productInfo && (
                        <div>
                          <p className="text-muted-foreground">保管製品</p>
                          <p className="font-medium">{rack.productInfo}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-muted-foreground">温度</p>
                          <p className="font-medium">{rack.temperature}°C</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">湿度</p>
                          <p className="font-medium">{rack.humidity}%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">最終アクセス</p>
                        <p className="font-medium">{rack.lastAccess}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        履歴
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        詳細
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
