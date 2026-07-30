"use client";
import React, { useState } from "react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { AddReviewModal } from "./AddReviewModal";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { Eye, Trash2, Star } from "lucide-react";
import { RentalOrder } from "@/lib/types";
import { formatDate } from "@/utils/dateFormetter";

interface OrdersTableProps {
  orders: RentalOrder[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {

  console.log("Ordeers: ", orders);
  
  const [selectedReviewOrder, setSelectedReviewOrder] = useState<RentalOrder | null>(null);
  const [selectedDetailOrder, setSelectedDetailOrder] = useState<RentalOrder | null>(null);

  const handleDelete = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      // TODO: Connect Delete Action or Mutation
      console.log("Deleting Order:", orderId);
    }
  };

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
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {orders.map((order) => {
              const isDeletable = order.status === "PLACED";
              const isReviewable = order.status === "RETURNED";

              return (
                <tr
                  key={order.orderId}
                  className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    #{order.orderId.slice(0, 8)}
                  </td>

                  {/* Gear Info */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {order.gear.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {order.gear.brand} • <span className="font-medium text-zinc-500">Qty: {order.quantity}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-xs whitespace-nowrap">
                    {formatDate(order.orderedAt)}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                    ৳{order.totalAmount.toLocaleString()}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* 1. View Details Button */}
                      <button
                        onClick={() => setSelectedDetailOrder(order)}
                        title="View Order Details"
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      >
                        <Eye className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Details</span>
                      </button>

                      {/* 2. Review Button (Always Visible, Disabled if status !== RETURNED) */}
                      <button
                        disabled={!isReviewable}
                        onClick={() => setSelectedReviewOrder(order)}
                        title={
                          isReviewable
                            ? "Leave a review for this item"
                            : "Review is available only after equipment is returned"
                        }
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          isReviewable
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-900/60"
                            : "cursor-not-allowed border border-dashed border-zinc-200 text-zinc-300 dark:border-zinc-800 dark:text-zinc-700"
                        }`}
                      >
                        <Star className={`h-3.5 w-3.5 ${isReviewable ? "fill-amber-500 text-amber-500" : ""}`} />
                        <span>Review</span>
                      </button>

                      {/* 3. Delete Button (Disabled if CONFIRMED or later) */}
                      <button
                        disabled={!isDeletable}
                        onClick={() => handleDelete(order.orderId)}
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

      {/* Details Modal */}
      <OrderDetailsModal
        order={selectedDetailOrder}
        isOpen={!!selectedDetailOrder}
        onClose={() => setSelectedDetailOrder(null)}
      />

      {/* Review Modal */}
      <AddReviewModal
        order={selectedReviewOrder}
        isOpen={!!selectedReviewOrder}
        onClose={() => setSelectedReviewOrder(null)}
      />
    </>
  );
};