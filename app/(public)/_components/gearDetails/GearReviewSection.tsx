import React from 'react';
import { Star, User } from 'lucide-react';

// 🎯 API Response অনুযায়ী টাইপ ডিফাইন করা হয়েছে
export interface IGearReview {
  gearId: string;
  ratings: number;
  comment: string;
  customer: {
    name: string;
    createdAt?: string;
  };
}

interface GearReviewsSectionProps {
  reviews: IGearReview[];
}

export const GearReviewsSection = ({ reviews }: GearReviewsSectionProps) => {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          Customer Reviews ({reviews.length})
        </h3>
      </div>

      {reviews.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            No reviews for this gear yet.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Be the first to rent and share your experience!
          </p>
        </div>
      ) : (
        /* Review List */
        <div className="space-y-4">
          {reviews.map((review, idx) => {
            // তারিখ ফরম্যাটিং (e.g., Jul 30, 2026)
            const formattedDate = review.customer.createdAt
              ? new Date(review.customer.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : null;

            return (
              <div
                key={idx}
                className="p-5 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-3 transition-all"
              >
                {/* User Header & Rating */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {review.customer.name ? (
                        review.customer.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {review.customer.name || 'Anonymous User'}
                      </h4>
                      {formattedDate && (
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                          {formattedDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Stars */}
                  <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/60 shadow-xs">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= review.ratings
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-zinc-300 dark:text-zinc-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                      {review.ratings}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 pl-1 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};