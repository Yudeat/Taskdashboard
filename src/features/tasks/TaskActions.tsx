'use client';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { useDeleteTaskMutation } from '@/services/tasksApi';

interface TaskActionsProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskActions({ task, onEdit }: TaskActionsProps) {
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={() => onEdit(task)}>Edit</Button>
      <Button size="sm" variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
    </div>
  );
}
