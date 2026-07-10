'use client';
import { Task } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TaskActions } from './TaskActions';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export function TaskTable({ tasks, onEdit }: TaskTableProps) {
  if (tasks.length === 0) return <p className="text-zinc-500 py-4">No tasks yet.</p>;

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
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell className="text-zinc-500">{task.description}</TableCell>
            <TableCell className="capitalize">{task.status}</TableCell>
            <TableCell className="capitalize">{task.priority}</TableCell>
            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
            <TableCell><TaskActions task={task} onEdit={onEdit} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
