"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, FileText, Calendar } from "lucide-react"

interface OrderListProps {
  searchQuery: string
}

export function OrderList({ searchQuery }: OrderListProps) {
  // Mock order data
  const orders = [
    {
      id: "O001",
      orderNumber: "2024-001",
      customer: "松山市役所",
      customerType: "官公庁",
      title: "市政だより 3月号",
      quantity: "5,000部",
      amount: "¥450,000",
      orderDate: "2024-01-15",
      dueDate: "2024-02-05",
      status: "in-progress",
      priority: "urgent",
      assignedTo: "営業部 田中",
    },
    {
      id: "O002",
      orderNumber: "2024-002",
      customer: "愛媛県庁",
      customerType: "官公庁",
      title: "観光パンフレット",
      quantity: "3,000部",
      amount: "¥320,000",
      orderDate: "2024-01-18",
      dueDate: "2024-02-07",
      status: "in-progress",
      priority: "high",
      assignedTo: "営業部 佐藤",
    },
    {
      id: "O003",
      orderNumber: "2024-003",
      customer: "地元企業A",
      customerType: "一般企業",
      title: "会社案内パンフレット",
      quantity: "1,000部",
      amount: "¥180,000",
      orderDate: "2024-01-20",
      dueDate: "2024-02-10",
      status: "quotation",
      priority: "medium",
      assignedTo: "営業部 鈴木",
    },
    {
      id: "O004",
      orderNumber: "2024-004",
      customer: "商工会議所",
      customerType: "団体",
      title: "会報誌印刷",
      quantity: "2,000部",
      amount: "¥280,000",
      orderDate: "2024-01-22",
      dueDate: "2024-02-15",
      status: "completed",
      priority: "low",
      assignedTo: "営業部 山田",
    },
    {
      id: "O005",
      orderNumber: "2024-005",
      customer: "地元企業B",
      customerType: "一般企業",
      title: "チラシ印刷",
      quantity: "10,000部",
      amount: "¥120,000",
      orderDate: "2024-01-25",
      dueDate: "2024-02-20",
      status: "new",
      priority: "medium",
      assignedTo: "営業部 田中",
    },
  ]

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">新規</Badge>
      case "quotation":
        return <Badge variant="outline">見積中</Badge>
      case "in-progress":
        return <Badge variant="default">進行中</Badge>
      case "completed":
        return <Badge className="bg-green-600">完了</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">緊急</Badge>
      case "high":
        return <Badge className="bg-orange-600">高</Badge>
      case "medium":
        return <Badge variant="outline">中</Badge>
      case "low":
        return <Badge variant="secondary">低</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>受注一覧</CardTitle>
        <CardDescription>
          {filteredOrders.length}件の受注が見つかりました
          {searchQuery && ` (検索: "${searchQuery}")`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>受注番号</TableHead>
                <TableHead>顧客名</TableHead>
                <TableHead>案件名</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>納期</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>優先度</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.customerType}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="font-medium truncate">{order.title}</p>
                      <p className="text-xs text-muted-foreground">受注日: {order.orderDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{order.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell className="text-sm">{order.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
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
  )
}
