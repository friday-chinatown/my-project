import { useEffect, useState } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { useTaskStore } from './store/useTaskStore';
import { useDarkMode } from './hooks/useDarkMode';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import GanttChart from './components/GanttChart/GanttChart';

function App() {
  const { project, setViewMode, loadProject } = useTaskStore();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h1>

          <div className="flex items-center gap-4">
            {/* View Mode Selector */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['day', 'week', 'month'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    project.viewMode === mode
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* New Task Button */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-[calc(100vh-73px)]">
        {/* Task List */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
          <TaskList />
        </div>

        {/* Gantt Chart */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <GanttChart />
        </div>
      </main>

      {/* Task Form Modal */}
      {isFormOpen && (
        <TaskForm onClose={() => setIsFormOpen(false)} />
      )}
    </div>
  );
}

export default App;
