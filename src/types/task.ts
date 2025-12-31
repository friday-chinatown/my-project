export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'delayed';

export type ViewMode = 'day' | 'week' | 'month';

export interface Task {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  status: TaskStatus;
  dependencies: string[];
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  viewMode: ViewMode;
  createdAt: Date;
  updatedAt: Date;
}
