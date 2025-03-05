import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  units: 'metric' | 'imperial';
  setUnits: (units: 'metric' | 'imperial') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [units, setUnits] = useState<'metric' | 'imperial'>(() => {
    const savedUnits = localStorage.getItem('weatherAppUnits');
    return (savedUnits === 'metric' || savedUnits === 'imperial') ? savedUnits : 'imperial';
  });

  useEffect(() => {
    localStorage.setItem('weatherAppUnits', units);
  }, [units]);

  return (
    <SettingsContext.Provider value={{ units, setUnits }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}