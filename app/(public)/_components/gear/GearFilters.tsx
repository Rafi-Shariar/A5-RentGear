"use client";
import React, { useRef } from "react";
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
import { SearchIcon, RotateCcw } from "lucide-react";

// Example Options (আপনার প্রোজেক্টের ডাটা অনুযায়ী কাস্টমাইজ করুন)
const CATEGORIES = ["Camping", "Hiking", "Photography", "Cycling", "Water Sports"];
const BRANDS = ["The North Face", "Columbia", "Sony", "Canon", "Patagonia", "REI"];

export function GearFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 🔄 Helper to Update Query Params without losing existing ones
  const updateQueryParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // 🔍 Debounced Search Handler
  const handleSearchChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      updateQueryParam("searchTerm", value);
    }, 300);
  };

  // 🧹 Clear All Filters
  const handleResetFilters = () => {
    router.replace(pathname);
  };

  // Sort Option Splitter Helper (e.g. "price-asc" -> sortBy=price, sortOrder=asc)
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

  // Current Sort Value Combination for Select Field
  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");
  const currentSortValue = currentSortBy && currentSortOrder ? `${currentSortBy}-${currentSortOrder}` : "";

  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 my-6 w-full">
      {/* 1. Search Bar */}
      <div className="relative w-full md:w-72">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          defaultValue={searchParams.get("searchTerm")?.toString() || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search gears..."
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      {/* 2. Category Filter */}
      <div className="w-full sm:w-44">
        <Select
          value={searchParams.get("category") || "all"}
          onValueChange={(val) => updateQueryParam("category", val)}
        >
          <SelectTrigger className="h-10 rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 3. Brand Filter */}
      <div className="w-full sm:w-44">
        <Select
          value={searchParams.get("brand") || "all"}
          onValueChange={(val) => updateQueryParam("brand", val)}
        >
          <SelectTrigger className="h-10 rounded-xl">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {BRANDS.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 4. Sort By & Sort Order Combined */}
      <div className="w-full sm:w-48">
        <Select
          value={currentSortValue || "all"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="h-10 rounded-xl">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Default Sorting</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="stock-desc">Stock: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 5. Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="h-10 rounded-xl px-3 text-muted-foreground hover:text-foreground gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      )}
    </div>
  );
}