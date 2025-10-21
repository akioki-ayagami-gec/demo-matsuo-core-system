"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Building, MapPin, Phone, Mail, Plus, Eye, Edit } from "lucide-react"

export function CustomerManagement() {
  // Mock customer data
  const customers = [
    {
      id: "C001",
      name: "松山市役所",
      type: "官公庁",
      contact: "総務課 田中様",
      phone: "089-948-6688",
      email: "soumu@city.matsuyama.ehime.jp",
      address: "愛媛県松山市二番町四丁目7-2",
      totalOrders: 45,
      totalAmount: "¥12,500,000",
      lastOrderDate: "2024-01-15",
      paymentTerms: "月末締め翌月末払い",
      status: "active",
    },
    {
      id: "C002",
      name: "愛媛県庁",
      type: "官公庁",
      contact: "広報広聴課 佐藤様",
      phone: "089-912-2240",
      email: "kouhou@pref.ehime.lg.jp",
      address: "愛媛県松山市一番町4-4-2",
      totalOrders: 32,
      totalAmount: "¥8,900,000",
      lastOrderDate: "2024-01-18",
      paymentTerms: "月末締め翌月末払い",
      status: "active",
    },
    {
      id: "C003",
      name: "地元企業A株式会社",
      type: "一般企業",
      contact: "営業部 鈴木様",
      phone: "089-123-4567",
      email: "suzuki@company-a.co.jp",
      address: "愛媛県松山市○○町1-2-3",
      totalOrders: 18,
      totalAmount: "¥3,200,000",
      lastOrderDate: "2024-01-20",
      paymentTerms: "月末締め翌々月10日払い",
      status: "active",
    },
    {
      id: "C004",
      name: "松山商工会議所",
      type: "団体",
      contact: "事務局 山田様",
      phone: "089-941-4111",
      email: "info@matsuyama-cci.or.jp",
      address: "愛媛県松山市南堀端町5-1",
      totalOrders: 24,
      totalAmount: "¥4,800,000",
      lastOrderDate: "2024-01-22",
      paymentTerms: "月末締め翌月末払い",
      status: "active",
    },
    {
      id: "C005",
      name: "地元企業B有限会社",
      type: "一般企業",
      contact: "代表取締役 高橋様",
      phone: "089-987-6543",
      email: "takahashi@company-b.com",
      address: "愛媛県松山市△△町4-5-6",
      totalOrders: 12,
      totalAmount: "¥1,800,000",
      lastOrderDate: "2024-01-25",
      paymentTerms: "月末締め翌月末払い",
      status: "inactive",
    },
  ]

  const getCustomerTypeBadge = (type: string) => {
    switch (type) {
      case "官公庁":
        return <Badge className="bg-blue-600">官公庁</Badge>
      case "一般企業":
        return <Badge variant="default">一般企業</Badge>
      case "団体":
        return <Badge variant="secondary">団体</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">アクティブ</Badge>
      case "inactive":
        return <Badge variant="secondary">非アクティブ</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">顧客管理</h2>
          <p className="text-muted-foreground">顧客情報と取引履歴の管理</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規顧客登録
        </Button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総顧客数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">官公庁</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {customers.filter((c) => c.type === "官公庁").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">一般企業</CardTitle>
            <Building className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {customers.filter((c) => c.type === "一般企業").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アクティブ</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {customers.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>顧客一覧</CardTitle>
          <CardDescription>登録されている顧客の詳細情報</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>顧客名</TableHead>
                  <TableHead>種別</TableHead>
                  <TableHead>担当者</TableHead>
                  <TableHead>連絡先</TableHead>
                  <TableHead>取引実績</TableHead>
                  <TableHead>最終受注</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {customer.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getCustomerTypeBadge(customer.type)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.contact}</p>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{customer.totalAmount}</p>
                        <p className="text-muted-foreground">{customer.totalOrders}件</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{customer.lastOrderDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-muted-foreground">{customer.paymentTerms}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
