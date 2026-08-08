"use client";

import React from "react";
import { ShieldCheck, Lock, CalendarClock, DollarSign } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "Verified Community",
    description:
      "All owners and renters go through identity verification to build a trustworthy and safe rental network.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Secure Transactions",
    description:
      "Payments and security deposits are held safely until the rental period successfully finishes.",
    icon: Lock,
  },
  {
    id: 3,
    title: "Flexible Duration",
    description:
      "Rent gear for a day, a weekend trip, or a full month—customized entirely to your travel plans.",
    icon: CalendarClock,
  },
  {
    id: 4,
    title: "Affordable Premium Gear",
    description:
      "Access high-end cameras, camping tents, and gadgets directly from local owners at a fraction of the retail price.",
    icon: DollarSign,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
       
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Rent with <span className="text-primary">Confidence</span> & Peace of <span className="text-primary">Mind</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
          We prioritize safety, security, and affordability so you can focus on making memories.
        </p>
      </div>

      {/* Features 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="flex items-start gap-4 sm:gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80 shadow-sm transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-gray-50 dark:bg-zinc-800/80 text-primary shrink-0">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
              </div>

              {/* Text Content */}
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}