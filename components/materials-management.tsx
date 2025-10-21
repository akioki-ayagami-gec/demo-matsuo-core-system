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
import { Package, AlertTriangle, Clock, TrendingUp, Plus, Search, Filter } from "lucide-react"

// モックデータ
const advanceProcurements = [
  {
    id: "AP001",
    material: "コート紙 A4 90kg",
    quantity: 5000,
    unit: "枚",
    supplier: "王子製紙株式会社",
    requestDate: "2024-01-10",
    requiredDate: "2024-01-20",
    status: "pending",
    priority: "high",
    project: "松山市役所 広報誌",
    requestedBy: "生産部 田中",
  },
  {
    id: "AP002",
    material: "上質紙 B5 70kg",
    quantity: 3000,
    unit: "枚",
    supplier: "日本製紙株式会社",
    requestDate: "2024-01-12",
    requiredDate: "2024-01-25",
    status: "approved",
    priority: "medium",
    project: "企業パンフレット",
    requestedBy: "設計部 佐藤",
  },
]

const paperInventory = [
  {
    id: "PI001",
    name: "コート紙 A4 90kg",
    currentStock: 15000,
    minStock: 5000,
    maxStock: 30000,
    unit: "枚",
    supplier: "王子製紙株式会社",
    unitPrice: 12.5,
    lastOrderDate: "2024-01-05",
    status: "sufficient",
  },
  {
    id: "PI002",
    name: "上質紙 B5 70kg",
    currentStock: 2000,
    minStock: 3000,
    maxStock: 20000,
    unit: "枚",
    supplier: "日本製紙株式会社",
    unitPrice: 8.2,
    lastOrderDate: "2023-12-28",
    status: "low",
  },
  {
    id: "PI003",
    name: "マット紙 A3 110kg",
    currentStock: 8000,
    minStock: 2000,
    maxStock: 15000,
    unit: "枚",
    supplier: "大王製紙株式会社",
    unitPrice: 18.7,
    lastOrderDate: "2024-01-08",
    status: "sufficient",
  },
]

const purchaseOrders = [
  {
    id: "PO001",
    orderDate: "2024-01-15",
    supplier: "王子製紙株式会社",
    totalAmount: 125000,
    status: "ordered",
    deliveryDate: "2024-01-22",
    items: [{ material: "コート紙 A4 90kg", quantity: 10000, unitPrice: 12.5 }],
  },
  {
    id: "PO002",
    orderDate: "2024-01-14",
    supplier: "日本製紙株式会社",
    totalAmount: 82000,
    status: "delivered",
    deliveryDate: "2024-01-20",
    items: [{ material: "上質紙 B5 70kg", quantity: 10000, unitPrice: 8.2 }],
  },
]

const internalTransactions = [
  {
    id: "IT001",
    fromDepartment: "資材部",
    toDepartment: "生産部A",
    material: "コート紙 A4 90kg",
    quantity: 2000,
    unitPrice: 13.0,
    totalAmount: 26000,
    transactionDate: "2024-01-16",
    purpose: "松山市役所案件",
    status: "completed",
  },
  {
    id: "IT002",
    fromDepartment: "資材部",
    toDepartment: "生産部B",
    material: "上質紙 B5 70kg",
    quantity: 1500,
    unitPrice: 8.5,
    totalAmount: 12750,
    transactionDate: "2024-01-17",
    purpose: "企業パンフレット案件",
    status: "pending",
  },
]

export function MaterialsManagement() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newOrderDialog, setNewOrderDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "ordered":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "low":
        return "bg-red-100 text-red-800 border-red-200"
      case "sufficient":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* 資材・調達概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">総在庫品目</p>
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
                <p className="text-sm text-muted-foreground">発注待ち</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">在庫不足</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">月間調達額</p>
                <p className="text-2xl font-bold text-green-600">¥2.4M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="advance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="advance">先行手配</TabsTrigger>
          <TabsTrigger value="inventory">用紙システム</TabsTrigger>
          <TabsTrigger value="purchase">商品仕入れ</TabsTrigger>
          <TabsTrigger value="internal">社内取引</TabsTrigger>
        </TabsList>

        <TabsContent value="advance" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>先行手配管理</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規手配依頼
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>先行手配依頼</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>資材名</Label>
                        <Input placeholder="資材名を入力" />
                      </div>
                      <div>
                        <Label>数量</Label>
                        <Input type="number" placeholder="数量" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>仕入先</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="仕入先を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oji">王子製紙株式会社</SelectItem>
                            <SelectItem value="nippon">日本製紙株式会社</SelectItem>
                            <SelectItem value="daio">大王製紙株式会社</SelectItem>
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
                            <SelectItem value="high">緊急</SelectItem>
                            <SelectItem value="medium">通常</SelectItem>
                            <SelectItem value="low">低</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>関連プロジェクト</Label>
                      <Input placeholder="プロジェクト名" />
                    </div>
                    <div>
                      <Label>備考</Label>
                      <Textarea placeholder="備考・特記事項" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">キャンセル</Button>
                      <Button>依頼登録</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advanceProcurements.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {item.id}
                        </Badge>
                        <h3 className="font-semibold">{item.material}</h3>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority === "high" ? "緊急" : item.priority === "medium" ? "通常" : "低"}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === "pending" ? "承認待ち" : "承認済み"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">数量</p>
                        <p className="font-medium">
                          {item.quantity.toLocaleString()} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">仕入先</p>
                        <p className="font-medium">{item.supplier}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">必要日</p>
                        <p className="font-medium">{item.requiredDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">関連プロジェクト</p>
                        <p className="font-medium">{item.project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>用紙在庫管理</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  検索
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  フィルタ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paperInventory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status === "low" ? "在庫不足" : "在庫充分"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">単価</p>
                        <p className="font-bold">¥{item.unitPrice}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">現在在庫</p>
                        <p className="font-medium text-lg">
                          {item.currentStock.toLocaleString()} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">最小在庫</p>
                        <p className="font-medium">
                          {item.minStock.toLocaleString()} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">最大在庫</p>
                        <p className="font-medium">
                          {item.maxStock.toLocaleString()} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">最終発注日</p>
                        <p className="font-medium">{item.lastOrderDate}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>在庫レベル</span>
                        <span>{Math.round((item.currentStock / item.maxStock) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.status === "low" ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>発注管理</CardTitle>
              <Dialog open={newOrderDialog} onOpenChange={setNewOrderDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規発注
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>新規発注書作成</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>仕入先</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="仕入先を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oji">王子製紙株式会社</SelectItem>
                            <SelectItem value="nippon">日本製紙株式会社</SelectItem>
                            <SelectItem value="daio">大王製紙株式会社</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>納期</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <Label>発注品目</Label>
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                          <span>品目名</span>
                          <span>数量</span>
                          <span>単価</span>
                          <span>金額</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <Input placeholder="品目名" />
                          <Input type="number" placeholder="数量" />
                          <Input type="number" placeholder="単価" />
                          <Input placeholder="金額" disabled />
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          品目追加
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>備考</Label>
                      <Textarea placeholder="特記事項・納期要望など" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setNewOrderDialog(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={() => setNewOrderDialog(false)}>発注書作成</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {order.id}
                        </Badge>
                        <h3 className="font-semibold">{order.supplier}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status === "ordered" ? "発注済み" : "納品済み"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">発注金額</p>
                        <p className="font-bold text-lg">¥{order.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">発注日</p>
                        <p className="font-medium">{order.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">納期</p>
                        <p className="font-medium">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">品目数</p>
                        <p className="font-medium">{order.items.length}品目</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>社内取引管理</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規社内取引
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>社内取引登録</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>出庫部署</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="出庫部署を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="materials">資材部</SelectItem>
                            <SelectItem value="production-a">生産部A</SelectItem>
                            <SelectItem value="production-b">生産部B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>入庫部署</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="入庫部署を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production-a">生産部A</SelectItem>
                            <SelectItem value="production-b">生産部B</SelectItem>
                            <SelectItem value="logistics">物流部</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>資材名</Label>
                        <Input placeholder="資材名を入力" />
                      </div>
                      <div>
                        <Label>数量</Label>
                        <Input type="number" placeholder="数量" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>単価</Label>
                        <Input type="number" placeholder="単価" />
                      </div>
                      <div>
                        <Label>用途・目的</Label>
                        <Input placeholder="使用目的" />
                      </div>
                    </div>
                    <div>
                      <Label>備考</Label>
                      <Textarea placeholder="備考・特記事項" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">キャンセル</Button>
                      <Button>取引登録</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internalTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {transaction.id}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{transaction.fromDepartment}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-medium">{transaction.toDepartment}</span>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status === "completed" ? "完了" : "処理中"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">取引金額</p>
                        <p className="font-bold">¥{transaction.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">資材名</p>
                        <p className="font-medium">{transaction.material}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">数量</p>
                        <p className="font-medium">{transaction.quantity.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">取引日</p>
                        <p className="font-medium">{transaction.transactionDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">用途</p>
                        <p className="font-medium">{transaction.purpose}</p>
                      </div>
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
