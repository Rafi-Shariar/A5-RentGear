"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Search, CalendarCheck, PackageCheck, RotateCcw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import delivaryImage from '@/assets/delivaryImage.jpg'

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    title: "Browse & Select Gear",
    description: "Explore our wide collection of premium equipment, outdoor gear, and accessories matching your needs.",
    icon: Search,
    iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  {
    id: 2,
    title: "Book & Pay",
    description: "Choose your preferred rental collection and return dates, then confirm your booking seamlessly. Once confirmed, Pay & secure your product.",
    icon: CalendarCheck,
    iconBg: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    id: 3,
    title: "Collect & Use",
    description: "Get the verified gear delivered to your doorstep or pick it up directly from the shop ready to use.",
    icon: PackageCheck,
    iconBg: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    id: 4,
    title: "Easy Return",
    description: "Once your rental period ends, simply return the equipment hassle-free as scheduled.",
    icon: RotateCcw,
    iconBg: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
];

export const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Line Progress Animation on Scroll
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      // 2. Step Cards Fade & Slide Animation
      const cards = gsap.utils.toArray<HTMLElement>(".step-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20  relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            <span className="text-primary">How It</span> Works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            No confusion or delays. Rent your desired gear with fast and reliable processing.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Image Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-2xl bg-muted group">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={delivaryImage}
                  alt="Gear Rental Delivery"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Decorative Overlay Card (Matching your 2nd image layout) */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-background/85 backdrop-blur-md border border-border/80 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Verified Quality Gear</p>
                  <p className="text-[11px] text-muted-foreground">Inspected & ready for your next adventure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Steps Timeline Side */}
          <div className="lg:col-span-7 relative pl-6 sm:pl-10">
            
            {/* Timeline Background Line (Grey) */}
            <div className="absolute left-[19px] sm:left-[35px] top-4 bottom-4 w-1 bg-muted rounded-full -translate-x-1/2 " />
            
            {/* Timeline Animated Line (Primary Colored) */}
            <div
              ref={lineRef}
              className="absolute left-[19px] sm:left-[35px] top-4 w-1 bg-primary rounded-full -translate-x-1/2 origin-top"
            />

            {/* Steps Cards Stack */}
            <div className="space-y-12 sm:space-y-16">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="step-card relative flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Step Icon Badge */}
                    <div className={`ml-4 relative z-10 shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 bg-background ${step.iconBg}`}>
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1 sm:pt-2 space-y-1">
                      <span className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                        Step 0{step.id}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;