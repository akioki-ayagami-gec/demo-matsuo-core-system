import { MainLayout } from "@/components/main-layout"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function DashboardPage() {
  return (
    <MainLayout currentPage="ダッシュボード">
      <DashboardOverview />
    </MainLayout>
  )
}
