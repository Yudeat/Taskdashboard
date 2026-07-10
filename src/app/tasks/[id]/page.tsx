import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TaskDetailPage } from '@/features/tasks/TaskDetailPage';

export default async function TaskDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <TaskDetailPage id={id} />
    </DashboardLayout>
  );
}
