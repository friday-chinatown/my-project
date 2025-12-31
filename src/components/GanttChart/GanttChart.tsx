import { useMemo } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import {
  getTimelineRange,
  getTimelineColumns,
  getColumnWidth,
  calculateTaskPosition,
  formatColumnHeader,
} from '../../utils/dateUtils';
import TaskBar from './TaskBar';

export default function GanttChart() {
  const { project } = useTaskStore();

  const timelineRange = useMemo(
    () => getTimelineRange(project.tasks, project.viewMode),
    [project.tasks, project.viewMode]
  );

  const columns = useMemo(
    () => getTimelineColumns(timelineRange.start, timelineRange.end, project.viewMode),
    [timelineRange, project.viewMode]
  );

  const columnWidth = getColumnWidth(project.viewMode);
  const totalWidth = columns.length * columnWidth;

  if (project.tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">
          No tasks to display. Create a task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Header */}
      <div
        className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        style={{ width: `${totalWidth}px` }}
      >
        <div className="flex">
          {columns.map((date, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 py-3 text-center border-r border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
              style={{ width: `${columnWidth}px` }}
            >
              {formatColumnHeader(date, project.viewMode)}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className="relative"
        style={{ width: `${totalWidth}px`, minHeight: '400px' }}
      >
        {/* Vertical grid lines */}
        <div className="absolute inset-0 flex pointer-events-none">
          {columns.map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 border-r border-gray-200 dark:border-gray-700"
              style={{ width: `${columnWidth}px` }}
            />
          ))}
        </div>

        {/* Today marker */}
        {(() => {
          const today = new Date();
          const position = calculateTaskPosition(
            today,
            today,
            timelineRange.start,
            columnWidth
          );
          return (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-5 pointer-events-none"
              style={{ left: `${position.left}px` }}
            />
          );
        })()}

        {/* Task bars */}
        <div className="relative py-4">
          {project.tasks.map((task, index) => {
            const position = calculateTaskPosition(
              task.startDate,
              task.endDate,
              timelineRange.start,
              columnWidth
            );

            return (
              <TaskBar
                key={task.id}
                task={task}
                position={position}
                yOffset={index * 60}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
