'use client';
import { useGetTasksQuery } from '@/services/tasksApi';
import { SummaryCard } from '@/components/common/SummaryCard';

export function DashboardPage() {
  const { data: tasks = [] } = useGetTasksQuery();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const highPriority = tasks.filter((t) => t.priority === 'high').length;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard title="Total Tasks" value={total} />
        <SummaryCard title="Completed" value={completed} />
        <SummaryCard title="Pending" value={pending} />
        <SummaryCard title="High Priority" value={highPriority} />
      </div>
    </div>
  );
}
