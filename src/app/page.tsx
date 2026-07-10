import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Home() {
  return (
    <DashboardLayout>
      <PageTransition>
        <DashboardPage />
      </PageTransition>
    </DashboardLayout>
  );
}
