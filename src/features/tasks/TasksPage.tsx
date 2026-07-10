'use client';
import { useState } from 'react';
import { Task } from '@/types';
import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation } from '@/services/tasksApi';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TaskTable } from './TaskTable';
import { TaskForm } from './TaskForm';
import { TaskTableSkeleton } from './TaskTableSkeleton';

export function TasksPage() {
  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  function openCreate() { setEditingTask(null); setOpen(true); }
  function openEdit(task: Task) { setEditingTask(task); setOpen(true); }
  function close() { setOpen(false); setEditingTask(null); }

  async function handleSubmit(data: Partial<Task>) {
    if (editingTask) {
      await updateTask({ id: editingTask.id, ...data });
    } else {
      await addTask(data);
    }
    close();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <Button onClick={openCreate}>+ Add Task</Button>
      </div>

      {isLoading ? <TaskTableSkeleton /> : <TaskTable tasks={tasks} onEdit={openEdit} />}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTask ? 'Edit Task' : 'New Task'}</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <TaskForm task={editingTask ?? undefined} onSubmit={handleSubmit} onCancel={close} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
