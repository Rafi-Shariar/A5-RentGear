import { Star } from 'lucide-react';

interface GearReviewsSectionProps {
  reviews: string[];
}

export const GearReviewsSection = ({ reviews }: GearReviewsSectionProps) => {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-12">
      <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
        Reviews & Ratings
      </h3>

      {reviews.length === 0 ? (
        <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 text-sm">No reviews for this gear yet.</p>
          <p className="text-xs text-zinc-400 mt-1">Be the first to rent and review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Render mapped reviews here */}
        </div>
      )}
    </div>
  );
};