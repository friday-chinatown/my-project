# 📊 Gantt Chart Task Manager

A modern, feature-rich Gantt chart task management application built with React, TypeScript, and TailwindCSS.

## ✨ Features

### Core Functionality
- ✅ **Task Management**: Create, edit, and delete tasks with full CRUD operations
- ✅ **Gantt Chart Visualization**: Timeline view with task bars showing progress
- ✅ **Drag & Drop Scheduling**: Drag tasks horizontally to reschedule dates
- ✅ **Multiple View Modes**: Switch between Day, Week, and Month views
- ✅ **Progress Tracking**: Visual progress bars and status indicators
- ✅ **Dark Mode**: System-aware dark mode with manual toggle
- ✅ **Data Persistence**: Automatic saving to LocalStorage
- ✅ **Export/Import**: JSON-based project data export and import

### Task Features
- Task title and description
- Start and end dates
- Progress percentage (0-100%)
- Automatic status calculation:
  - Not Started (0% progress)
  - In Progress (1-99% progress)
  - Completed (100% progress)
  - Delayed (past end date)

### UI/UX
- Responsive layout with sidebar and main chart area
- Intuitive task selection and highlighting
- Today marker on timeline
- Color-coded task status indicators
- Clean, modern interface with TailwindCSS

## 🚀 Tech Stack

- **Frontend**: React 19.2 + TypeScript
- **Build Tool**: Vite 7.2
- **Styling**: TailwindCSS 4 with dark mode support
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit/core
- **Date Utilities**: date-fns
- **Form Handling**: react-hook-form + zod validation
- **Icons**: lucide-react
- **Testing**: Vitest + React Testing Library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/friday-chinatown/my-project.git
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Lint
npm run lint
```

## 🧪 Testing

The project includes comprehensive unit tests for utilities and core functionality:

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Interactive UI
npm run test:ui
```

Test coverage includes:
- ✅ Date utility functions (getColumnWidth, calculateTaskPosition, formatColumnHeader)
- ✅ Storage operations (save, load, export, import)
- ✅ Date serialization/deserialization

## 🚀 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Access your app at: `https://[username].github.io/my-project/`

The deployment workflow includes:
- ✅ Automated testing
- ✅ Production build
- ✅ GitHub Pages deployment

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains optimized assets:
# - Code splitting for better loading
# - Lazy loading for components
# - Vendor chunk separation
# - Gzip-optimized bundles
```

### Performance Optimizations

- **Code Splitting**: React, DnD, and date libraries in separate chunks
- **Lazy Loading**: TaskForm and GanttChart loaded on demand
- **Bundle Sizes** (gzipped):
  - React vendor: ~4 KB
  - DnD vendor: ~12 KB
  - Date vendor: ~6 KB
  - TaskForm (lazy): ~10 KB
  - GanttChart (lazy): ~2 KB
  - Main bundle: ~61 KB

## 📁 Project Structure

```
my-project/
├── src/
│   ├── components/
│   │   ├── TaskList/          # Task sidebar components
│   │   ├── GanttChart/         # Gantt chart components
│   │   └── TaskForm/           # Task creation/edit form
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Zustand store
│   ├── types/                  # TypeScript definitions
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── .claude/                    # Claude Code configuration
├── .github/                    # GitHub Actions workflows
└── README.md                   # This file
```

## 💾 Data Storage

All project data is stored in browser LocalStorage under the key `gantt-project`. The data persists across sessions and includes:
- All tasks with their properties
- View mode preference
- Project metadata

### Export/Import

You can export your project data as JSON and import it later:

```javascript
// In the browser console
import { useTaskStore } from './store/useTaskStore';

// Export
const json = useTaskStore.getState().exportProject();
console.log(json);

// Import
useTaskStore.getState().importProject(jsonString);
```

## 🎨 Customization

### Task Colors

Task colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'task-not-started': '#9CA3AF',   // Gray
  'task-in-progress': '#3B82F6',   // Blue
  'task-completed': '#10B981',     // Green
  'task-delayed': '#EF4444',       // Red
}
```

### View Mode Column Widths

Adjust timeline granularity in `src/utils/dateUtils.ts`:

```typescript
export const getColumnWidth = (viewMode: ViewMode): number => {
  switch (viewMode) {
    case 'day': return 40;
    case 'week': return 80;
    case 'month': return 120;
  }
};
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Usage

1. **Create a Task**: Click the "New Task" button in the header
2. **Fill in Details**: Enter task title, description, dates, and initial progress
3. **View on Gantt Chart**: Your task appears on the timeline
4. **Drag to Reschedule**: Click and drag task bars horizontally to change dates
5. **Edit Task**: Click on a task in the sidebar to select and edit it
6. **Delete Task**: Click the trash icon on a task in the sidebar
7. **Change View**: Switch between Day, Week, and Month views
8. **Toggle Dark Mode**: Click the sun/moon icon in the header

## 🏗️ Completed Features

- ✅ Drag & drop task scheduling
- ✅ Dark mode with system preference
- ✅ Comprehensive testing setup
- ✅ Build optimization and code splitting
- ✅ GitHub Pages deployment

## 🔮 Future Enhancements

Potential features for future development:
- Task dependencies with arrow visualization
- Multiple projects support
- Cloud sync and collaboration
- Export to PDF/PNG
- Keyboard shortcuts
- Task templates
- Subtasks and task hierarchy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! This project is part of the Miyabi autonomous development framework.

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://docs.pmnd.rs/zustand/)
- [@dnd-kit](https://dndkit.com/)
- [date-fns](https://date-fns.org/)
- [Vitest](https://vitest.dev/)
- [Miyabi Framework](https://github.com/ShunsukeHayashi/Autonomous-Operations)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
