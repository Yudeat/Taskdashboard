'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } from '@/services/tasksApi';
import { Task } from '@/types';
import { fadeUp } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TaskForm } from './TaskForm';

const statusColor: Record<Task['status'], string> = {
  'pending':     'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'completed':   'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const priorityColor: Record<Task['priority'], string> = {
  low:    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
  high:   'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export function TaskDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-xl space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <p className="text-lg font-medium">Task not found</p>
        <p className="text-sm text-zinc-500">It may have been deleted.</p>
        <Button variant="outline" onClick={() => router.push('/tasks')}>Back to Tasks</Button>
      </div>
    );
  }

  async function handleDelete() {
    await deleteTask(task!.id);
    router.push('/tasks');
  }

  async function handleEdit(data: Partial<Task>) {
    await updateTask({ id: task!.id, ...data });
    setEditOpen(false);
  }

  return (
    <>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-xl space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold leading-tight">{task.title}</h1>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
            </Button>
          </div>
        </div>

        <div className="rounded-lg border p-5 space-y-5">
          <Field label="Description">
            <p className="text-zinc-600 dark:text-zinc-400">{task.description}</p>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <Badge className={statusColor[task.status]}>{task.status}</Badge>
            </Field>
            <Field label="Priority">
              <Badge className={priorityColor[task.priority]}>{task.priority}</Badge>
            </Field>
            <Field label="Due Date">
              {new Date(task.dueDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
            </Field>
            <Field label="Task ID">
              <span className="font-mono text-zinc-400">#{task.id}</span>
            </Field>
          </div>
        </div>
      </motion.div>

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <TaskForm task={task} onSubmit={handleEdit} onCancel={() => setEditOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
