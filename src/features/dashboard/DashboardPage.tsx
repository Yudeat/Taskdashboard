'use client';
import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useGetTasksQuery } from '@/services/tasksApi';
import { SummaryCard } from '@/components/common/SummaryCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function DashboardPage() {
  const { data: tasks = [], isError, refetch } = useGetTasksQuery();

  const total       = tasks.length;
  const completed   = tasks.filter((t) => t.status === 'completed').length;
  const pending     = tasks.filter((t) => t.status === 'pending').length;
  const highPriority = tasks.filter((t) => t.priority === 'high').length;

  const cards = [
    { title: 'Total Tasks',    value: total },
    { title: 'Completed',      value: completed },
    { title: 'Pending',        value: pending },
    { title: 'High Priority',  value: highPriority },
  ];

  if (isError) return (
    <EmptyState
      icon={WifiOff}
      title="Failed to load dashboard"
      description="Check your connection and try again."
      action={<Button variant="outline" onClick={refetch}>Retry</Button>}
    />
  );

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={fadeUp}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
          >
            <SummaryCard title={card.title} value={card.value} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
