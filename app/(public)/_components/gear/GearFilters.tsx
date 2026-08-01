"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchIcon, RotateCcw, SlidersHorizontal, Briefcase, ArrowUpDown, Tag, Layers } from "lucide-react";
import { GearFiltersProps } from "@/lib/types";
import { getUniqueBrandCategory } from "@/utils/uniqueCategoryBrandHelper";

export function GearFilters({ gearItems = [] }: GearFiltersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // console.log(gearItems);

  const { categories, brands } = getUniqueBrandCategory(gearItems);

  // console.log(categories, brands , "REsult");

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      updateQueryParam("searchTerm", value);
    }, 300);
  };

  const handleSortChange = (combinedValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!combinedValue || combinedValue === "all") {
      params.delete("sortBy");
      params.delete("sortOrder");
    } else {
      const [sortBy, sortOrder] = combinedValue.split("-");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.replace(pathname);
  };

  const handleLimitChange = (value: string) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value) {
    params.set("limit", value);
    params.set("page", "1");
  }

  router.replace(`${pathname}?${params.toString()}`);
  router.refresh()
};

  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");
  const currentSortValue =
    currentSortBy && currentSortOrder
      ? `${currentSortBy}-${currentSortOrder}`
      : "";


  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
            Filters
          </h3>
        </div>
        
        {/* Reset Button (Top Action) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 px-2 text-xs text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors gap-1.5 rounded-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {/* 1. Search Bar Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Search
        </label>
        <div className="relative w-full">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            defaultValue={searchParams.get("searchTerm")?.toString() || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Camera, Lens, Drone..."
            className="pl-9 h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus-visible:ring-primary/20 text-sm"
          />
        </div>
      </div>

      {/* 2. Dynamic Category Select */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-zinc-400" /> Category
        </label>
        <Select
          value={searchParams.get("category") || "all"}
          onValueChange={(val) => updateQueryParam("category", val)}
        >
          <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20 text-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 3. Dynamic Brand Select */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-zinc-400" /> Brand
        </label>
        <Select
          value={searchParams.get("brand") || "all"}
          onValueChange={(val) => updateQueryParam("brand", val)}
        >
          <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20 text-sm">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 4. Sort By & Sort Order Combined */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" /> Sort By
        </label>
        <Select
          value={currentSortValue || "all"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20 text-sm">
            <SelectValue placeholder="Default Sorting" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Default Sorting</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="stock-asc">Stock: Low to High</SelectItem>
            <SelectItem value="stock-desc">Stock: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 5. Items Per Page Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-zinc-400" /> Items Per Page
        </label>
        <Select
          value={searchParams.get("limit") || "9"}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20 text-sm">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="6">6 Per Page</SelectItem>
            <SelectItem value="9">9 Per Page</SelectItem>
            <SelectItem value="12">12 Per Page</SelectItem>
            <SelectItem value="18">18 Per Page</SelectItem>
            <SelectItem value="24">24 Per Page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
