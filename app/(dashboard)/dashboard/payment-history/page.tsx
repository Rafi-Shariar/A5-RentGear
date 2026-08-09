"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, ArrowRight, Loader2, CheckCircle2, Clock, SearchIcon, RotateCcw } from "lucide-react";
import { PaymentItem } from "@/lib/types";
import { getMyPayments } from "../../_actions/customer_actions/paymentAction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaymentHistoryPage() {

  const router = useRouter();
  const pathname = usePathname();

  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const searchParams = useSearchParams()
  const currentSearchTerm = searchParams.get('searchTerm') || ""

  const [searchValue, setSearchValue] = useState<string>(currentSearchTerm);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        
        const res = await getMyPayments(currentSearchTerm);

        // console.log(res.data);
        
      
        if (res?.data) {
          setPayments(res.data);
        } else if (Array.isArray(res)) {
          setPayments(res);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [currentSearchTerm]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("searchTerm", searchValue.trim());
    } else {
      params.delete("searchTerm");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Reset Handler
  const handleReset = () => {
    setSearchValue("");
    router.replace(pathname);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 text-center text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400">
        <p className="text-sm font-medium">Failed to load payment history. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Payment History
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          View all your previous rental transactions and payment receipts.
        </p>
      </div>

      <div>
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Paste Order ID..."
              className="pl-9 h-10 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm"
            />
          </div>

          {/* Search Action Button */}
          <Button
            type="submit"
            className="h-10 px-4 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shrink-0 text-xs font-semibold"
          >
            Search
          </Button>

          {/* Reset Button (যাতে ফিল্টার মোছার প্রয়োজন হলে সহজে করা যায়) */}
          {currentSearchTerm && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleReset}
              title="Reset Search"
              className="h-10 w-10 rounded-xl shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-zinc-500" />
            </Button>
          )}
        </form>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Transaction ID</th>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Method</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-zinc-400">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((item: PaymentItem) => (
                <tr
                  key={item.paymentId}
                  className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  {/* Transaction ID */}
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.transactionId}
                  </td>

                  {/* Order ID */}
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                    #{item.orderId?.slice(0, 8)}
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-6 py-4 text-xs">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                    ৳{item.amount?.toLocaleString()}
                  </td>

                  {/* Method */}
                  <td className="px-6 py-4 text-xs capitalize text-zinc-600 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <CreditCard className="h-3.5 w-3.5 text-zinc-400" />
                      {item.method}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    {item.status === "SUCCESSFULL" ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Successful
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400">
                        <Clock className="h-3 w-3" />
                        {item.status}
                      </span>
                    )}
                  </td>

                  {/* Payment Details Button */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/payment-history/${item.paymentId}`}
                      title="View Payment Details"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}