import { MainLayout } from "@/components/main-layout"
import { OrderManagement } from "@/components/order-management"

export default function OrdersPage() {
  return (
    <MainLayout currentPage="受注管理">
      <OrderManagement />
    </MainLayout>
  )
}
