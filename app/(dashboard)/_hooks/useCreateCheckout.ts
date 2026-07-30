"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCheckoutSessionAction } from "../_actions/customer_actions/paymentAction";

export const useCreateCheckoutSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      return await createCheckoutSessionAction(orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-overview"],
      });
    },
  });
};