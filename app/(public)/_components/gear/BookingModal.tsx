"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { X, Sparkles, User, Mail } from "lucide-react";
import { IGear } from "@/lib/types";
import {
  createRentBookingSchema,
  RentBookingFormValues,
} from "@/lib/validations/order";
import { useUserStore } from "@/lib/store/useUserStore";
import { PlaceOrderAction } from "../../_actions/orderActions";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface RentBookingModalProps {
  gear: IGear;
  isOpen: boolean;
  onClose: () => void;
}

export function RentBookingModal({
  gear,
  isOpen,
  onClose,
}: RentBookingModalProps) {
  const bookingSchema = createRentBookingSchema(gear.stock);
  const { user } = useUserStore();
    const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RentBookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      quantity: 1,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
  });

  if (!isOpen) return null;

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const quantity = watch("quantity") || 1;

  // Calculate estimated total days & cost
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalDays = calculateDays();
  const estimatedTotal = gear.price * quantity * totalDays;



  const onSubmit = async (data: RentBookingFormValues) => {
    if (!user?.data) {
      toast.error("Please Login to place an order!");
      return;
    }

    if(data.startDate === data.endDate){

      toast.error("Dates Can not be same.");
      return;

    }



    try {
      const payload = {
        gearId: gear.gearId,
        quantity: Number(data.quantity),
        totalAmount: estimatedTotal,
        collectionDate: data.startDate,
        returnDate: data.endDate,
      };

      const result = await PlaceOrderAction(payload);

      if (result?.success) {
        toast.success(result.message || "Order Placed successfully.");
        queryClient.invalidateQueries({queryKey:["customer-orders"]})

        reset(); 
        onClose(); 
      } else {
        toast.error(result?.message || "Failed to place order. Try again!");
      }
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        {/* Modal Header */}

         <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Quick Rent Request</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Item Summary Card */}
          <div className="flex gap-4 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
              <Image
                src={gear.imageURL}
                alt={gear.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {gear.brand}
              </span>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {gear.title}
              </h4>
              <p className="text-xs font-medium text-zinc-500">
                ${gear.price} / day •{" "}
                <span className="text-emerald-600 font-semibold">
                  {gear.stock} Available
                </span>
              </p>
            </div>
          </div>


          {/* User Info Readonly Section */}
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            {user?.data ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <User className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-medium truncate">{user?.data?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-medium truncate">{user?.data?.email}</span>
                </div>
              </div>
            ) : (
              <h1 className="text-xs font-semibold text-red-500 dark:text-amber-400 text-center italic">
                Please Log in to place an order
              </h1>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="space-y-4">
            {/* Pickup & Return Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  {...register("startDate")}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.startDate && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  min={startDate || todayStr}
                  {...register("endDate")}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.endDate && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Quantity (Max: {gear.stock})
              </label>
              <input
                type="number"
                min={1}
                max={gear.stock}
                {...register("quantity", { valueAsNumber: true })}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {errors.quantity && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          {/* Estimated Total Calculation */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="text-[11px] text-zinc-400">Total Estimation</p>
              <p className="text-xs text-zinc-500">
                {quantity} qty × {totalDays} {totalDays > 1 ? "days" : "day"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-primary">
                ${estimatedTotal}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || gear.stock === 0 || !user?.data} // 👈 Logged in না থাকলে বাটন ডিজেবল
              className="flex-1 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
