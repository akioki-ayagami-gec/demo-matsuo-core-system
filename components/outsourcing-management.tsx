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
import { ExternalLink, Package, Truck, DollarSign, Plus, Search, FileText } from "lucide-react"

// モックデータ
const outsourcingOrders = [
  {
    id: "OS001",
    projectName: "熱処理加工",
    customer: "トヨタ自動車株式会社",
    vendor: "愛知熱処理工業株式会社",
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-25",
    status: "in-progress",
    priority: "high",
    totalAmount: 450000,
    specifications: "圧縮ばね φ3.0 5000個 浸炭焼入れ",
    contactPerson: "田中部長",
    progress: 60,
    qualityCheck: "pending",
  },
  {
    id: "OS002",
    projectName: "表面処理・メッキ加工",
    customer: "株式会社デンソー",
    vendor: "東海メッキ工業",
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-20",
    status: "completed",
    priority: "medium",
    totalAmount: 180000,
    specifications: "板ばね部品 3000個 亜鉛メッキ",
    contactPerson: "佐藤課長",
    progress: 100,
    qualityCheck: "approved",
  },
  {
    id: "OS003",
    projectName: "精密研磨加工",
    customer: "アイシン株式会社",
    vendor: "名古屋精密研磨",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-30",
    status: "ordered",
    priority: "low",
    totalAmount: 320000,
    specifications: "温度センサー部品 2000個 鏡面仕上げ",
    contactPerson: "山田主任",
    progress: 20,
    qualityCheck: "not-started",
  },
]

const productInventory = [
  {
    id: "PI001",
    productName: "圧縮コイルばね φ3.0×L15",
    customer: "トヨタ自動車株式会社",
    quantity: 50000,
    unitPrice: 18,
    totalValue: 900000,
    productionDate: "2024-01-08",
    expiryDate: "2024-06-08",
    location: "倉庫A-1-3",
    status: "in-stock",
    salesStatus: "available",
    qualityGrade: "A",
  },
  {
    id: "PI002",
    productName: "引張ばね φ2.5×L20",
    customer: "株式会社デンソー",
    quantity: 30000,
    unitPrice: 22,
    totalValue: 660000,
    productionDate: "2024-01-12",
    expiryDate: "2024-03-12",
    location: "倉庫B-2-1",
    status: "in-stock",
    salesStatus: "reserved",
    qualityGrade: "A",
  },
  {
    id: "PI003",
    productName: "会社案内冊子 A4 16P",
    customer: "建設会社XYZ",
    quantity: 2000,
    unitPrice: 180,
    totalValue: 360000,
    productionDate: "2024-01-05",
    expiryDate: "2024-07-05",
    location: "倉庫A-3-2",
    status: "partial-shipped",
    salesStatus: "selling",
    qualityGrade: "A",
  },
]

const vendors = [
  {
    id: "V001",
    name: "愛知熱処理工業株式会社",
    specialties: ["浸炭焼入れ", "窒化処理", "真空熱処理"],
    rating: 4.8,
    activeOrders: 3,
    totalOrders: 45,
    contactPerson: "田中部長",
    phone: "0566-123-4567",
    email: "tanaka@aichi-heat.co.jp",
  },
  {
    id: "V002",
    name: "東海メッキ工業",
    specialties: ["亜鉛メッキ", "ニッケルメッキ", "電解研磨"],
    rating: 4.5,
    activeOrders: 1,
    totalOrders: 32,
    contactPerson: "佐藤課長",
    phone: "0566-234-5678",
    email: "sato@tokai-mekki.co.jp",
  },
  {
    id: "V003",
    name: "名古屋精密研磨",
    specialties: ["鏡面仕上げ", "精密研磨", "バレル研磨"],
    rating: 4.9,
    activeOrders: 2,
    totalOrders: 28,
    contactPerson: "山田主任",
    phone: "052-345-6789",
    email: "yamada@nagoya-polish.co.jp",
  },
]

export function OutsourcingManagement() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newOrderDialog, setNewOrderDialog] = useState(false)
  const [newProductDialog, setNewProductDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ordered":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-stock":
        return "bg-green-100 text-green-800 border-green-200"
      case "partial-shipped":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "out-of-stock":
        return "bg-red-100 text-red-800 border-red-200"
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

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "not-started":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* 外注・製品管理概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">外注案件</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <ExternalLink className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">製品在庫</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">出荷待ち</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">在庫価値</p>
                <p className="text-2xl font-bold text-green-600">¥8.2M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="outsourcing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="outsourcing">外注管理</TabsTrigger>
          <TabsTrigger value="products">製品管理</TabsTrigger>
          <TabsTrigger value="vendors">外注先管理</TabsTrigger>
        </TabsList>

        <TabsContent value="outsourcing" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>外注案件管理</CardTitle>
              <Dialog open={newOrderDialog} onOpenChange={setNewOrderDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規外注依頼
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>外注依頼作成</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>案件名</Label>
                        <Input placeholder="案件名を入力" />
                      </div>
                      <div>
                        <Label>顧客</Label>
                        <Input placeholder="顧客名" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>外注先</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="外注先を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {vendors.map((vendor) => (
                              <SelectItem key={vendor.id} value={vendor.id}>
                                {vendor.name}
                              </SelectItem>
                            ))}
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>納期</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>予算</Label>
                        <Input type="number" placeholder="予算金額" />
                      </div>
                    </div>
                    <div>
                      <Label>仕様・要求事項</Label>
                      <Textarea placeholder="詳細な仕様や要求事項を入力" rows={4} />
                    </div>
                    <div>
                      <Label>備考</Label>
                      <Textarea placeholder="その他の備考事項" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setNewOrderDialog(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={() => setNewOrderDialog(false)}>外注依頼作成</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outsourcingOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {order.id}
                        </Badge>
                        <h3 className="font-semibold">{order.projectName}</h3>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority === "high" ? "緊急" : order.priority === "medium" ? "通常" : "低"}
                        </Badge>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status === "ordered" ? "発注済み" : order.status === "in-progress" ? "進行中" : "完了"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">外注金額</p>
                        <p className="font-bold text-lg">¥{order.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">顧客</p>
                        <p className="font-medium">{order.customer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">外注先</p>
                        <p className="font-medium">{order.vendor}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">納期</p>
                        <p className="font-medium">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">品質チェック</p>
                        <Badge className={getQualityColor(order.qualityCheck)} variant="outline">
                          {order.qualityCheck === "approved"
                            ? "承認済み"
                            : order.qualityCheck === "pending"
                              ? "確認中"
                              : order.qualityCheck === "rejected"
                                ? "要修正"
                                : "未開始"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-1">仕様</p>
                      <p className="text-sm">{order.specifications}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">進捗</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{order.progress}%</span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedItem(order)}>
                            詳細
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{order.projectName} - 詳細情報</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>案件ID</Label>
                                <p className="font-mono">{order.id}</p>
                              </div>
                              <div>
                                <Label>顧客</Label>
                                <p>{order.customer}</p>
                              </div>
                              <div>
                                <Label>外注先</Label>
                                <p>{order.vendor}</p>
                              </div>
                              <div>
                                <Label>担当者</Label>
                                <p>{order.contactPerson}</p>
                              </div>
                            </div>
                            <div>
                              <Label>仕様詳細</Label>
                              <p className="p-3 bg-muted rounded">{order.specifications}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>発注日</Label>
                                <p>{order.orderDate}</p>
                              </div>
                              <div>
                                <Label>納期</Label>
                                <p>{order.deliveryDate}</p>
                              </div>
                            </div>
                            <div>
                              <Label>進捗更新</Label>
                              <div className="flex space-x-2 mt-2">
                                <Input type="number" placeholder="進捗%" className="w-24" />
                                <Button size="sm">更新</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>製品在庫管理</CardTitle>
              <Dialog open={newProductDialog} onOpenChange={setNewProductDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    製品入庫
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>製品入庫登録</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>製品名</Label>
                        <Input placeholder="製品名を入力" />
                      </div>
                      <div>
                        <Label>顧客</Label>
                        <Input placeholder="顧客名" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>数量</Label>
                        <Input type="number" placeholder="数量" />
                      </div>
                      <div>
                        <Label>単価</Label>
                        <Input type="number" placeholder="単価" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>保管場所</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="保管場所を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warehouse-a">倉庫A</SelectItem>
                            <SelectItem value="warehouse-b">倉庫B</SelectItem>
                            <SelectItem value="warehouse-c">倉庫C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>品質グレード</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="品質グレード" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">A級品</SelectItem>
                            <SelectItem value="B">B級品</SelectItem>
                            <SelectItem value="C">C級品</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>備考</Label>
                      <Textarea placeholder="特記事項・保管条件など" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setNewProductDialog(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={() => setNewProductDialog(false)}>入庫登録</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productInventory.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {product.id}
                        </Badge>
                        <h3 className="font-semibold">{product.productName}</h3>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status === "in-stock"
                            ? "在庫中"
                            : product.status === "partial-shipped"
                              ? "一部出荷"
                              : "在庫切れ"}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {product.qualityGrade}級品
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">在庫価値</p>
                        <p className="font-bold text-lg">¥{product.totalValue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">顧客</p>
                        <p className="font-medium">{product.customer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">数量</p>
                        <p className="font-medium">{product.quantity.toLocaleString()}部</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">単価</p>
                        <p className="font-medium">¥{product.unitPrice}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">保管場所</p>
                        <p className="font-medium">{product.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">製造日</p>
                        <p className="font-medium">{product.productionDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">品質保持期限</p>
                        <p className="font-medium">{product.expiryDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          product.salesStatus === "available"
                            ? "bg-green-100 text-green-800"
                            : product.salesStatus === "reserved"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {product.salesStatus === "available"
                          ? "販売可能"
                          : product.salesStatus === "reserved"
                            ? "予約済み"
                            : "販売中"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          出荷指示
                        </Button>
                        <Button variant="outline" size="sm">
                          詳細
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>外注先管理</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  検索
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  新規外注先
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{vendor.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">専門分野</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {vendor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">進行中案件</p>
                          <p className="font-medium">{vendor.activeOrders}件</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">総取引件数</p>
                          <p className="font-medium">{vendor.totalOrders}件</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">担当者</p>
                        <p className="font-medium">{vendor.contactPerson}</p>
                        <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <FileText className="w-4 h-4 mr-2" />
                        取引履歴
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
