"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, User, Bell, Database, Save, RefreshCw, Download, Upload } from "lucide-react"

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general")

  // Mock settings data
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "セキ株式会社",
    companyAddress: "愛媛県松山市○○町1-2-3",
    companyPhone: "089-123-4567",
    companyEmail: "info@seki-corp.co.jp",
    systemName: "Sシステム",
    timezone: "Asia/Tokyo",
    language: "ja",
    dateFormat: "YYYY-MM-DD",
  })

  const [userSettings, setUserSettings] = useState({
    defaultRole: "operator",
    sessionTimeout: "8",
    passwordPolicy: true,
    twoFactorAuth: false,
    autoLogout: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    urgentAlerts: true,
    dailyReports: true,
    systemMaintenance: true,
    productionAlerts: true,
    qualityAlerts: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupTime: "02:00",
    dataRetention: "365",
    logLevel: "info",
    maintenanceMode: false,
    debugMode: false,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">システム全体の設定と管理</p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                設定リロード
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>設定リロード</DialogTitle>
                <DialogDescription>システム設定を最新の状態に更新します</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  この操作により、すべてのシステム設定が最新の状態に更新されます。
                  進行中の作業がある場合は、事前に保存してください。
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    キャンセル
                  </Button>
                  <Button className="flex-1">リロード実行</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                設定保存
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>設定保存</DialogTitle>
                <DialogDescription>現在の設定内容を保存します</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  変更された設定内容をシステムに反映します。 保存後、一部の設定はシステム再起動後に有効になります。
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    キャンセル
                  </Button>
                  <Button className="flex-1">保存実行</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">一般設定</TabsTrigger>
          <TabsTrigger value="users">ユーザー管理</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
          <TabsTrigger value="system">システム設定</TabsTrigger>
          <TabsTrigger value="backup">バックアップ</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                一般設定
              </CardTitle>
              <CardDescription>会社情報とシステムの基本設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">会社名</Label>
                  <Input
                    id="companyName"
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemName">システム名</Label>
                  <Input
                    id="systemName"
                    value={generalSettings.systemName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, systemName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">会社住所</Label>
                <Input
                  id="companyAddress"
                  value={generalSettings.companyAddress}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, companyAddress: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">電話番号</Label>
                  <Input
                    id="companyPhone"
                    value={generalSettings.companyPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, companyPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">メールアドレス</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={generalSettings.companyEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, companyEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">タイムゾーン</Label>
                  <Select value={generalSettings.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">言語</Label>
                  <Select value={generalSettings.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">日付形式</Label>
                  <Select value={generalSettings.dateFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ユーザー管理設定
              </CardTitle>
              <CardDescription>ユーザーアカウントとセキュリティの設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultRole">デフォルトユーザー権限</Label>
                  <Select value={userSettings.defaultRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">管理者</SelectItem>
                      <SelectItem value="manager">マネージャー</SelectItem>
                      <SelectItem value="operator">オペレーター</SelectItem>
                      <SelectItem value="viewer">閲覧者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">セッションタイムアウト（時間）</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={userSettings.sessionTimeout}
                    onChange={(e) => setUserSettings({ ...userSettings, sessionTimeout: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>パスワードポリシー強制</Label>
                    <p className="text-sm text-muted-foreground">強力なパスワードの使用を必須にする</p>
                  </div>
                  <Switch
                    checked={userSettings.passwordPolicy}
                    onCheckedChange={(checked) => setUserSettings({ ...userSettings, passwordPolicy: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>二要素認証</Label>
                    <p className="text-sm text-muted-foreground">ログイン時の二要素認証を有効にする</p>
                  </div>
                  <Switch
                    checked={userSettings.twoFactorAuth}
                    onCheckedChange={(checked) => setUserSettings({ ...userSettings, twoFactorAuth: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自動ログアウト</Label>
                    <p className="text-sm text-muted-foreground">非アクティブ時の自動ログアウトを有効にする</p>
                  </div>
                  <Switch
                    checked={userSettings.autoLogout}
                    onCheckedChange={(checked) => setUserSettings({ ...userSettings, autoLogout: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                通知設定
              </CardTitle>
              <CardDescription>システム通知とアラートの設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>メール通知</Label>
                    <p className="text-sm text-muted-foreground">システムからのメール通知を有効にする</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>緊急アラート</Label>
                    <p className="text-sm text-muted-foreground">緊急事態発生時の即座通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.urgentAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, urgentAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>日次レポート</Label>
                    <p className="text-sm text-muted-foreground">日次レポートの自動送信</p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, dailyReports: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>システムメンテナンス通知</Label>
                    <p className="text-sm text-muted-foreground">メンテナンス予定の事前通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemMaintenance}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemMaintenance: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>生産アラート</Label>
                    <p className="text-sm text-muted-foreground">生産工程での問題発生時の通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.productionAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, productionAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>品質管理アラート</Label>
                    <p className="text-sm text-muted-foreground">品質検査での不合格時の通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.qualityAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, qualityAlerts: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                システム設定
              </CardTitle>
              <CardDescription>システムの動作とパフォーマンスの設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupTime">自動バックアップ時刻</Label>
                  <Input
                    id="backupTime"
                    type="time"
                    value={systemSettings.backupTime}
                    onChange={(e) => setSystemSettings({ ...systemSettings, backupTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">データ保持期間（日）</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={systemSettings.dataRetention}
                    onChange={(e) => setSystemSettings({ ...systemSettings, dataRetention: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logLevel">ログレベル</Label>
                <Select value={systemSettings.logLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">エラーのみ</SelectItem>
                    <SelectItem value="warn">警告以上</SelectItem>
                    <SelectItem value="info">情報以上</SelectItem>
                    <SelectItem value="debug">デバッグ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自動バックアップ</Label>
                    <p className="text-sm text-muted-foreground">定期的な自動バックアップを有効にする</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>メンテナンスモード</Label>
                    <p className="text-sm text-muted-foreground">システムメンテナンス中の表示</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>デバッグモード</Label>
                    <p className="text-sm text-muted-foreground">開発者向けデバッグ情報の表示</p>
                  </div>
                  <Switch
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, debugMode: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                バックアップ・復元
              </CardTitle>
              <CardDescription>データのバックアップと復元の管理</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">バックアップ作成</h3>
                  <div className="space-y-2">
                    <Label>バックアップの種類</Label>
                    <Select defaultValue="full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">完全バックアップ</SelectItem>
                        <SelectItem value="incremental">増分バックアップ</SelectItem>
                        <SelectItem value="differential">差分バックアップ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>バックアップ先</Label>
                    <Select defaultValue="local">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">ローカルストレージ</SelectItem>
                        <SelectItem value="cloud">クラウドストレージ</SelectItem>
                        <SelectItem value="external">外部ドライブ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    今すぐバックアップ作成
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">データ復元</h3>
                  <div className="space-y-2">
                    <Label>復元ファイル</Label>
                    <div className="flex gap-2">
                      <Input type="file" accept=".bak,.sql" />
                      <Button variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>復元オプション</Label>
                    <Select defaultValue="replace">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="replace">完全置換</SelectItem>
                        <SelectItem value="merge">マージ</SelectItem>
                        <SelectItem value="append">追加</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    データ復元実行
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">バックアップ履歴</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">完全バックアップ</p>
                      <p className="text-sm text-muted-foreground">2024-01-28 02:00 | 245MB</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        復元
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">増分バックアップ</p>
                      <p className="text-sm text-muted-foreground">2024-01-27 02:00 | 45MB</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        復元
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
