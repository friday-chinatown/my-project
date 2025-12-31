import { describe, it, expect } from 'vitest';
import { getColumnWidth, calculateTaskPosition, formatColumnHeader } from './dateUtils';

describe('dateUtils', () => {
  describe('getColumnWidth', () => {
    it('returns 40 for day view', () => {
      expect(getColumnWidth('day')).toBe(40);
    });

    it('returns 80 for week view', () => {
      expect(getColumnWidth('week')).toBe(80);
    });

    it('returns 120 for month view', () => {
      expect(getColumnWidth('month')).toBe(120);
    });
  });

  describe('calculateTaskPosition', () => {
    it('calculates correct position for task', () => {
      const timelineStart = new Date('2025-01-01');
      const taskStart = new Date('2025-01-05');
      const taskEnd = new Date('2025-01-10');
      const columnWidth = 40;

      const position = calculateTaskPosition(taskStart, taskEnd, timelineStart, columnWidth);

      expect(position.left).toBe(4 * 40); // 4 days offset
      expect(position.width).toBe(6 * 40); // 6 days duration (inclusive)
    });

    it('handles same day tasks', () => {
      const timelineStart = new Date('2025-01-01');
      const taskStart = new Date('2025-01-05');
      const taskEnd = new Date('2025-01-05');
      const columnWidth = 40;

      const position = calculateTaskPosition(taskStart, taskEnd, timelineStart, columnWidth);

      expect(position.width).toBe(40); // 1 day
    });
  });

  describe('formatColumnHeader', () => {
    it('formats day view correctly', () => {
      const date = new Date('2025-01-15');
      expect(formatColumnHeader(date, 'day')).toBe('Jan 15');
    });

    it('formats week view correctly', () => {
      const date = new Date('2025-01-15');
      expect(formatColumnHeader(date, 'week')).toBe('Jan 15');
    });

    it('formats month view correctly', () => {
      const date = new Date('2025-01-15');
      expect(formatColumnHeader(date, 'month')).toBe('Jan 2025');
    });
  });
});
