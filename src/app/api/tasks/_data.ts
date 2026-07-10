import { Task } from '@/types';

// ponytail: in-memory store, replace with DB when needed
export const tasks: Task[] = [
  { id: '1', title: 'Task 1', description: 'This is task 1', status: 'pending', priority: 'low', dueDate: '2024-06-30' },
  { id: '2', title: 'Task 2', description: 'This is task 2', status: 'in-progress', priority: 'medium', dueDate: '2024-07-15' },
];
