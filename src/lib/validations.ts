import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  status: z.enum(['pending', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().min(1, 'Date is required')
    .refine((val) => val >= new Date().toISOString().split('T')[0], {
      message: 'Date cannot be in the past',
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;
