"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Settings } from "lucide-react"

export function ProductionScheduler() {
  // Mock schedule data
  const scheduleData = [
    {
      id: "J001",
      title: "トヨタ向け圧縮ばね製造",
      machine: "CNCばね成形機A",
      startTime: "08:00",
      endTime: "12:00",
      status: "in-progress",
      progress: 85,
      operator: "田中",
      priority: "high",
    },
    {
      id: "J002",
      title: "引張ばね製造",
      machine: "ばね巻き機B",
      startTime: "09:30",
      endTime: "15:00",
      status: "in-progress",
      progress: 45,
      operator: "佐藤",
      priority: "medium",
    },
    {
      id: "J003",
      title: "板ばね部品加工",
      machine: "プレス機1号機",
      startTime: "13:00",
      endTime: "16:00",
      status: "scheduled",
      progress: 0,
      operator: "鈴木",
      priority: "low",
    },
    {
      id: "J004",
      title: "温度センサー組立",
      machine: "組立・検査ライン",
      startTime: "14:00",
      endTime: "17:00",
      status: "scheduled",
      progress: 0,
      operator: "山田",
      priority: "medium",
    },
  ]

  const machines = ["CNCばね成形機A", "ばね巻き機B", "プレス機1号機", "深絞りプレス機", "組立・検査ライン"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">生産スケジューラー</h2>
          <p className="text-muted-foreground">機械別の作業スケジュールと進捗管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            スケジュール調整
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            新規スケジュール
          </Button>
        </div>
      </div>

      {/* Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle>本日のスケジュール</CardTitle>
          <CardDescription>機械別の作業予定と進捗状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {machines.map((machine) => {
              const machineJobs = scheduleData.filter((job) => job.machine === machine)
              return (
                <div key={machine} className="space-y-2">
                  <h3 className="font-semibold text-lg">{machine}</h3>
                  <div className="space-y-2">
                    {machineJobs.length > 0 ? (
                      machineJobs.map((job) => (
                        <div key={job.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                          <div className="flex-shrink-0">
                            <Badge
                              variant={
                                job.priority === "high"
                                  ? "destructive"
                                  : job.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {job.priority === "high" && "高"}
                              {job.priority === "medium" && "中"}
                              {job.priority === "low" && "低"}
                            </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{job.title}</p>
                              <Badge variant="outline" className="text-xs">
                                {job.id}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {job.startTime} - {job.endTime}
                              </span>
                              <span>作業者: {job.operator}</span>
                              <Badge variant={job.status === "in-progress" ? "default" : "outline"} className="text-xs">
                                {job.status === "in-progress" ? "進行中" : "予定"}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{job.progress}%</p>
                            <div className="w-20 bg-muted rounded-full h-2 mt-1">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${job.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground bg-muted/30 rounded-lg border-2 border-dashed">
                        本日の予定はありません
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
