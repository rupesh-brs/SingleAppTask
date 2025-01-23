import { z } from 'zod';

export const todoSchema = z.object({
  userId: z.number().positive(),
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;
