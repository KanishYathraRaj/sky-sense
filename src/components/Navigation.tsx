import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, AlertTriangle, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { id: 'weather', icon: Sun, label: 'Weather', path: '/' },
  { id: 'risks', icon: AlertTriangle, label: 'Risks', path: '/risks' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center p-2 rounded-lg transition-colors
                ${isActive 
                  ? 'text-[var(--accent)] bg-[var(--accent)]/10' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}