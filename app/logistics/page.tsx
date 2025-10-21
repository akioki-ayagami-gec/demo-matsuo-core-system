import { MainLayout } from "@/components/main-layout"
import { LogisticsManagement } from "@/components/logistics-management"

export default function LogisticsPage() {
  return (
    <MainLayout currentPage="物流・自動化">
      <LogisticsManagement />
    </MainLayout>
  )
}
