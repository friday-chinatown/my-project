/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'task-not-started': '#9CA3AF',
        'task-in-progress': '#3B82F6',
        'task-completed': '#10B981',
        'task-delayed': '#EF4444',
      },
    },
  },
  plugins: [],
}
