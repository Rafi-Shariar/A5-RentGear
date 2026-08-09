"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { 
  Eye, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Edit3, 
  Loader2, 
  PackageCheck,
  Clock
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProviderOrder, OrderStatus, ProviderOrdersTableProps } from "@/lib/types";
import { updateOrderStatusAction } from "../../_actions/provider_actions/orderAction";
import { useQueryClient } from "@tanstack/react-query";

const ALL_STATUSES: OrderStatus[] = [ "PLACED", "CONFIRMED", "PAID", "PICKED_UP", "RETURNED", "CANCELLED", ];


export const ProviderOrdersTable = ({ orders }: ProviderOrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<IProviderOrder | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus | "">("");
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PAID":
      case "RETURNED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400";
      case "CONFIRMED":
      case "PICKED_UP":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400";
      case "PLACED":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  const handleOpenModal = (order: IProviderOrder) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;

    setIsUpdating(true);
    try {
    
      const res = await updateOrderStatusAction(selectedOrder.orderId, newStatus)

      if(res.success){
          toast.success(`Order status updated to ${newStatus}`);
          queryClient.invalidateQueries({queryKey:["customer-orders"]})

          setSelectedOrder(null);
      }
      else{
        toast.error("Failed to update status. Try again.");
      }


    } catch (error) {
      toast.error("Failed to update status. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="border-b border-zinc-200 bg-zinc-50/60 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Gear Details</th>
              <th className="px-6 py-4 font-semibold">Customer Info</th>
              <th className="px-6 py-4 font-semibold">Rental Dates</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  {/* Gear Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border bg-zinc-100">
                        <Image
                          src={order.gear.imageURL}
                          alt={order.gear.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {order.gear.title}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {order.gear.brand} • <span className="font-medium text-zinc-500">Qty: {order.quantity}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5 text-xs">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                        <User className="h-3 w-3 text-zinc-400" />
                        {order.user.name}
                      </p>
                      <p className="text-zinc-500 flex items-center gap-1">
                        <Mail className="h-3 w-3 text-zinc-400" />
                        {order.user.email}
                      </p>
                    </div>
                  </td>

                  {/* Rental Period */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <div className="space-y-1">
                      <p className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                        {format(new Date(order.collectionDate), "MMM dd")} - {format(new Date(order.returnDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-zinc-900 dark:text-zinc-100">
                    ৳{order.totalAmount.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`font-semibold ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </Badge>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModal(order)}
                      className="gap-1.5 text-xs border-zinc-200 dark:border-zinc-800"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-zinc-500" />
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🌟 Status Update Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change order lifecycle status for order <span className="font-mono text-zinc-900 font-semibold dark:text-zinc-100">#{selectedOrder?.orderId.slice(0, 8)}</span>
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 py-2">
              {/* Gear Quick View */}
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border">
                <div className="relative h-10 w-10 overflow-hidden rounded bg-zinc-200">
                  <Image
                    src={selectedOrder.gear.imageURL}
                    alt={selectedOrder.gear.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{selectedOrder.gear.title}</p>
                  <p className="text-xs text-zinc-500">Customer: {selectedOrder.user.name}</p>
                </div>
              </div>

              {/* Status Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Select New Status
                </label>
                <Select
                  value={newStatus}
                  onValueChange={(val) => setNewStatus(val as OrderStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedOrder(null)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};