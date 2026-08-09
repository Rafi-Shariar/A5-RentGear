"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, RotateCcw, Filter } from "lucide-react";

export function ProviderOrderFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentEmail = searchParams.get("customerEmail") || "";
  const currentStatus = searchParams.get("status") || "ALL";

  const [emailInput, setEmailInput] = useState(currentEmail);

  // Email Search Handler
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (emailInput.trim()) {
      params.set("customerEmail", emailInput.trim());
    } else {
      params.delete("customerEmail");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Status Filter Handler
  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status && status !== "ALL") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Reset Filters
  const handleReset = () => {
    setEmailInput("");
    router.replace(pathname);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
      {/* Email Search Bar Form */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
        <div className="relative w-full">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Search by customer email..."
            className="pl-9 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm"
          />
        </div>
        <Button
          type="submit"
          className="h-10 px-4 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shrink-0 text-xs font-semibold"
        >
          Search
        </Button>
      </form>

      {/* Status Filter & Reset */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Select value={currentStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-10 w-full sm:w-44 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <SelectValue placeholder="All Status" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PLACED">Placed</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="PICKED_UP">Picked up</SelectItem>
            <SelectItem value="RETURNED">Returned</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {(currentEmail || currentStatus !== "ALL") && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleReset}
            title="Reset Filters"
            className="h-10 w-10 rounded-xl shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-zinc-500" />
          </Button>
        )}
      </div>
    </div>
  );
}