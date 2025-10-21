"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { History, Paperclip, Download, Eye, Upload, Search, Filter, FileText, ImageIcon, File } from "lucide-react"

// モックデータ
const auditLogs = [
  {
    id: "AL001",
    timestamp: "2024-01-16 14:30:25",
    user: "田中太郎",
    department: "生産管理部",
    action: "案件状態更新",
    module: "ワークフロー管理",
    target: "松山市役所 広報誌印刷 (WF001)",
    details: "仮設計 → 本設計に進捗更新",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0.0",
    severity: "info",
  },
  {
    id: "AL002",
    timestamp: "2024-01-16 14:25:12",
    user: "佐藤花子",
    department: "営業部",
    action: "受注登録",
    module: "受注管理",
    target: "新規受注 (OR003)",
    details: "愛媛県庁パンフレット案件を新規登録",
    ipAddress: "192.168.1.105",
    userAgent: "Chrome 120.0.0.0",
    severity: "info",
  },
  {
    id: "AL003",
    timestamp: "2024-01-16 14:20:45",
    user: "山田一郎",
    department: "資材部",
    action: "在庫更新",
    module: "資材・調達管理",
    target: "コート紙 A4 90kg (PI001)",
    details: "在庫数量を15000枚から12000枚に更新",
    ipAddress: "192.168.1.110",
    userAgent: "Chrome 120.0.0.0",
    severity: "warning",
  },
  {
    id: "AL004",
    timestamp: "2024-01-16 14:15:30",
    user: "鈴木次郎",
    department: "物流部",
    action: "AGF制御",
    module: "物流・自動化",
    target: "AGF-Alpha (AGF001)",
    details: "緊急停止指示を実行",
    ipAddress: "192.168.1.115",
    userAgent: "Chrome 120.0.0.0",
    severity: "critical",
  },
  {
    id: "AL005",
    timestamp: "2024-01-16 14:10:18",
    user: "高橋美咲",
    department: "品質管理部",
    action: "品質検査記録",
    module: "生産管理",
    target: "品質検査 (QC001)",
    details: "松山市役所案件の品質検査を完了",
    ipAddress: "192.168.1.120",
    userAgent: "Chrome 120.0.0.0",
    severity: "info",
  },
]

const attachments = [
  {
    id: "ATT001",
    fileName: "松山市役所_仕様書.pdf",
    fileType: "pdf",
    fileSize: "2.4 MB",
    uploadedBy: "営業部 佐藤",
    uploadDate: "2024-01-15 10:30",
    relatedModule: "受注管理",
    relatedTarget: "松山市役所 広報誌印刷",
    description: "印刷仕様詳細書",
    downloadCount: 12,
    lastAccessed: "2024-01-16 09:15",
  },
  {
    id: "ATT002",
    fileName: "デザイン案_v2.jpg",
    fileType: "image",
    fileSize: "5.8 MB",
    uploadedBy: "設計部 田中",
    uploadDate: "2024-01-14 16:45",
    relatedModule: "ワークフロー管理",
    relatedTarget: "企業パンフレット制作",
    description: "最終デザイン案",
    downloadCount: 8,
    lastAccessed: "2024-01-16 11:20",
  },
  {
    id: "ATT003",
    fileName: "品質検査報告書.xlsx",
    fileType: "excel",
    fileSize: "1.2 MB",
    uploadedBy: "品質管理部 高橋",
    uploadDate: "2024-01-16 14:10",
    relatedModule: "生産管理",
    relatedTarget: "品質検査記録",
    description: "2024年1月第2週品質検査結果",
    downloadCount: 3,
    lastAccessed: "2024-01-16 14:25",
  },
  {
    id: "ATT004",
    fileName: "外注先評価シート.docx",
    fileType: "word",
    fileSize: "890 KB",
    uploadedBy: "調達部 山田",
    uploadDate: "2024-01-13 13:20",
    relatedModule: "外注・製品管理",
    relatedTarget: "外注先管理",
    description: "2023年度外注先評価結果",
    downloadCount: 15,
    lastAccessed: "2024-01-15 16:30",
  },
]

export function AuditManagement() {
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null)
  const [uploadDialog, setUploadDialog] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />
      case "excel":
        return <File className="w-5 h-5 text-green-600" />
      case "word":
        return <File className="w-5 h-5 text-blue-600" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const handleDownload = (attachmentId: string) => {
    console.log(`[v0] ファイルダウンロード: ${attachmentId}`)
    // 実際の実装では、ファイルダウンロード処理を行う
  }

  const handleUpload = () => {
    console.log("[v0] ファイルアップロード処理")
    setUploadDialog(false)
    // 実際の実装では、ファイルアップロード処理を行う
  }

  return (
    <div className="space-y-6">
      {/* 操作履歴・添付機能概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今日の操作数</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <History className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">添付ファイル</p>
                <p className="text-2xl font-bold">1,248</p>
              </div>
              <Paperclip className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">重要操作</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <History className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ストレージ使用量</p>
                <p className="text-2xl font-bold text-purple-600">2.8GB</p>
              </div>
              <Paperclip className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audit-logs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="audit-logs">操作履歴</TabsTrigger>
          <TabsTrigger value="attachments">添付ファイル管理</TabsTrigger>
        </TabsList>

        <TabsContent value="audit-logs" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>システム操作履歴</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  検索
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  フィルタ
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  エクスポート
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {log.id}
                        </Badge>
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity === "critical" ? "重要" : log.severity === "warning" ? "警告" : "情報"}
                        </Badge>
                        <span className="font-semibold">{log.action}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-2">
                      <div>
                        <p className="text-muted-foreground">ユーザー</p>
                        <p className="font-medium">{log.user}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">部署</p>
                        <p className="font-medium">{log.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">モジュール</p>
                        <p className="font-medium">{log.module}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">対象</p>
                        <p className="font-medium">{log.target}</p>
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground">操作詳細</p>
                      <p className="text-sm">{log.details}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>IP: {log.ipAddress}</span>
                        <span>UA: {log.userAgent}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLog(log)}>
                            詳細
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>操作履歴詳細 - {log.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>操作日時</Label>
                                <p>{log.timestamp}</p>
                              </div>
                              <div>
                                <Label>重要度</Label>
                                <Badge className={getSeverityColor(log.severity)}>
                                  {log.severity === "critical" ? "重要" : log.severity === "warning" ? "警告" : "情報"}
                                </Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>ユーザー</Label>
                                <p>
                                  {log.user} ({log.department})
                                </p>
                              </div>
                              <div>
                                <Label>操作</Label>
                                <p>{log.action}</p>
                              </div>
                            </div>
                            <div>
                              <Label>対象システム・項目</Label>
                              <p>
                                {log.module} - {log.target}
                              </p>
                            </div>
                            <div>
                              <Label>操作詳細</Label>
                              <p className="p-3 bg-muted rounded">{log.details}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>IPアドレス</Label>
                                <p className="font-mono">{log.ipAddress}</p>
                              </div>
                              <div>
                                <Label>ユーザーエージェント</Label>
                                <p className="text-sm">{log.userAgent}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>添付ファイル管理</CardTitle>
              <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    ファイルアップロード
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>ファイルアップロード</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>ファイル選択</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          ファイルをドラッグ&ドロップするか、クリックして選択
                        </p>
                        <Button variant="outline">ファイル選択</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>関連モジュール</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="モジュールを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workflow">ワークフロー管理</SelectItem>
                            <SelectItem value="production">生産管理</SelectItem>
                            <SelectItem value="orders">受注管理</SelectItem>
                            <SelectItem value="materials">資材・調達管理</SelectItem>
                            <SelectItem value="outsourcing">外注・製品管理</SelectItem>
                            <SelectItem value="logistics">物流・自動化</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>関連案件・項目</Label>
                        <Input placeholder="案件名や項目名を入力" />
                      </div>
                    </div>
                    <div>
                      <Label>ファイル説明</Label>
                      <Textarea placeholder="ファイルの内容や用途を説明" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setUploadDialog(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={handleUpload}>アップロード</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(attachment.fileType)}
                        <div>
                          <h3 className="font-semibold">{attachment.fileName}</h3>
                          <p className="text-sm text-muted-foreground">{attachment.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{attachment.fileSize}</p>
                        <p className="text-xs text-muted-foreground">DL: {attachment.downloadCount}回</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">アップロード者</p>
                        <p className="font-medium">{attachment.uploadedBy}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">アップロード日</p>
                        <p className="font-medium">{attachment.uploadDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">関連モジュール</p>
                        <p className="font-medium">{attachment.relatedModule}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">最終アクセス</p>
                        <p className="font-medium">{attachment.lastAccessed}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">関連: {attachment.relatedTarget}</div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          プレビュー
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownload(attachment.id)}>
                          <Download className="w-4 h-4 mr-2" />
                          ダウンロード
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedAttachment(attachment)}>
                              詳細
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>ファイル詳細 - {attachment.fileName}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                {getFileIcon(attachment.fileType)}
                                <div>
                                  <h3 className="font-semibold text-lg">{attachment.fileName}</h3>
                                  <p className="text-muted-foreground">{attachment.description}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>ファイルサイズ</Label>
                                  <p>{attachment.fileSize}</p>
                                </div>
                                <div>
                                  <Label>ファイル形式</Label>
                                  <p className="uppercase">{attachment.fileType}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>アップロード者</Label>
                                  <p>{attachment.uploadedBy}</p>
                                </div>
                                <div>
                                  <Label>アップロード日時</Label>
                                  <p>{attachment.uploadDate}</p>
                                </div>
                              </div>
                              <div>
                                <Label>関連情報</Label>
                                <p>
                                  {attachment.relatedModule} - {attachment.relatedTarget}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>ダウンロード回数</Label>
                                  <p>{attachment.downloadCount}回</p>
                                </div>
                                <div>
                                  <Label>最終アクセス</Label>
                                  <p>{attachment.lastAccessed}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
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
