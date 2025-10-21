"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, FileText, Palette, Ruler, Plus, Eye, Edit } from "lucide-react"

export function ProductCatalog() {
  // Mock product data
  const products = [
    {
      id: "P001",
      name: "A4チラシ印刷",
      category: "チラシ・フライヤー",
      size: "A4 (210×297mm)",
      paper: "コート紙 90kg",
      colors: "4色カラー",
      unitPrice: "¥12",
      minQuantity: 100,
      maxQuantity: 50000,
      productionTime: "3-5営業日",
      status: "active",
    },
    {
      id: "P002",
      name: "A3ポスター印刷",
      category: "ポスター",
      size: "A3 (297×420mm)",
      paper: "マット紙 135kg",
      colors: "4色カラー",
      unitPrice: "¥45",
      minQuantity: 50,
      maxQuantity: 10000,
      productionTime: "5-7営業日",
      status: "active",
    },
    {
      id: "P003",
      name: "パンフレット印刷",
      category: "パンフレット・カタログ",
      size: "A4 (210×297mm)",
      paper: "上質紙 70kg",
      colors: "4色カラー",
      unitPrice: "¥180",
      minQuantity: 100,
      maxQuantity: 20000,
      productionTime: "7-10営業日",
      status: "active",
    },
    {
      id: "P004",
      name: "名刺印刷",
      category: "名刺・カード",
      size: "91×55mm",
      paper: "アートポスト 220kg",
      colors: "4色カラー",
      unitPrice: "¥8",
      minQuantity: 100,
      maxQuantity: 5000,
      productionTime: "2-3営業日",
      status: "active",
    },
    {
      id: "P005",
      name: "冊子印刷（中綴じ）",
      category: "冊子・書籍",
      size: "A4 (210×297mm)",
      paper: "上質紙 70kg",
      colors: "4色カラー",
      unitPrice: "¥320",
      minQuantity: 50,
      maxQuantity: 10000,
      productionTime: "10-14営業日",
      status: "active",
    },
    {
      id: "P006",
      name: "封筒印刷",
      category: "封筒・袋",
      size: "角2 (240×332mm)",
      paper: "クラフト紙 85kg",
      colors: "1色印刷",
      unitPrice: "¥25",
      minQuantity: 100,
      maxQuantity: 20000,
      productionTime: "5-7営業日",
      status: "inactive",
    },
  ]

  const categories = [...new Set(products.map((p) => p.category))]

  const getCategoryBadge = (category: string) => {
    const colors = {
      チラシ・フライヤー: "bg-blue-600",
      ポスター: "bg-green-600",
      パンフレット・カタログ: "bg-purple-600",
      名刺・カード: "bg-orange-600",
      冊子・書籍: "bg-red-600",
      封筒・袋: "bg-gray-600",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-600"}>{category}</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">販売中</Badge>
      case "inactive":
        return <Badge variant="secondary">販売停止</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">商品管理</h2>
          <p className="text-muted-foreground">印刷商品の仕様・価格管理</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規商品登録
        </Button>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総商品数</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">販売中</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {products.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">カテゴリー数</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均単価</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥
              {Math.round(
                products.reduce((acc, p) => acc + Number.parseInt(p.unitPrice.replace("¥", "")), 0) / products.length,
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product List */}
      <Card>
        <CardHeader>
          <CardTitle>商品一覧</CardTitle>
          <CardDescription>印刷商品の詳細仕様と価格情報</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商品名</TableHead>
                  <TableHead>カテゴリー</TableHead>
                  <TableHead>仕様</TableHead>
                  <TableHead>単価</TableHead>
                  <TableHead>数量範囲</TableHead>
                  <TableHead>納期</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(product.category)}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Ruler className="h-3 w-3" />
                          <span>{product.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span>{product.paper}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Palette className="h-3 w-3" />
                          <span>{product.colors}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.unitPrice}</TableCell>
                    <TableCell className="text-sm">
                      <p>
                        {product.minQuantity.toLocaleString()} - {product.maxQuantity.toLocaleString()}部
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">{product.productionTime}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
