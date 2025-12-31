import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  startDate: z.date(),
  endDate: z.date(),
  progress: z.number().min(0).max(100),
  status: z.enum(['not-started', 'in-progress', 'completed', 'delayed']),
  dependencies: z.array(z.string().uuid()),
  color: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  tasks: z.array(TaskSchema),
  viewMode: z.enum(['day', 'week', 'month']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TaskFormData = z.infer<typeof TaskSchema>;
export type ProjectFormData = z.infer<typeof ProjectSchema>;
