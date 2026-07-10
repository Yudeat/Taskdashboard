import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TasksPage } from '@/features/tasks/TasksPage';

export default function Tasks() {
  return (
    <DashboardLayout>
      <TasksPage />
    </DashboardLayout>
  );
}
