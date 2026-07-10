import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardPage } from '@/features/dashboard/DashboardPage';

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
