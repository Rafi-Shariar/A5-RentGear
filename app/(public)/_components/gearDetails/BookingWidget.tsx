"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ShieldAlert } from "lucide-react";
import { useUserStore } from "@/lib/store/useUserStore";
import Link from "next/link";
import { Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { createRentBookingSchema, RentBookingFormValues } from "@/lib/validations/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stoke } from "next/font/google";
import { toast } from "sonner";
import { PlaceOrderAction } from "../../_actions/orderActions";
import { usePathname } from "next/navigation";

interface RentBookingWidgetProps {
  price: number;
  stock: number;
  gearId : string;
}

export const BookingWidget = ({ price, stock, gearId }: RentBookingWidgetProps) => {
  const { user } = useUserStore();
  const pathname = usePathname()

  const bookingSchema = createRentBookingSchema(stock);
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
  const estimatedTotal = price * quantity * totalDays;

  const isAvailable = stock > 0;
  const todayStr = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: RentBookingFormValues) => {
    if (!user?.data) {
      toast.error("Please Login to place an order!");
      return;
    }

    try {
      const payload = {
        gearId: gearId,
        quantity: Number(data.quantity),
        totalAmount: estimatedTotal,
        collectionDate: data.startDate,
        returnDate: data.endDate,
      };

      const result = await PlaceOrderAction(payload);

      if (result?.success) {
        toast.success(result.message || "Order Placed successfully.");
        reset(); // ✅ Success হলেই শুধু রিসেট হবে
      } else {
        toast.error(result?.message || "Failed to place order. Try again!");
      }
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Something went wrong. Please try again.");
    }
  };


  return (
    <div>
      {user?.data ? (
        <>
          <div className="sticky top-24 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                  ৳{price}
                </span>
                <span className="text-zinc-500 text-sm font-medium">
                  {" "}
                  / day
                </span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full font-medium">
                Verified Gear
              </span>
            </div>

            {/* Date Picker Range Inputs */}
           
             <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
                Select Rental Duration
              </label>
            
            <form onSubmit={handleSubmit(onSubmit)}>
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
                Quantity (Max: {stock})
              </label>
              <input
                type="number"
                min={1}
                max={stock}
                {...register("quantity", { valueAsNumber: true })}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {errors.quantity && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

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

          </div>


            {/* Action Button */}
            <Button
              disabled={!isAvailable}
              className="w-full py-6 mt-2 text-base font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg shadow-emerald-600/20 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 cursor-pointer"
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>

            {/* Out of Stock Warning */}
            {!isAvailable && (
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-2">
                <ShieldAlert className="w-4 h-4" /> This item is currently out
                of stock.
              </p>
            )}

            </form>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-dashed border-zinc-300 dark:border-zinc-700 space-y-4">
            {/* Icon with Subtle Background */}
            <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Login to Rent this Item
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[220px] mx-auto">
                Please log in to check availability and request a booking.
              </p>
            </div>

            {/* Action Button */}
            <Link href={`/login?redirectTo=${encodeURIComponent(pathname)}`} className="w-full pt-2">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                <LogIn className="w-4 h-4" />
                <span>Login to Rent</span>
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
