import { MainLayout } from "@/components/main-layout"
import { SystemSettings } from "@/components/system-settings"

export default function SettingsPage() {
  return (
    <MainLayout currentPage="設定">
      <SystemSettings />
    </MainLayout>
  )
}
