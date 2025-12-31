import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types/task';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskBarProps {
  task: Task;
  position: { left: number; width: number };
  yOffset: number;
  columnWidth: number;
  timelineStart: Date;
}

const statusColors = {
  'not-started': 'bg-task-not-started',
  'in-progress': 'bg-task-in-progress',
  'completed': 'bg-task-completed',
  'delayed': 'bg-task-delayed',
};

export default function TaskBar({ task, position, yOffset, columnWidth, timelineStart }: TaskBarProps) {
  const { selectedTaskId, setSelectedTask } = useTaskStore();
  const isSelected = selectedTaskId === task.id;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      task,
      columnWidth,
      timelineStart,
    },
  });

  const style = {
    left: `${position.left}px`,
    top: `${yOffset}px`,
    width: `${position.width}px`,
    height: '40px',
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      className="absolute"
      style={style}
      {...listeners}
      {...attributes}
    >
      <div
        onClick={() => setSelectedTask(task.id)}
        className={`relative h-full rounded-md shadow-sm hover:shadow-md transition-shadow cursor-move overflow-hidden ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        } ${isDragging ? 'shadow-lg' : ''}`}
      >
        {/* Background */}
        <div className={`absolute inset-0 ${statusColors[task.status]} opacity-30`} />

        {/* Progress bar */}
        <div
          className={`absolute inset-y-0 left-0 ${statusColors[task.status]}`}
          style={{ width: `${task.progress}%` }}
        />

        {/* Task title */}
        <div className="relative h-full flex items-center px-3">
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {task.title}
          </span>
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-400">
            {task.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
