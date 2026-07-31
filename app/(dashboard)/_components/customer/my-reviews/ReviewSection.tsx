"use client";

import React, { useState } from "react";
import { Star, Loader2, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addReviewAction } from "@/app/(dashboard)/_actions/customer_actions/reviewAction";
import { ReviewSectionProps } from "@/lib/types";


export default function ReviewSection({
  orderId,
  gearId,
  existingReview,
}: ReviewSectionProps) {
  const isAlreadyReviewed = Boolean(existingReview);

  // Form states (Used only if not reviewed yet)
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a review comment.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        orderId,
        ratings : rating,
        comment: comment.trim(),
      };


      const res = await addReviewAction(payload)

      if(res.success){
        toast.success("Review submitted successfully!");
      }
      else{
        toast.error("Failed to submit review. Try again.");
      }

      
    } catch (error) {
      toast.error("Failed to submit review. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" /> Gear Review & Rating
        </h2>
        {isAlreadyReviewed && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed
          </span>
        )}
      </div>

      {/* 🟢 CASE 1: Review already submitted (Read-Only Mode) */}
      {isAlreadyReviewed && existingReview ? (
        <div className="space-y-3 bg-gray-50/70 p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= existingReview.ratings
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-bold text-gray-800 ml-2">
              {existingReview.ratings} / 5
            </span>
          </div>

          <p className="text-sm text-gray-700 italic">
            &ldquo;{existingReview.comment}&rdquo;
          </p>
        </div>
      ) : (
        /* 🟡 CASE 2: No review yet (Interactive Form) */
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Select Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-gray-500 ml-2">
                ({rating} Star{rating > 1 ? "s" : ""})
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">
              Your Feedback
            </label>
            <Textarea
              placeholder="How was the condition of the gear? Would you recommend it?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
              className="resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Review
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}