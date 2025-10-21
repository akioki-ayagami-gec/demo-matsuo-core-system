"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Settings, Wrench, AlertTriangle, CheckCircle, Calendar, BarChart3 } from "lucide-react"

export function MachineStatus() {
  // Mock machine data
  const machines = [
    {
      id: 1,
      name: "輪転機1号機",
      status: "running",
      utilization: 85,
      currentJob: "松山市役所 広報誌印刷",
      operator: "田中",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-02-15",
      totalHours: 1250,
      issues: [],
    },
    {
      id: 2,
      name: "輪転機2号機",
      status: "maintenance",
      utilization: 0,
      currentJob: "メンテナンス中",
      operator: "-",
      lastMaintenance: "2024-01-28",
      nextMaintenance: "2024-02-28",
      totalHours: 980,
      issues: ["定期メンテナンス実施中"],
    },
    {
      id: 3,
      name: "印刷機1号機",
      status: "running",
      utilization: 72,
      currentJob: "企業パンフレット印刷",
      operator: "佐藤",
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-02-20",
      totalHours: 1100,
      issues: [],
    },
    {
      id: 4,
      name: "印刷機2号機",
      status: "idle",
      utilization: 0,
      currentJob: "待機中",
      operator: "-",
      lastMaintenance: "2024-01-25",
      nextMaintenance: "2024-02-25",
      totalHours: 850,
      issues: [],
    },
    {
      id: 5,
      name: "後加工機",
      status: "running",
      utilization: 95,
      currentJob: "製本作業",
      operator: "鈴木",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
      totalHours: 1400,
      issues: ["高負荷運転中 - 監視が必要"],
    },
  ]

  const overallStats = {
    totalMachines: machines.length,
    runningMachines: machines.filter((m) => m.status === "running").length,
    idleMachines: machines.filter((m) => m.status === "idle").length,
    maintenanceMachines: machines.filter((m) => m.status === "maintenance").length,
    averageUtilization: Math.round(machines.reduce((acc, m) => acc + m.utilization, 0) / machines.length),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">設備管理</h2>
          <p className="text-muted-foreground">機械稼働状況とメンテナンス管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            メンテナンス予定
          </Button>
          <Button>
            <Wrench className="h-4 w-4 mr-2" />
            メンテナンス記録
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総設備数</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalMachines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">稼働中</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallStats.runningMachines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待機中</CardTitle>
            <div className="h-4 w-4 rounded-full bg-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{overallStats.idleMachines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">メンテナンス</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{overallStats.maintenanceMachines}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均稼働率</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overallStats.averageUtilization}%</div>
            <Progress value={overallStats.averageUtilization} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Machine Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {machines.map((machine) => (
          <Card key={machine.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{machine.name}</CardTitle>
                <Badge
                  variant={
                    machine.status === "running"
                      ? "default"
                      : machine.status === "maintenance"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {machine.status === "running" && "稼働中"}
                  {machine.status === "maintenance" && "メンテナンス"}
                  {machine.status === "idle" && "待機中"}
                </Badge>
              </div>
              <CardDescription>
                現在の作業: {machine.currentJob} | 作業者: {machine.operator}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>稼働率</span>
                  <span className="font-medium">{machine.utilization}%</span>
                </div>
                <Progress value={machine.utilization} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">前回メンテナンス</p>
                  <p className="font-medium">{machine.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">次回メンテナンス</p>
                  <p className="font-medium">{machine.nextMaintenance}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground">総稼働時間</p>
                <p className="font-medium">{machine.totalHours.toLocaleString()} 時間</p>
              </div>

              {machine.issues.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-destructive flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    注意事項
                  </p>
                  {machine.issues.map((issue, index) => (
                    <p key={index} className="text-sm text-muted-foreground bg-destructive/10 p-2 rounded">
                      {issue}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  詳細表示
                </Button>
                <Button variant="outline" size="sm">
                  <Wrench className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
