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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, FileText, Search, Plus, Calendar, TrendingUp } from "lucide-react"
import { OrderList } from "@/components/order-list"
import { CustomerManagement } from "@/components/customer-management"
import { ProductCatalog } from "@/components/product-catalog"

export function OrderManagement() {
  const [activeTab, setActiveTab] = useState("orders")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for order overview
  const orderStats = {
    totalOrders: 156,
    newOrders: 8,
    inProgress: 23,
    completed: 125,
    totalRevenue: "¥15,420,000",
    monthlyGrowth: 12.5,
  }

  const urgentOrders = [
    {
      id: "O001",
      customer: "トヨタ自動車株式会社",
      title: "圧縮コイルばね φ3.0×L15",
      dueDate: "2024-02-05",
      status: "urgent",
      amount: "¥850,000",
      quantity: "50000個",
      paperType: "ピアノ線 SWP-A φ3.0",
      colors: "亜鉛メッキ",
      contact: "田中部長",
      phone: "0565-28-2121",
    },
    {
      id: "O002",
      customer: "株式会社デンソー",
      title: "温度センサー バイメタル式",
      dueDate: "2024-02-07",
      status: "urgent",
      amount: "¥620,000",
      quantity: "8000個",
      paperType: "バイメタル",
      colors: "ニッケルメッキ",
      contact: "佐藤課長",
      phone: "0566-25-5511",
    },
    {
      id: "O003",
      customer: "アイシン株式会社",
      title: "板ばね部品 SUS304",
      dueDate: "2024-02-10",
      status: "high",
      amount: "¥480,000",
      quantity: "15000個",
      paperType: "ステンレス SUS304 t0.3",
      colors: "研磨仕上げ",
      contact: "鈴木部長",
      phone: "0566-24-8441",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">顧客管理・受注処理・製品管理</p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新規受注
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>新規受注登録</DialogTitle>
                <DialogDescription>新しい受注情報を登録します</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">顧客名</Label>
                  <Input id="customer" placeholder="松山市役所" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">担当者</Label>
                  <Input id="contact" placeholder="田中部長" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">案件名</Label>
                  <Input id="title" placeholder="市政だより印刷" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">納期</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">数量</Label>
                  <Input id="quantity" type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">金額</Label>
                  <Input id="amount" placeholder="¥450,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paperType">用紙種類</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="用紙を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="superior">上質紙</SelectItem>
                      <SelectItem value="coated">コート紙</SelectItem>
                      <SelectItem value="matte">マット紙</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colors">色数</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="色数を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1色</SelectItem>
                      <SelectItem value="2">2色</SelectItem>
                      <SelectItem value="4">4色</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">特記事項</Label>
                  <Textarea id="notes" placeholder="特別な要求や注意事項があれば入力してください" />
                </div>
                <div className="col-span-2 flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    下書き保存
                  </Button>
                  <Button className="flex-1">受注登録</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                見積作成
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>見積書作成</DialogTitle>
                <DialogDescription>顧客向けの見積書を作成します</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quoteCustomer">顧客名</Label>
                    <Input id="quoteCustomer" placeholder="顧客名を入力" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quoteDate">見積日</Label>
                    <Input id="quoteDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quoteItems">見積項目</Label>
                  <Textarea id="quoteItems" placeholder="印刷物の詳細仕様を入力してください" rows={4} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">単価</Label>
                    <Input id="unitPrice" type="number" placeholder="45" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quoteQuantity">数量</Label>
                    <Input id="quoteQuantity" type="number" placeholder="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalAmount">合計金額</Label>
                    <Input id="totalAmount" placeholder="¥450,000" readOnly />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    プレビュー
                  </Button>
                  <Button className="flex-1">見積書作成</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総受注数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新規受注</CardTitle>
            <Plus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderStats.newOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">進行中</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderStats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完了</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{orderStats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">売上合計</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">{orderStats.totalRevenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月次成長率</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{orderStats.monthlyGrowth}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Orders Alert */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            緊急・優先案件
          </CardTitle>
          <CardDescription>納期が迫っている案件の確認をお願いします</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {urgentOrders.map((order) => (
              <Dialog key={order.id}>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Badge variant={order.status === "urgent" ? "destructive" : "default"}>
                        {order.status === "urgent" ? "緊急" : "優先"}
                      </Badge>
                      <div>
                        <p className="font-medium">{order.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer} | 納期: {order.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>受注詳細: {order.id}</DialogTitle>
                    <DialogDescription>受注の詳細情報と操作</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>顧客名</Label>
                        <p className="text-sm font-medium">{order.customer}</p>
                      </div>
                      <div>
                        <Label>担当者</Label>
                        <p className="text-sm font-medium">{order.contact}</p>
                      </div>
                      <div>
                        <Label>案件名</Label>
                        <p className="text-sm font-medium">{order.title}</p>
                      </div>
                      <div>
                        <Label>納期</Label>
                        <p className="text-sm font-medium">{order.dueDate}</p>
                      </div>
                      <div>
                        <Label>数量</Label>
                        <p className="text-sm font-medium">{order.quantity}</p>
                      </div>
                      <div>
                        <Label>金額</Label>
                        <p className="text-sm font-medium">{order.amount}</p>
                      </div>
                      <div>
                        <Label>用紙</Label>
                        <p className="text-sm font-medium">{order.paperType}</p>
                      </div>
                      <div>
                        <Label>色数</Label>
                        <p className="text-sm font-medium">{order.colors}</p>
                      </div>
                      <div>
                        <Label>連絡先</Label>
                        <p className="text-sm font-medium">{order.phone}</p>
                      </div>
                      <div>
                        <Label>ステータス</Label>
                        <Badge variant={order.status === "urgent" ? "destructive" : "default"}>
                          {order.status === "urgent" ? "緊急" : "優先"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        納期変更
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        仕様変更
                      </Button>
                      <Button className="flex-1">生産開始</Button>
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
            placeholder="受注番号、顧客名、商品名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          詳細検索
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">受注一覧</TabsTrigger>
          <TabsTrigger value="customers">顧客管理</TabsTrigger>
          <TabsTrigger value="products">商品管理</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <OrderList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="products">
          <ProductCatalog />
        </TabsContent>
      </Tabs>
    </div>
  )
}
