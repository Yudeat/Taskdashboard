'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ClipboardList } from 'lucide-react';
import { Task } from '@/types';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/components/common/EmptyState';
import { TaskActions } from './TaskActions';
import { rowVariants, staggerContainer } from '@/lib/animations';

const MotionTableRow = motion.create(TableRow);

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export function TaskTable({ tasks, onEdit }: TaskTableProps) {
  if (tasks.length === 0) return (
    <EmptyState
      icon={ClipboardList}
      title="No tasks found"
      description="Try adjusting your filters or create a new task."
    />
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <MotionTableRow
              key={task.id}
              variants={rowVariants}
              exit="exit"
              layout
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', transition: { duration: 0.1 } }}
            >
              <TableCell className="font-medium">
                <Link href={`/tasks/${task.id}`} className="hover:underline">
                  {task.title}
                </Link>
              </TableCell>
              <TableCell className="text-zinc-500">{task.description}</TableCell>
              <TableCell className="capitalize">{task.status}</TableCell>
              <TableCell className="capitalize">{task.priority}</TableCell>
              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
              <TableCell><TaskActions task={task} onEdit={onEdit} /></TableCell>
            </MotionTableRow>
          ))}
        </AnimatePresence>
      </motion.tbody>
    </Table>
  );
}
