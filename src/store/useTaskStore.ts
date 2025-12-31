import { create } from 'zustand';
import type { Task, Project, ViewMode, TaskStatus } from '../types/task';
import { storage } from '../utils/storage';

interface TaskStore {
  project: Project;
  selectedTaskId: string | null;

  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedTask: (id: string | null) => void;
  loadProject: () => void;
  saveProject: () => void;
  clearProject: () => void;
  importProject: (jsonString: string) => void;
  exportProject: () => string;
}

const calculateTaskStatus = (task: Task): TaskStatus => {
  const now = new Date();
  if (task.progress === 100) return 'completed';
  if (task.progress === 0) return 'not-started';
  if (now > task.endDate) return 'delayed';
  return 'in-progress';
};

const createDefaultProject = (): Project => ({
  id: crypto.randomUUID(),
  name: 'My Gantt Project',
  tasks: [],
  viewMode: 'week',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const useTaskStore = create<TaskStore>((set, get) => ({
  project: createDefaultProject(),
  selectedTaskId: null,

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      status: calculateTaskStatus({ ...taskData, id: '', createdAt: new Date(), updatedAt: new Date(), status: 'not-started' } as Task),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => {
      const updatedProject = {
        ...state.project,
        tasks: [...state.project.tasks, newTask],
        updatedAt: new Date(),
      };

      // Auto-save after 3 seconds (debounced in practice)
      setTimeout(() => {
        storage.save(updatedProject);
      }, 100);

      return { project: updatedProject };
    });
  },

  updateTask: (id, updates) => {
    set((state) => {
      const updatedTasks = state.project.tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, ...updates, updatedAt: new Date() };
          return {
            ...updatedTask,
            status: calculateTaskStatus(updatedTask),
          };
        }
        return task;
      });

      const updatedProject = {
        ...state.project,
        tasks: updatedTasks,
        updatedAt: new Date(),
      };

      setTimeout(() => {
        storage.save(updatedProject);
      }, 100);

      return { project: updatedProject };
    });
  },

  deleteTask: (id) => {
    set((state) => {
      const updatedProject = {
        ...state.project,
        tasks: state.project.tasks.filter((task) => task.id !== id),
        updatedAt: new Date(),
      };

      setTimeout(() => {
        storage.save(updatedProject);
      }, 100);

      return {
        project: updatedProject,
        selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
      };
    });
  },

  setViewMode: (mode) => {
    set((state) => ({
      project: { ...state.project, viewMode: mode, updatedAt: new Date() },
    }));
  },

  setSelectedTask: (id) => {
    set({ selectedTaskId: id });
  },

  loadProject: () => {
    const loaded = storage.load();
    if (loaded) {
      set({ project: loaded });
    }
  },

  saveProject: () => {
    const { project } = get();
    storage.save(project);
  },

  clearProject: () => {
    storage.clear();
    set({ project: createDefaultProject(), selectedTaskId: null });
  },

  importProject: (jsonString) => {
    try {
      const imported = storage.import(jsonString);
      set({ project: imported, selectedTaskId: null });
      storage.save(imported);
    } catch (error) {
      throw new Error('Failed to import project');
    }
  },

  exportProject: () => {
    const { project } = get();
    return storage.export(project);
  },
}));

// Load project on initialization
if (typeof window !== 'undefined') {
  const stored = storage.load();
  if (stored) {
    useTaskStore.setState({ project: stored });
  }
}
