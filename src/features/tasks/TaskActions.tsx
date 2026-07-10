'use client';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
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
      <ConfirmDialog
        trigger={<Button size="sm" variant="destructive">Delete</Button>}
        title="Delete task?"
        description={`"${task.title}" will be permanently removed.`}
        onConfirm={() => deleteTask(task.id)}
      />
    </div>
  );
}
