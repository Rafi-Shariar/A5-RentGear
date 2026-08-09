"use client"
import React from "react";
import { OrdersTable } from "../../_components/customer/my_orders/OrdersTable";
import { useCustomerOrders } from "../../_hooks/useCustomerOrders";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { OrderFilters } from "../../_components/customer/my_orders/OrderFilters";

export default function MyOrdersPage() {

  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "ALL"

  const { data: orders = [], isLoading, isError, error } = useCustomerOrders(currentStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          My Orders
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage your equipment rentals, view order status, and leave reviews.
        </p>
      </div>

      <OrderFilters/>

      {/* 🟢 1. Loading State (isLoading/isPending) */}
      {isLoading && (
        <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
            <span>Loading orders...</span>
          </div>
        </div>
      )}

      {/* 🟢 2. Dynamic Error State */}
      {isError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-600 dark:border-rose-900/80 dark:bg-rose-950/30 dark:text-rose-400">
          {error?.message || "Failed to fetch orders. Please try refreshing."}
        </div>
      )}

      {/* 🟢 3. Render Table safely */}
      {!isLoading && !isError && (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}