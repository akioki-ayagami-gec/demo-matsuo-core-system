"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Plus, Edit, Package, CheckCircle, Star, DollarSign, Archive, FileEdit } from "lucide-react"

export default function SalesOrderManagementPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")

  // サンプルデータ
  const approvalOrders = [
    {
      id: "S-2024-001",
      customerName: "株式会社ABC",
      productName: "化粧品パッケージ",
      amount: 500000,
      status: "承認待ち",
      submittedDate: "2024-01-15",
      priority: "高",
    },
    {
      id: "S-2024-002",
      customerName: "株式会社XYZ",
      productName: "食品パッケージ",
      amount: 300000,
      status: "承認済み",
      submittedDate: "2024-01-14",
      priority: "中",
    },
  ]

  const subcontractOrders = [
    {
      id: "SC-2024-001",
      subcontractor: "印刷工房ABC",
      orderType: "印刷",
      amount: 150000,
      dueDate: "2024-02-10",
      status: "発注済み",
    },
    {
      id: "SC-2024-002",
      subcontractor: "加工センターXYZ",
      orderType: "後加工",
      amount: 80000,
      dueDate: "2024-02-15",
      status: "見積中",
    },
  ]

  const salesData = [
    {
      id: "SALE-2024-001",
      orderId: "S-2024-001",
      customerName: "株式会社ABC",
      amount: 500000,
      saleDate: "2024-01-20",
      status: "売上確定",
      paymentStatus: "入金済み",
    },
    {
      id: "SALE-2024-002",
      orderId: "S-2024-002",
      customerName: "株式会社XYZ",
      amount: 300000,
      saleDate: "2024-01-18",
      status: "売上確定",
      paymentStatus: "請求済み",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">受注管理（営業用）</h1>
          <p className="text-muted-foreground">営業部門向けの受注承認、下請管理、売上処理を行います</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規案件登録
        </Button>
      </div>

      <Tabs defaultValue="approval" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="approval" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            受注承認
          </TabsTrigger>
          <TabsTrigger value="subcontract" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            下請伝票
          </TabsTrigger>
          <TabsTrigger value="custody" className="flex items-center gap-1">
            <Archive className="h-4 w-4" />
            預り・製品申請
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            特殊案件
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            売上処理
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-1">
            <FileEdit className="h-4 w-4" />
            下書・変更
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>受注承認用伝票一覧</CardTitle>
              <CardDescription>承認待ちの受注案件を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="案件ID、顧客名で検索" className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="pending">承認待ち</SelectItem>
                      <SelectItem value="approved">承認済み</SelectItem>
                      <SelectItem value="rejected">却下</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    検索
                  </Button>
                </div>

                <div className="grid gap-4">
                  {approvalOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <Badge variant={order.status === "承認待ち" ? "destructive" : "default"}>
                              {order.status}
                            </Badge>
                            <Badge variant={order.priority === "高" ? "destructive" : "outline"}>
                              {order.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              承認
                            </Button>
                            <Button variant="outline" size="sm">
                              却下
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription>
                          {order.customerName} | 提出日: {order.submittedDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">製品名:</span>
                            <p>{order.productName}</p>
                          </div>
                          <div>
                            <span className="font-medium">金額:</span>
                            <p>¥{order.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">優先度:</span>
                            <p>{order.priority}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subcontract" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>紙器 印刷営業下請伝票一覧</CardTitle>
              <CardDescription>外注・下請業者への発注を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="下請業者名で検索" className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="発注種別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="printing">印刷</SelectItem>
                      <SelectItem value="processing">後加工</SelectItem>
                      <SelectItem value="delivery">配送</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    検索
                  </Button>
                </div>

                <div className="grid gap-4">
                  {subcontractOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <Badge variant={order.status === "発注済み" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
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
                          {order.subcontractor} | 納期: {order.dueDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">発注種別:</span>
                            <p>{order.orderType}</p>
                          </div>
                          <div>
                            <span className="font-medium">金額:</span>
                            <p>¥{order.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">ステータス:</span>
                            <p>{order.status}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custody" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>預り・製品申請票一覧</CardTitle>
              <CardDescription>顧客からの預り品や製品申請を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  新規預り・申請票作成
                </Button>

                <div className="text-center py-8 text-muted-foreground">現在、預り・製品申請票はありません</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>CP案件チェック用伝票一覧</CardTitle>
                <CardDescription>キャンペーン案件の特別チェック項目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">現在、CP案件はありません</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IT・WEB関連サービス案件チェック用伝票一覧</CardTitle>
                <CardDescription>デジタル関連サービスの案件管理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">現在、IT・WEB関連案件はありません</div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  ★先行管理★
                </CardTitle>
                <CardDescription>重要案件の先行管理項目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">S-2024-VIP-001</h4>
                      <p className="text-sm text-muted-foreground">大手クライアント向け特別案件</p>
                    </div>
                    <Badge className="bg-yellow-500">先行管理中</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>売上処理</CardTitle>
              <CardDescription>完了案件の売上計上と請求処理を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">¥2,400,000</div>
                      <p className="text-xs text-muted-foreground">今月の売上</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">¥1,800,000</div>
                      <p className="text-xs text-muted-foreground">入金済み</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">¥600,000</div>
                      <p className="text-xs text-muted-foreground">請求済み</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">完了案件数</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {salesData.map((sale) => (
                    <Card key={sale.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-medium">{sale.orderId}</h4>
                              <p className="text-sm text-muted-foreground">{sale.customerName}</p>
                            </div>
                            <Badge variant="outline">{sale.status}</Badge>
                            <Badge variant={sale.paymentStatus === "入金済み" ? "default" : "secondary"}>
                              {sale.paymentStatus}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">¥{sale.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{sale.saleDate}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>下書伝票一覧</CardTitle>
                <CardDescription>保存された下書き伝票を管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">現在、下書き伝票はありません</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>変更伝票一覧</CardTitle>
                <CardDescription>変更が必要な伝票を管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">現在、変更伝票はありません</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>発行済伝票一覧（変更入力）</CardTitle>
                <CardDescription>発行済み伝票の変更入力を行います</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="伝票番号で検索" className="max-w-sm" />
                    <Button>
                      <Search className="mr-2 h-4 w-4" />
                      検索
                    </Button>
                  </div>
                  <div className="text-center py-4 text-muted-foreground">検索結果がありません</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>仕様変更指示書下書きリスト</CardTitle>
                <CardDescription>仕様変更指示書の下書きを管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    新規仕様変更指示書作成
                  </Button>
                  <div className="text-center py-4 text-muted-foreground">現在、下書きはありません</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
