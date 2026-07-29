'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ShieldAlert } from 'lucide-react';

interface RentBookingWidgetProps {
  price: number;
  stock: number;
}

export const BookingWidget = ({ price, stock }: RentBookingWidgetProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const isAvailable = stock > 0;

  return (
    <div className="sticky top-24 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">৳{price}</span>
          <span className="text-zinc-500 text-sm font-medium"> / day</span>
        </div>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full font-medium">
          Verified Gear
        </span>
      </div>

      {/* Date Picker Range Inputs */}
      <div className="space-y-4">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
          Select Rental Duration
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400">From</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-zinc-400">To</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        disabled={!isAvailable}
        className="w-full py-6 text-base font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg shadow-emerald-600/20 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 cursor-pointer"
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        {isAvailable ? "Proceed to Rent" : "Currently Unavailable"}
      </Button>

      {/* Out of Stock Warning */}
      {!isAvailable && (
        <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-2">
          <ShieldAlert className="w-4 h-4" /> This item is currently out of stock.
        </p>
      )}
    </div>
  );
};