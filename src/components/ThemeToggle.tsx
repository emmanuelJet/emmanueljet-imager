'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from '@/components/ui/Icons';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='p-2 rounded-full hover:bg-white/5 transition-colors text-foreground/80 hover:text-foreground'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <Sun className='size-5' /> : <Moon className='size-5' />}
    </button>
  );
};
export default ThemeToggle;
