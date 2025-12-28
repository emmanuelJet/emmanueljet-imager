'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastProvider } from '@/providers/ToastProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='theme'>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
};
