"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";

export function ProviderGearSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSearchTerm = searchParams.get("searchTerm") || "";
  const [searchInput, setSearchInput] = useState(currentSearchTerm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (value: string) => {
    setSearchInput(value);

    // আগের টাইমার ক্লিয়ার করা
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // টাইপ করা থামার ৩০০ms পর অটোমেটিক সার্চ হবে
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("searchTerm", value.trim());
      } else {
        params.delete("searchTerm");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 300);
  };

  const handleClear = () => {
    setSearchInput("");
    if (timerRef.current) clearTimeout(timerRef.current);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:w-80">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
      <Input
        value={searchInput}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Type title or brand..."
        className="pl-9 pr-8 h-10 rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-sm focus-visible:ring-primary/20"
      />
      {searchInput && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}