'use client';

import { IGear } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

type GearItem = {
  gear : IGear
}

export default function GearCard({gear} : GearItem) {


  const [isWishlisted, setIsWishlisted] = useState(false);



  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600 font-bold" };
    if (stock < 5) return { text: `${stock} left`, color: "text-amber-600 font-medium" };
    return { text: "In Stock", color: "text-zinc-500 font-normal" };
  };

  const stockStatus = getStockStatus(gear.stock);

  return (
    /* Card Container: Compact width (max-w-sm / 320px-350px range), responsive and smooth shadow */
    <div className="w-full max-w-95 overflow-hidden rounded-2xl border border-primary/40  bg-white p-3 shadow-xl  transition-shadow">
      
      {/* Top Image Container: Fixed height aspect-ratio */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-100">
        
        {/* Status Badges & Wishlist */}
        <div className="absolute left-3 top-3 right-3 flex items-center justify-between z-10">
          {/* {gear.isBestSeller ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-zinc-900 backdrop-blur-sm shadow-sm">
              Best Seller
            </span>
          ) : <div />} */}
          
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform active:scale-90 hover:bg-white"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg 
              className={`h-4 w-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-zinc-600 hover:text-red-500'}`} 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

        {/* Clean, Proportionate Image */}
        <div className="relative h-full w-full p-4">
          <Image 
            src={gear.imageURL}
            alt={gear.title}
            fill
            className="object-cover rounded-lg transition-transform duration-500 hover:scale-105"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-4 pb-2 px-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-primary">{gear.brand}</span>
          <span className={stockStatus.color}>{stockStatus.text}</span>
        </div>
        
        {/* Title */}
        <h3 className="mt-1.5 text-base font-semibold text-zinc-900 line-clamp-1 hover:line-clamp-none transition-all">
          {gear.title}
        </h3>
        
        {/* Price */}
        <p className="mt-1 text-lg font-bold text-zinc-900">{formatUSD(gear.price)}</p>
        
        {/* Action Button */}
        <button className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/75 hover:text-green-950 active:scale-[0.98]">
          Rent Now
        </button>
      </div>
    </div>
  );
}