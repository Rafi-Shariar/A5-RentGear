"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, ShoppingBag } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("success") === "false";


  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    }
  }, [isSuccess, queryClient]);

  if (!isSuccess && !isCanceled) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm text-zinc-500">Invalid payment session status.</p>
        <Link
          href="/dashboard/my-orders"
          className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white p-8 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        {isSuccess ? (
          <>
            {/* Success Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Payment Successful!
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Thank you for renting with GearUp. Your order status has been updated.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/dashboard/my-orders"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>View My Orders</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Failed/Canceled Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <XCircle className="h-10 w-10" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Payment Canceled
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Something went wrong or you canceled the checkout. No money was charged.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/dashboard/my-orders"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-rose-500"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Link>

              <Link
                href="/dashboard/my-orders"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Back to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}