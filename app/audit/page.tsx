import { MainLayout } from "@/components/main-layout"
import { AuditManagement } from "@/components/audit-management"

export default function AuditPage() {
  return (
    <MainLayout currentPage="操作履歴・添付">
      <AuditManagement />
    </MainLayout>
  )
}
