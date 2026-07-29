"use client";

import React from "react";
import Link from "next/link";
import { PackageOpen, RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyGearStateProps {
  title?: string;
  description?: string;
  onResetFilters?: () => void;
}

export const EmptyGearState = ({
  title = "No Gears Available",
  description = "We couldn't find any gears matching your criteria. Try adjusting your filters or check back later.",
  onResetFilters,
}: EmptyGearStateProps) => {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-dashed border-zinc-200 dark:border-zinc-800 my-6">
      {/* Visual Icon Badge */}
      <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-5 shadow-sm">
        <PackageOpen className="w-10 h-10 stroke-[1.5]" />
        
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="h-10 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Filters</span>
          </Button>
        )}

        <Button
          asChild
          className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-md shadow-emerald-700/20 transition-all gap-2 cursor-pointer"
        >
          
        </Button>
      </div>
    </div>
  );
};