"use client";

import { PaymentItem } from "@/lib/types";
import useSWR from "swr";

export const usePaymentHistory = () => {

  const { data, error, isLoading, mutate } = useSWR<PaymentItem[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments`);

  return {
    payments: data || [],
    isLoading,
    isError: error,
    refetch: mutate,
  };
};