import { MainLayout } from "@/components/main-layout"
import { OutsourcingManagement } from "@/components/outsourcing-management"

export default function OutsourcingPage() {
  return (
    <MainLayout currentPage="外注・製品管理">
      <OutsourcingManagement />
    </MainLayout>
  )
}
