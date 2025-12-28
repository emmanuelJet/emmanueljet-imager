"use client";

import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
            <Zap className="size-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Emmanuejet Imager
          </span>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-white/5 transition-colors text-foreground/80 hover:text-foreground"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />
          ) : (
            <div className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
}
