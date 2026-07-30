"use client";

import React from "react";
import { X, Calendar, MapPin, User, Mail, Phone, Package, ShieldCheck } from "lucide-react";
import { RentalOrder } from "@/lib/types";
import { formatDate } from "@/utils/dateFormetter";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderDetailsModalProps {
  order: RentalOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Order #{order.orderId.slice(0, 8)}
              </h3>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Placed on {formatDate(order.orderedAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm">
          {/* Equipment Details */}
          <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Rented Gear
                </span>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {order.gear.title}
                </h4>
                <p className="text-xs text-zinc-500">{order.gear.brand}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Quantity
                </span>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {order.quantity} x
                </p>
              </div>
            </div>
          </div>

          {/* Rental Timeline */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-zinc-200/80 p-3.5 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                <span>Collection Date</span>
              </div>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-xs">
                {formatDate(order.collectionDate)}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 p-3.5 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Calendar className="h-3.5 w-3.5 text-amber-500" />
                <span>Return Date</span>
              </div>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-xs">
                {formatDate(order.returnDate)}
              </p>
            </div>
          </div>

          {/* Provider Details */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Provider Information
            </span>
            <div className="rounded-xl border border-zinc-200/80 p-4 space-y-2 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-xs">
                <User className="h-4 w-4 text-zinc-400" />
                <span className="font-medium">{order.gear.provider.name}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>{order.gear.provider.address}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <Phone className="h-4 w-4 text-zinc-400" />
                <span>{order.gear.provider.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <Mail className="h-4 w-4 text-zinc-400" />
                <span>{order.gear.provider.email}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-4 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <span className="text-xs font-medium">Total Rent Amount</span>
            <span className="text-lg font-bold">৳{order.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};