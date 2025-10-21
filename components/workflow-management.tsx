"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, User, FileText, ImageIcon, Calendar, CheckCircle, AlertCircle, Play } from "lucide-react"

// ワークフロー段階の定義
const workflowStages = [
  { id: "sales", name: "営業", color: "bg-blue-500" },
  { id: "temp-design", name: "仮設計", color: "bg-yellow-500" },
  { id: "main-design", name: "本設計", color: "bg-orange-500" },
  { id: "production", name: "生産管理", color: "bg-green-500" },
  { id: "logistics", name: "物流", color: "bg-purple-500" },
  { id: "completed", name: "完了", color: "bg-gray-500" },
]

// モックデータ
const workflowItems = [
  {
    id: "WF001",
    title: "松山市役所 広報誌印刷",
    currentStage: "main-design",
    priority: "high",
    customer: "松山市役所",
    assignee: "田中太郎",
    dueDate: "2024-01-15",
    progress: 60,
    attachments: 3,
    history: [
      { stage: "sales", user: "営業部 佐藤", date: "2024-01-01", action: "案件確定" },
      { stage: "temp-design", user: "設計部 鈴木", date: "2024-01-05", action: "仮設計完了" },
      { stage: "main-design", user: "設計部 田中", date: "2024-01-10", action: "本設計開始" },
    ],
  },
  {
    id: "WF002",
    title: "愛媛県庁 パンフレット制作",
    currentStage: "production",
    priority: "medium",
    customer: "愛媛県庁",
    assignee: "山田花子",
    dueDate: "2024-01-20",
    progress: 80,
    attachments: 5,
    history: [
      { stage: "sales", user: "営業部 佐藤", date: "2023-12-20", action: "案件確定" },
      { stage: "temp-design", user: "設計部 鈴木", date: "2023-12-25", action: "仮設計完了" },
      { stage: "main-design", user: "設計部 田中", date: "2024-01-02", action: "本設計完了" },
      { stage: "production", user: "生産部 山田", date: "2024-01-08", action: "生産開始" },
    ],
  },
  {
    id: "WF003",
    title: "企業カタログ印刷",
    currentStage: "temp-design",
    priority: "low",
    customer: "株式会社ABC",
    assignee: "鈴木一郎",
    dueDate: "2024-01-25",
    progress: 30,
    attachments: 2,
    history: [
      { stage: "sales", user: "営業部 佐藤", date: "2024-01-08", action: "案件確定" },
      { stage: "temp-design", user: "設計部 鈴木", date: "2024-01-12", action: "仮設計開始" },
    ],
  },
]

export function WorkflowManagement() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newComment, setNewComment] = useState("")
  const [newStage, setNewStage] = useState("")

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

  const getStageInfo = (stageId: string) => {
    return workflowStages.find((stage) => stage.id === stageId) || workflowStages[0]
  }

  const handleStageUpdate = (itemId: string, newStageId: string) => {
    console.log(`[v0] ワークフロー更新: ${itemId} -> ${newStageId}`)
    // 実際の実装では、ここでAPIを呼び出してデータベースを更新
  }

  const handleAddComment = (itemId: string, comment: string) => {
    console.log(`[v0] コメント追加: ${itemId} - ${comment}`)
    setNewComment("")
    // 実際の実装では、ここでAPIを呼び出してコメントを保存
  }

  return (
    <div className="space-y-6">
      {/* ワークフロー概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">総案件数</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">進行中</p>
                <p className="text-2xl font-bold text-orange-600">18</p>
              </div>
              <Play className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">遅延案件</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">完了</p>
                <p className="text-2xl font-bold text-green-600">6</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflow" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflow">ワークフロー一覧</TabsTrigger>
          <TabsTrigger value="stages">工程管理</TabsTrigger>
          <TabsTrigger value="history">操作履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>案件ワークフロー管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowItems.map((item) => {
                  const stageInfo = getStageInfo(item.currentStage)
                  return (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="font-mono">
                            {item.id}
                          </Badge>
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority === "high" ? "緊急" : item.priority === "medium" ? "通常" : "低"}
                          </Badge>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                              詳細
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{item.title} - 詳細情報</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* 基本情報 */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>案件ID</Label>
                                  <p className="font-mono">{item.id}</p>
                                </div>
                                <div>
                                  <Label>顧客</Label>
                                  <p>{item.customer}</p>
                                </div>
                                <div>
                                  <Label>担当者</Label>
                                  <p>{item.assignee}</p>
                                </div>
                                <div>
                                  <Label>納期</Label>
                                  <p>{item.dueDate}</p>
                                </div>
                              </div>

                              {/* ワークフロー進捗 */}
                              <div>
                                <Label>ワークフロー進捗</Label>
                                <div className="flex items-center space-x-2 mt-2">
                                  {workflowStages.map((stage, index) => (
                                    <div key={stage.id} className="flex items-center">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                                          stage.id === item.currentStage
                                            ? stage.color
                                            : workflowStages.findIndex((s) => s.id === item.currentStage) > index
                                              ? "bg-green-500"
                                              : "bg-gray-300"
                                        }`}
                                      >
                                        {index + 1}
                                      </div>
                                      {index < workflowStages.length - 1 && (
                                        <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                  現在の工程: {getStageInfo(item.currentStage).name}
                                </p>
                              </div>

                              {/* 操作履歴 */}
                              <div>
                                <Label>操作履歴</Label>
                                <div className="space-y-2 mt-2">
                                  {item.history.map((entry, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                                      <div className={`w-3 h-3 rounded-full ${getStageInfo(entry.stage).color}`}></div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{entry.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {entry.user} - {entry.date}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 工程更新 */}
                              <div className="space-y-3">
                                <Label>工程更新</Label>
                                <div className="flex space-x-2">
                                  <Select value={newStage} onValueChange={setNewStage}>
                                    <SelectTrigger className="flex-1">
                                      <SelectValue placeholder="次の工程を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {workflowStages.map((stage) => (
                                        <SelectItem key={stage.id} value={stage.id}>
                                          {stage.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button onClick={() => handleStageUpdate(item.id, newStage)} disabled={!newStage}>
                                    更新
                                  </Button>
                                </div>
                              </div>

                              {/* コメント追加 */}
                              <div className="space-y-3">
                                <Label>コメント追加</Label>
                                <Textarea
                                  placeholder="作業内容や引き継ぎ事項を入力..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button
                                  onClick={() => handleAddComment(item.id, newComment)}
                                  disabled={!newComment.trim()}
                                >
                                  コメント追加
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {item.assignee}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.dueDate}
                          </span>
                          <span className="flex items-center">
                            <ImageIcon className="w-4 h-4 mr-1" />
                            {item.attachments}件
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${stageInfo.color} text-white`}>{stageInfo.name}</Badge>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stages" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>工程別案件管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workflowStages.slice(0, -1).map((stage) => {
                  const stageItems = workflowItems.filter((item) => item.currentStage === stage.id)
                  return (
                    <div key={stage.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                        <h3 className="font-semibold">{stage.name}</h3>
                        <Badge variant="secondary">{stageItems.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {stageItems.map((item) => (
                          <div key={item.id} className="p-2 bg-muted rounded text-sm">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-muted-foreground">{item.customer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>操作履歴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflowItems
                  .flatMap((item) =>
                    item.history.map((entry, index) => ({
                      ...entry,
                      itemId: item.id,
                      itemTitle: item.title,
                      key: `${item.id}-${index}`,
                    })),
                  )
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry) => (
                    <div key={entry.key} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${getStageInfo(entry.stage).color}`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{entry.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.itemTitle} ({entry.itemId})
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{entry.user}</p>
                        <p>{entry.date}</p>
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
