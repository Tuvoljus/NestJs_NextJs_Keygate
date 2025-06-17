// context/AppContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type AppContextType = {
  theme: string;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);