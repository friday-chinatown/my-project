import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { Task } from '../../types/task';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskListItemProps {
  task: Task;
}

const statusColors = {
  'not-started': 'bg-gray-200 dark:bg-gray-700',
  'in-progress': 'bg-blue-200 dark:bg-blue-900',
  'completed': 'bg-green-200 dark:bg-green-900',
  'delayed': 'bg-red-200 dark:bg-red-900',
};

export default function TaskListItem({ task }: TaskListItemProps) {
  const { selectedTaskId, setSelectedTask, deleteTask } = useTaskStore();
  const isSelected = selectedTaskId === task.id;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete task "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      onClick={() => setSelectedTask(task.id)}
      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {task.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {format(task.startDate, 'MMM d')} - {format(task.endDate, 'MMM d, yyyy')}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${statusColors[task.status]}`}
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
            {task.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
