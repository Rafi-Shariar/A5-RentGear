"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Eye, Trash2, CreditCard, Loader2 } from "lucide-react";
import { RentalOrder } from "@/lib/types";
import { formatDate } from "@/utils/dateFormetter";
import { useDeleteOrder } from "@/app/(dashboard)/_hooks/useDeleteOrder";

import { DeleteConfirmModal } from "../../shared/DeleteConfirmModal";
import { toast } from "sonner";
import { useCreateCheckoutSession } from "@/app/(dashboard)/_hooks/useCreateCheckout";

interface OrdersTableProps {
  orders: RentalOrder[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [loadingPaymentOrderId, setLoadingPaymentOrderId] = useState<string | null>(null);

  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();
  const { mutate: createCheckoutSession } = useCreateCheckoutSession();

  const handleConfirmDelete = () => {
    if (!deletingOrderId) return;

    deleteOrder(deletingOrderId, {
      onSuccess: () => {
        toast.success("Order deleted successfully.");
        setDeletingOrderId(null);
      },
      onError: () => {
        toast.error("Failed to delete order. Try again.");
      },
    });
  };

  const handlePayNow = (orderId: string) => {
    setLoadingPaymentOrderId(orderId);

    createCheckoutSession(orderId, {
      onSuccess: (paymentURL) => {
        window.location.href = paymentURL;
      },
      onError: () => {
        toast.error("Failed to initiate payment.");
        setLoadingPaymentOrderId(null);
      },
    });
  };

  const renderPaymentStatus = (status: string, orderId: string) => {
    const isPaying = loadingPaymentOrderId === orderId;

    if (status === "PLACED") {
      return (
        <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400">
          Unpaid
        </span>
      );
    }

    if (status === "CONFIRMED") {
      return (
        <button
          type="button"
          disabled={isPaying}
          onClick={() => handlePayNow(orderId)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors disabled:opacity-50 dark:bg-emerald-500 dark:hover:bg-emerald-400"
        >
          {isPaying ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-3.5 w-3.5" />
              <span className="text-xs">Pay</span>
            </>
          )}
        </button>
      );
    }

    if (status === "CANCELLED") {
      return null;
    }

    return (
      <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        Paid
      </span>
    );
  };

  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Equipment</th>
              <th className="px-6 py-4 font-semibold">Ordered Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Payment</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {safeOrders.map((order) => {
              const isDeletable = order.status === "PLACED";

              return (
                <tr
                  key={order.orderId}
                  className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    #{order.orderId.slice(0, 8)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {order.gear.title}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      {order.gear.brand} • <span className="font-medium text-zinc-500">Qty: {order.quantity}</span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-xs">
                    {formatDate(order.orderedAt)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                    ৳{order.totalAmount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  <td className="px-6 py-4">
                    {renderPaymentStatus(order.status, order.orderId)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/dashboard/my-orders/${order.orderId}`}
                        title="View Order Details"
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        <Eye className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Details</span>
                      </Link>

                      <button
                        disabled={!isDeletable}
                        onClick={() => setDeletingOrderId(order.orderId)}
                        title={
                          isDeletable
                            ? "Delete Order"
                            : "Orders cannot be deleted once confirmed"
                        }
                        className={`rounded-lg p-1.5 transition-colors ${
                          isDeletable
                            ? "text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                            : "cursor-not-allowed text-zinc-200 dark:text-zinc-800"
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal
        isOpen={!!deletingOrderId}
        onClose={() => setDeletingOrderId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};