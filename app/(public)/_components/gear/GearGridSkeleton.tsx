import React from 'react';
import GearCardSkeleton from './GearCardSkeleton';

export default function GearGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <GearCardSkeleton key={index} />
      ))}
    </div>
  );
}