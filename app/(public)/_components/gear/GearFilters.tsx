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
import { SearchIcon, RotateCcw } from "lucide-react";
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
    <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 my-6 w-full">
      {/* 1. Search Bar */}
      <div className="relative w-full md:w-64">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          defaultValue={searchParams.get("searchTerm")?.toString() || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search gears..."
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      {/* 2. Dynamic Category Select */}
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
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 3. Dynamic Brand Select */}
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
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
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
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Default Sorting</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="stock-asc">Stock: Low to High</SelectItem>
            <SelectItem value="stock-desc">Stock: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔹 Items Per Page Dropdown */}
<div className="w-full sm:w-36">
  <Select
    value={searchParams.get("limit") || "8"} // Default Limit (আপনার পছন্দমতো সেট করুন)
    onValueChange={handleLimitChange}
  >
    <SelectTrigger className="h-10 rounded-xl">
      <SelectValue placeholder="Limit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="2">2 Per Page</SelectItem>
      <SelectItem value="8">8 Per Page</SelectItem>
      <SelectItem value="12">12 Per Page</SelectItem>
      <SelectItem value="20">20 Per Page</SelectItem>
    </SelectContent>
  </Select>
</div>

      {/* 5. Reset Button */}
      <Button
        variant="ghost"
        onClick={handleReset}
        className="h-10 rounded-xl px-3 text-muted-foreground hover:text-foreground gap-1.5"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
}
