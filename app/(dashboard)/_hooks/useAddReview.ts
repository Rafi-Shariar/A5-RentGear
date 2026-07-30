"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReviewAction } from "../_actions/customer_actions/reviewAction"; // আপনার সঠিক পাথ দিন
import { IReviewPayload } from "@/lib/types";

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: IReviewPayload) => {
      return await addReviewAction(reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-orders"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-overview"],
      });
    },
  });
};