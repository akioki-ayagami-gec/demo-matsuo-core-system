import { MainLayout } from "@/components/main-layout"
import { ProductionManagement } from "@/components/production-management"

export default function ProductionPage() {
  return (
    <MainLayout currentPage="生産管理">
      <ProductionManagement />
    </MainLayout>
  )
}
