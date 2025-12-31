import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from './storage';
import type { Project } from '../types/task';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockProject: Project = {
    id: 'test-project',
    name: 'Test Project',
    tasks: [
      {
        id: 'task-1',
        title: 'Test Task',
        description: 'Test Description',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-05'),
        progress: 50,
        status: 'in-progress',
        dependencies: [],
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      },
    ],
    viewMode: 'week',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  describe('save and load', () => {
    it('saves and loads project correctly', () => {
      storage.save(mockProject);
      const loaded = storage.load();

      expect(loaded).not.toBeNull();
      expect(loaded?.id).toBe(mockProject.id);
      expect(loaded?.name).toBe(mockProject.name);
      expect(loaded?.tasks.length).toBe(1);
      expect(loaded?.tasks[0].title).toBe('Test Task');
    });

    it('preserves Date objects', () => {
      storage.save(mockProject);
      const loaded = storage.load();

      expect(loaded?.tasks[0].startDate).toBeInstanceOf(Date);
      expect(loaded?.tasks[0].endDate).toBeInstanceOf(Date);
      expect(loaded?.tasks[0].startDate.toISOString()).toBe(mockProject.tasks[0].startDate.toISOString());
    });

    it('returns null when no data exists', () => {
      const loaded = storage.load();
      expect(loaded).toBeNull();
    });
  });

  describe('clear', () => {
    it('clears stored data', () => {
      storage.save(mockProject);
      storage.clear();
      const loaded = storage.load();

      expect(loaded).toBeNull();
    });
  });

  describe('export and import', () => {
    it('exports project as JSON string', () => {
      const json = storage.export(mockProject);
      expect(typeof json).toBe('string');
      expect(JSON.parse(json)).toBeTruthy();
    });

    it('imports project from JSON string', () => {
      const json = storage.export(mockProject);
      const imported = storage.import(json);

      expect(imported.id).toBe(mockProject.id);
      expect(imported.name).toBe(mockProject.name);
      expect(imported.tasks[0].title).toBe('Test Task');
    });

    it('throws error on invalid JSON', () => {
      expect(() => storage.import('invalid json')).toThrow();
    });
  });
});
