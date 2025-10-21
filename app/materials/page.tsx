import { MainLayout } from "@/components/main-layout"
import { MaterialsManagement } from "@/components/materials-management"

export default function MaterialsPage() {
  return (
    <MainLayout currentPage="資材・調達管理">
      <MaterialsManagement />
    </MainLayout>
  )
}
