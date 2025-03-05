import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Droplets, Sunset, Waves as Wave } from 'lucide-react';
import { Theme } from '../types';

const themes: { id: Theme; label: string; icon: React.ElementType }[] = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'frosted', label: 'Frosted', icon: Droplets },
  { id: 'sunset', label: 'Sunset', icon: Sunset },
  { id: 'ocean', label: 'Ocean', icon: Wave },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Theme</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {themes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg transition-all
              ${
                theme === id
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            <Icon className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}