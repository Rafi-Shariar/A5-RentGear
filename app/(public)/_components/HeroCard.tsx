"use client"; // Required for GSAP to work in the App Router

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import {
  Camera,
  Mountain,
  Bike,
  Tent,
  Dumbbell,
  Umbrella,
  GlassWater,
  BookOpenText,
  MountainSnow,
  Icon,
} from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import bannerImage from "@/assets/bannerImage.jpg";

const HeroCard = () => {
  // Reference for GSAP animation
  const gearUpRef = useRef<HTMLSpanElement>(null);

  // GSAP Animation: subtle vertical float on "GearUp"
  useEffect(() => {
    if (gearUpRef.current) {
      gsap.fromTo(
        gearUpRef.current,
        {
          y: 60, // Start 60px lower
          opacity: 0, // Start invisible
        },
        {
          y: 0, // Move to original position
          opacity: 1, // Fade in completely
          duration: 1.2, // Duration of the entrance animation
          ease: "power3.out", // Smooth deceleration effect
          delay: 0.3, // Slight delay after load for smoother feel
        },
      );
    }
  }, []);

  // Configuration for product icons spread across the banner
  const icons = [
    {
      Icon: Mountain,
      className: "hidden md:block top-[15%] left-[10%] text-blue-300 w-10 h-10",
    },
    {
      Icon: Camera,
      className:
        "hidden md:block top-[40%] left-[8%] text-amber-200 w-8 h-8 rotate-12",
    },
    {
      Icon: Bike,
      className:
        "hidden md:block top-[70%] left-[15%] text-teal-300 w-12 h-12 -rotate-15",
    },
    {
      Icon: Tent,
      className:
        "hidden md:block top-[15%] right-[10%] text-green-300 w-10 h-10",
    },
    {
      Icon: BookOpenText,
      className: "hidden md:block top-[45%] left-[20%] text-green-300 w-9 h-9",
    },
    {
      Icon: Umbrella,
      className:
        "hidden md:block top-[35%] right-[12%] text-red-200 w-8 h-8 -rotate-12",
    },
    {
      Icon: Dumbbell,
      className:
        "hidden md:block top-[65%] right-[16%] text-purple-300 w-10 h-10 rotate-15",
    },
    {
      Icon: GlassWater,
      className:
        "hidden md:block top-[75%] right-[26%] text-purple-300 w-10 h-10 rotate-15",
    },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-[#0a1122] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {/* Background Image: using 'priority' for LCP, no scaling, full cover */}
      <Image
        src={bannerImage}
        alt="Premium Outdoor Gear Background"
        fill
        priority
        unoptimized // Use this if not serving via Next.js optimized paths
        className="object-cover object-center"
      />

      {/* Optimized Gradient Overlay: subtle and modern */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-black/60 mix-blend-multiply" />

      {/* Floating Product Icons ( Lucide React ) */}
      {icons.map(({ Icon, className }, index) => (
        <div
          key={index}
          className={`absolute ${className} z-0 opacity-80 backdrop-blur-sm p-1.5 rounded-full bg-white/25`}
        >
          <Icon strokeWidth={1.5} className="w-full h-full" />
        </div>
      ))}

      {/* Hero Content (Centered) */}
      <div className="relative z-10 max-w-4xl px-8 py-16 text-center text-white flex flex-col items-center">
        {/* Headline: Less aggressive bolding, clear visual hierarchy */}
        <h1 className="text-lg md:text-xl f tracking-tight leading-tight max-w-3xl text-gray-200">
          Need a gear for a few days? Don&apos;t want to buy it?
        </h1>

        {/* The main focus: largest, animated text */}
        <div className="my-6  perspective-midrange">
          <span
            ref={gearUpRef}
            className="block text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-primary via-white to-white leading-none shadow-glow-teal"
          >
            ShareGear
          </span>
        </div>

        {/* Minimal, professional supporting paragraph */}
        <p className="text-lg md:text-base text-gray-400 font-light max-w-2xl mb-12">
          Instant access to premium hiking, camping, and sports equipment. Rent
          the best gear without the ownership cost. Easy, flexible, and always
          ready.
        </p>

        {/* Explore Button: Modern, animated CTA */}
        <Button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] active:scale-95">
          <span className="relative z-10 flex items-center gap-2">
            Find Your Gear
            <MountainSnow className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {/* Background shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
        </Button>
      </div>
    </div>
  );
};

export default HeroCard;
