import { OrderStatus } from "@/lib/types";
import React from "react";


const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PLACED: {
    label: "Placed",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-900",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
  },
  PAID: {
    label: "Paid",
    className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900",
  },
  PICKED_UP: {
    label: "Picked Up",
    className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900",
  },
  RETURNED: {
    label: "Returned",
    className: "bg-grey-50 text-grey-700 border-grey-200 dark:bg-grey-950/40 dark:text-grey-400 dark:border-grey-900",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900",
  },
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = statusConfig[status] || statusConfig.PLACED;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors ${config.className}`}
    >
      {config.label}
    </span>
  );
};