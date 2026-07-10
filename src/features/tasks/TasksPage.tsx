'use client';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Task } from '@/types';
import { RootState } from '@/store/store';
import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation } from '@/services/tasksApi';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { WifiOff } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { TaskTable } from './TaskTable';
import { TaskForm } from './TaskForm';
import { TaskTableSkeleton } from './TaskTableSkeleton';
import { TaskFilters } from './TaskFilters';

export function TasksPage() {
  const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery();
  const { searchQuery, statusFilter, priorityFilter, sortOrder } = useSelector((state: RootState) => state.ui);
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.dueDate.localeCompare(b.dueDate)
          : b.dueDate.localeCompare(a.dueDate)
      );
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortOrder]);

  function openCreate() {
     setEditingTask(null);
      setOpen(true); 
    }
  function openEdit(task: Task) { 
    setEditingTask(task); 
    setOpen(true); 
  }
  function close() {
    setOpen(false);
    setEditingTask(null);
    setSubmitError(null);
  }

  async function handleSubmit(data: Partial<Task>) {
    try {
      if (editingTask) {
        await updateTask({ id: editingTask.id, ...data }).unwrap();
      } else {
        await addTask(data).unwrap();
      }
      close();
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <Button onClick={openCreate}>+ Add Task</Button>
      </div>

      <TaskFilters />

      {isLoading ? (
        <TaskTableSkeleton />
      ) : isError ? (
        <EmptyState
          icon={WifiOff}
          title="Failed to load tasks"
          description="Check your connection and try again."
          action={<Button variant="outline" onClick={refetch}>Retry</Button>}
        />
      ) : (
        <TaskTable tasks={filteredTasks} onEdit={openEdit} />
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTask ? 'Edit Task' : 'New Task'}</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {submitError && (
              <p className="text-sm text-red-500 mb-3">{submitError}</p>
            )}
            <TaskForm task={editingTask ?? undefined} onSubmit={handleSubmit} onCancel={close} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
