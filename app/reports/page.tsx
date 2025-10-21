import { MainLayout } from "@/components/main-layout"
import { ReportManagement } from "@/components/report-management"

export default function ReportsPage() {
  return (
    <MainLayout currentPage="帳票管理">
      <ReportManagement />
    </MainLayout>
  )
}
