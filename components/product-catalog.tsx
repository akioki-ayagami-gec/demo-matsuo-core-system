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
      name: "圧縮コイルばね",
      category: "精密線ばね品",
      size: "φ3.0×L15mm",
      paper: "ピアノ線 SWP-A",
      colors: "亜鉛メッキ",
      unitPrice: "¥8",
      minQuantity: 1000,
      maxQuantity: 100000,
      productionTime: "5-7営業日",
      status: "active",
    },
    {
      id: "P002",
      name: "引張コイルばね",
      category: "精密線ばね品",
      size: "φ2.5×L20mm",
      paper: "硬鋼線 SWC",
      colors: "無処理",
      unitPrice: "¥12",
      minQuantity: 500,
      maxQuantity: 50000,
      productionTime: "5-7営業日",
      status: "active",
    },
    {
      id: "P003",
      name: "板ばね部品",
      category: "精密薄板ばね品",
      size: "30×15×0.3mm",
      paper: "ステンレス SUS304",
      colors: "研磨仕上げ",
      unitPrice: "¥25",
      minQuantity: 500,
      maxQuantity: 50000,
      productionTime: "7-10営業日",
      status: "active",
    },
    {
      id: "P004",
      name: "バイメタル温度センサー",
      category: "温度センサー品",
      size: "φ8.0×L25mm",
      paper: "バイメタル",
      colors: "ニッケルメッキ",
      unitPrice: "¥45",
      minQuantity: 200,
      maxQuantity: 20000,
      productionTime: "10-14営業日",
      status: "active",
    },
    {
      id: "P005",
      name: "形状記憶合金ばね",
      category: "温度センサー品",
      size: "φ1.5×L10mm",
      paper: "形状記憶合金",
      colors: "無処理",
      unitPrice: "¥120",
      minQuantity: 100,
      maxQuantity: 10000,
      productionTime: "14-21営業日",
      status: "active",
    },
    {
      id: "P006",
      name: "深絞り金属カップ",
      category: "小物深絞り品",
      size: "φ12×H8mm",
      paper: "アルミニウム A1050",
      colors: "アルマイト処理",
      unitPrice: "¥18",
      minQuantity: 500,
      maxQuantity: 30000,
      productionTime: "7-10営業日",
      status: "active",
    },
    {
      id: "P007",
      name: "精密組立アセンブリ",
      category: "精密組み付け品",
      size: "20×15×10mm",
      paper: "複合材料",
      colors: "塗装仕上げ",
      unitPrice: "¥85",
      minQuantity: 100,
      maxQuantity: 10000,
      productionTime: "10-14営業日",
      status: "active",
    },
    {
      id: "P008",
      name: "樹脂成形部品",
      category: "精密樹脂成形品",
      size: "25×20×5mm",
      paper: "ABS樹脂",
      colors: "黒色成形",
      unitPrice: "¥32",
      minQuantity: 500,
      maxQuantity: 50000,
      productionTime: "7-10営業日",
      status: "active",
    },
  ]

  const categories = [...new Set(products.map((p) => p.category))]

  const getCategoryBadge = (category: string) => {
    const colors = {
      精密線ばね品: "bg-blue-600",
      精密薄板ばね品: "bg-green-600",
      温度センサー品: "bg-purple-600",
      小物深絞り品: "bg-orange-600",
      精密組み付け品: "bg-red-600",
      精密樹脂成形品: "bg-cyan-600",
      金型・専用機: "bg-gray-600",
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
          <h2 className="text-2xl font-bold">製品管理</h2>
          <p className="text-muted-foreground">精密部品・ばね製品の仕様・価格管理</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規製品登録
        </Button>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総製品数</CardTitle>
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
          <CardTitle>製品一覧</CardTitle>
          <CardDescription>精密部品の詳細仕様と価格情報</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>製品名</TableHead>
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
                        {product.minQuantity.toLocaleString()} - {product.maxQuantity.toLocaleString()}個
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
