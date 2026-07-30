"use client";

import React from "react";
import { OrdersTable } from "../../_components/customer/my_orders/OrdersTable";
import { useCustomerOrders } from "../../_actions/customer_actions/orderAction";


export default function MyOrdersPage() {
  const { data: orders, isLoading, isError } = useCustomerOrders();

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

      {/* State Handling */}
      {isLoading && (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-medium text-zinc-400 animate-pulse">
            Loading orders...
          </span>
        </div>
      )}

      {isError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs dark:bg-rose-950/30 dark:border-rose-900">
          Failed to fetch orders. Please try refreshing.
        </div>
      )}

      {/* Render Table */}
      {!isLoading && !isError && orders && <OrdersTable orders={orders} />}
    </div>
  );
}