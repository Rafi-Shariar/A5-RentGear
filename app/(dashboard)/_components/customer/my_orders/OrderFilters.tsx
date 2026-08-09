"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrderStatus } from "@/lib/types";

const FILTER_TABS = [
  { label: "All Orders", value: "ALL" },
  { label: "Placed", value: "PLACED" },
  { label: "PAID", value: "PAID" },
  { label: "PICKED_UP", value: "PICKED_UP" },
  { label: "RETURNED", value: "RETURNED" },
  { label: "CANCELLED", value: "CANCELLED" },
];

export function OrderFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStatus = searchParams.get("status") || "ALL";

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "ALL") {
      params.set("status", value);
    } else {
      params.delete("status"); 
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
      {FILTER_TABS.map((tab) => {
        const isActive = currentStatus === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleStatusChange(tab.value)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}