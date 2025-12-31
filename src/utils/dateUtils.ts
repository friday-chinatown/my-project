import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  differenceInDays,
  addDays,
  format,
} from 'date-fns';
import type { ViewMode } from '../types/task';

export const getTimelineRange = (tasks: { startDate: Date; endDate: Date }[], viewMode: ViewMode) => {
  if (tasks.length === 0) {
    const today = new Date();
    return {
      start: startOfWeek(today),
      end: endOfWeek(addDays(today, 30)),
    };
  }

  const allDates = tasks.flatMap((t) => [t.startDate, t.endDate]);
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Add padding
  const paddedStart = addDays(minDate, -7);
  const paddedEnd = addDays(maxDate, 7);

  return {
    start: viewMode === 'month' ? startOfMonth(paddedStart) : startOfWeek(paddedStart),
    end: viewMode === 'month' ? endOfMonth(paddedEnd) : endOfWeek(paddedEnd),
  };
};

export const getTimelineColumns = (start: Date, end: Date, viewMode: ViewMode) => {
  switch (viewMode) {
    case 'day':
      return eachDayOfInterval({ start, end });
    case 'week':
      return eachWeekOfInterval({ start, end });
    case 'month':
      return eachMonthOfInterval({ start, end });
  }
};

export const getColumnWidth = (viewMode: ViewMode): number => {
  switch (viewMode) {
    case 'day':
      return 40;
    case 'week':
      return 80;
    case 'month':
      return 120;
  }
};

export const calculateTaskPosition = (
  taskStart: Date,
  taskEnd: Date,
  timelineStart: Date,
  columnWidth: number
): { left: number; width: number } => {
  const startOffset = differenceInDays(taskStart, timelineStart);
  const duration = differenceInDays(taskEnd, taskStart) + 1;

  return {
    left: startOffset * columnWidth,
    width: duration * columnWidth,
  };
};

export const formatColumnHeader = (date: Date, viewMode: ViewMode): string => {
  switch (viewMode) {
    case 'day':
      return format(date, 'MMM d');
    case 'week':
      return format(date, 'MMM d');
    case 'month':
      return format(date, 'MMM yyyy');
  }
};
