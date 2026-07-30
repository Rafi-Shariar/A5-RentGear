"use client";

import { Menu } from "lucide-react";
import { useSidebarStore } from "./Sidebar";

export default function MobileMenuButton() {
  const { toggle } = useSidebarStore();

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
      aria-label="Toggle Sidebar"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}