import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const ThemeToggle: React.FC = () => {
  // Always start with false on server to prevent hydration mismatch
  const [isDark, setIsDark] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set the correct state after hydration
    const currentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(currentlyDark);
    setIsHydrated(true);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Don't render anything until hydrated to prevent mismatch
  if (!isHydrated) {
    return (
      <button
        className="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center group"
        aria-label="Theme toggle"
      >
        <div className="relative w-5 h-5 overflow-hidden">
          {/* Show sun icon by default during SSR */}
          <Icon 
            icon="solar:sun-bold-duotone" 
            className="absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300"
          />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon */}
        <Icon 
          icon="solar:sun-bold-duotone" 
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        {/* Moon icon */}
        <Icon 
          icon="solar:moon-bold-duotone" 
          className={`absolute inset-0 w-5 h-5 text-indigo-400 dark:text-blue-300 transition-all duration-300 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {isDark ? 'Light mode' : 'Dark mode'}
      </div>
    </button>
  );
};

export default ThemeToggle;