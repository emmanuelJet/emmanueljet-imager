"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-lg flex items-center justify-center overflow-hidden relative">
            <Image
              src="/brand/emmanueljet-logomark.svg"
              alt="emmanueljet logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-br from-brand-purple to-brand-orange bg-clip-text text-transparent">
            emmanueljet imager
          </span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
