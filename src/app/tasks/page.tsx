import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TasksPage } from '@/features/tasks/TasksPage';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Tasks() {
  return (
    <DashboardLayout>
      <PageTransition>
        <TasksPage />
      </PageTransition>
    </DashboardLayout>
  );
}
