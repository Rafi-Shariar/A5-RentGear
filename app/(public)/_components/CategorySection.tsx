"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper এর প্রয়োজনীয় CSS ফাইলসমূহ
import "swiper/css";

import {
  Camera,
  Tent,
  Backpack,
  Bike,
  Compass,
  Shirt,
  Flashlight,
  Video,
} from "lucide-react";

// Static Categories based on Gear Rental Project
const CATEGORIES = [
  { id: 1, name: "Camping Gear", icon: Tent },
  { id: 2, name: "Cameras & Lenses", icon: Camera },
  { id: 3, name: "Bags & Backpacks", icon: Backpack },
  { id: 4, name: "Bicycles & Mobility", icon: Bike },
  { id: 5, name: "Trekking & Nav", icon: Compass },
  { id: 6, name: "Outdoor Apparel", icon: Shirt },
  { id: 7, name: "Lighting & Power", icon: Flashlight },
  { id: 8, name: "Video & Drones", icon: Video },
];

export default function CategoryCarousel() {
  return (
    <section className="w-full max-w-7xl mx-auto  pt-16 px-4 sm:px-6 lg:px-8">
       <div className="text-center max-w-2xl mx-auto mb-16 md:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-foreground tracking-tight">
            <span className="text-primary">Find Gear</span> In Every Category
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            No confusion or delays. Rent your desired gear with fast and reliable processing.
          </p>
        </div>

      {/* Carousel Container with End Blurs */}
      <div className="relative overflow-hidden">
        {/* Left Blur Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Right Blur Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Swiper Auto Slider */}
        <Swiper
  modules={[Autoplay]}
  loop={true}
  speed={5000} // নন-স্টপ স্মুথ ফ্লো এর জন্য ৪০০০-৬০০০ রেঞ্জ সেরা
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}
  allowTouchMove={false} // ইউজারের মাউস ড্র্যাগ বন্ধ করে নিরবচ্ছিন্ন গতি ধরে রাখা
  slidesPerView={3}
  spaceBetween={30}
  breakpoints={{
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 60,
    },
  }}
  className="category-swiper !py-2"
>
  {CATEGORIES.map((cat) => {
    const Icon = cat.icon;
    return (
      <SwiperSlide key={cat.id}>
        <div className="flex flex-col items-center justify-center shrink-0 space-y-2 select-none">
          {/* Big Icon */}
          <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-gray-700 dark:text-zinc-300 stroke-[1.5]" />

          {/* Small Title */}
          <span className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-zinc-400 text-center tracking-wide whitespace-nowrap">
            {cat.name}
          </span>
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>
      </div>
    </section>
  );
}