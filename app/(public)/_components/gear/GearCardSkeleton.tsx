import React from 'react';

export default function GearCardSkeleton() {
  return (
    <div className="w-full max-w-95 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-md animate-pulse">
      {/* Top Image Container Skeleton */}
      <div className="relative aspect-4/3 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
        {/* Wishlist Button Skeleton */}
        <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        {/* Center Image Placeholder Icon / Box */}
        <div className="h-12 w-12 rounded-lg bg-zinc-300/60 dark:bg-zinc-700/60" />
      </div>

      {/* Content Section Skeleton */}
      <div className="pt-4 pb-2 px-1 space-y-3">
        {/* Brand & Stock Status Bar */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-14 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Title Placeholder */}
        <div className="h-5 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />

        {/* Price Placeholder */}
        <div className="h-6 w-1/3 rounded-md bg-zinc-200 dark:bg-zinc-800" />

        {/* Action Button Placeholder */}
        <div className="mt-4 h-10 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}