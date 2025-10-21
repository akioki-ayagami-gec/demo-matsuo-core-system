"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardCheck, Save, Plus } from "lucide-react"

export function DailyReportForm() {
  const [reportData, setReportData] = useState({
    machine: "",
    operator: "",
    startTime: "",
    endTime: "",
    jobId: "",
    quantity: "",
    defects: "",
    notes: "",
  })

  const machines = ["輪転機1号機", "輪転機2号機", "印刷機1号機", "印刷機2号機", "後加工機"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement report submission logic
    console.log("Daily report submitted:", reportData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          日報入力
        </CardTitle>
        <CardDescription>作業実績を記録してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="machine">機械名</Label>
              <Select
                value={reportData.machine}
                onValueChange={(value) => setReportData({ ...reportData, machine: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="機械を選択" />
                </SelectTrigger>
                <SelectContent>
                  {machines.map((machine) => (
                    <SelectItem key={machine} value={machine}>
                      {machine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operator">作業者</Label>
              <Input
                id="operator"
                value={reportData.operator}
                onChange={(e) => setReportData({ ...reportData, operator: e.target.value })}
                placeholder="作業者名"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">開始時刻</Label>
              <Input
                id="startTime"
                type="time"
                value={reportData.startTime}
                onChange={(e) => setReportData({ ...reportData, startTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">終了時刻</Label>
              <Input
                id="endTime"
                type="time"
                value={reportData.endTime}
                onChange={(e) => setReportData({ ...reportData, endTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobId">案件ID</Label>
              <Input
                id="jobId"
                value={reportData.jobId}
                onChange={(e) => setReportData({ ...reportData, jobId: e.target.value })}
                placeholder="J001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">生産数量</Label>
              <Input
                id="quantity"
                type="number"
                value={reportData.quantity}
                onChange={(e) => setReportData({ ...reportData, quantity: e.target.value })}
                placeholder="1000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defects">不良品数</Label>
            <Input
              id="defects"
              type="number"
              value={reportData.defects}
              onChange={(e) => setReportData({ ...reportData, defects: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">備考・特記事項</Label>
            <Textarea
              id="notes"
              value={reportData.notes}
              onChange={(e) => setReportData({ ...reportData, notes: e.target.value })}
              placeholder="作業中の問題点や改善点があれば記入してください"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
            <Button type="button" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
