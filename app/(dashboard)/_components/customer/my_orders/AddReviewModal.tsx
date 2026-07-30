"use client";

import React, { useState } from "react";
import { Star, X, Loader2 } from "lucide-react";
import { RentalOrder } from "@/lib/types";
import { useAddReview } from "@/app/(dashboard)/_hooks/useAddReview";
import { toast } from "sonner";

interface AddReviewModalProps {
  order: RentalOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddReviewModal = ({ order, isOpen, onClose }: AddReviewModalProps) => {
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate: addReview, isPending } = useAddReview();

  if (!isOpen || !order) return null;

  const handleClose = () => {
    setRatings(0);
    setComment("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (ratings === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    addReview({
        orderId: order.orderId,
        ratings,
        comment,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully.");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to submit review. Try again.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Write a Review
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {order.gear.title}
            </p>
            <p className="text-xs text-zinc-500">{order.gear.brand}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Rating
            </label>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatings(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= ratings
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-300 dark:text-zinc-700"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Your Feedback
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this equipment..."
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={handleClose}
              className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Review</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};