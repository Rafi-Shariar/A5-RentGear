'use client';

import { Star } from 'lucide-react';
import React, { useState } from 'react';

interface ReviewSectionProps {
  orderId: string;
  gearId: string;
  existingReview?: {
    ratings: number;
    comment: string;
  } | null;
}

const ReviewSection = ({ orderId, gearId, existingReview }: ReviewSectionProps) => {
  const [rating, setRating] = useState<number>(existingReview?.ratings || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(existingReview?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(!!existingReview);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: আপনার Server Action বা API Endpoint কল করুন
      // await createReviewAction({ orderId, gearId, rating, comment });
      console.log('Submitting Review:', { orderId, gearId, rating, comment });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
        {submitted ? 'Your Review' : 'Rate & Review your Rental'}
      </h2>

      {submitted ? (
        <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs font-bold text-gray-700 ml-2">{rating}.0 / 5.0</span>
          </div>
          <p className="text-sm text-gray-700 italic">comment</p>
          <p className="text-xs text-emerald-600 font-medium pt-1">
            ✓ Thank you! Your feedback helps other renters.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Stars Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="p-1 focus:outline-none transition-transform active:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-gray-500 ml-2">
                {hoverRating || rating} / 5
              </span>
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Your Feedback
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your experience with this gear?"
              required
              className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;