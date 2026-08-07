"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

// Client-side execution চেনার জন্য একটি হেল্পার
const emptySubscribe = () => () => {};
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client-side render হলে true
    () => false  // Server-side render (SSR) হলে false
  );
};

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl p-2.5 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-700" />
      )}
    </button>
  );
}