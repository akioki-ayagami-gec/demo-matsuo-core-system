import { MainLayout } from "@/components/main-layout"
import { WorkflowManagement } from "@/components/workflow-management"

export default function WorkflowPage() {
  return (
    <MainLayout currentPage="ワークフロー管理">
      <WorkflowManagement />
    </MainLayout>
  )
}
