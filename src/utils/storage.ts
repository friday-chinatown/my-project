import type { Project } from '../types/task';

const STORAGE_KEY = 'gantt-project';

export const storage = {
  save: (project: Project): void => {
    try {
      const serialized = JSON.stringify(project, (_key, value) => {
        // Convert Date objects to ISO strings
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save project:', error);
      throw new Error('Failed to save project data');
    }
  },

  load: (): Project | null => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return null;

      const parsed = JSON.parse(serialized, (_key, value) => {
        // Convert ISO strings back to Date objects
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
          return new Date(value);
        }
        return value;
      });

      return parsed as Project;
    } catch (error) {
      console.error('Failed to load project:', error);
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  },

  export: (project: Project): string => {
    return JSON.stringify(project, null, 2);
  },

  import: (jsonString: string): Project => {
    try {
      const parsed = JSON.parse(jsonString, (_key, value) => {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
          return new Date(value);
        }
        return value;
      });
      return parsed as Project;
    } catch (error) {
      console.error('Failed to import project:', error);
      throw new Error('Invalid project data format');
    }
  },
};
