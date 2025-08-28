import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
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

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
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
          icon="mdi:white-balance-sunny" 
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
            isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
        />
        {/* Moon icon */}
        <Icon 
          icon="mdi:moon-waning-crescent" 
          className={`absolute inset-0 w-5 h-5 text-slate-700 dark:text-slate-300 transition-all duration-300 ${
            isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
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