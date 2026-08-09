"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, RotateCcw } from "lucide-react";

export function UserEmailSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentEmail = searchParams.get("email") || "";
  const [emailInput, setEmailInput] = useState(currentEmail);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (emailInput.trim()) {
      params.set("email", emailInput.trim());
    } else {
      params.delete("email");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setEmailInput("");
    router.replace(pathname);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
      <div className="relative w-full sm:w-80">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Search by user email..."
          className="pl-9 h-10 rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-sm"
        />
      </div>

      <Button
        type="submit"
        className="h-10 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 shrink-0 text-xs font-semibold"
      >
        Search
      </Button>

      {currentEmail && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleReset}
          title="Reset Search"
          className="h-10 w-10 rounded-xl shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
        </Button>
      )}
    </form>
  );
}