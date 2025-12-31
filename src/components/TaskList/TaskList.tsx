import { useTaskStore } from '../../store/useTaskStore';
import TaskListItem from './TaskListItem';

export default function TaskList() {
  const { project } = useTaskStore();

  if (project.tasks.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">No tasks yet.</p>
        <p className="text-xs mt-1">Click "New Task" to get started!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {project.tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
