"use client";

import React from "react";
import { Leaf, PiggyBank, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";

const IMPACT_STATS = [
  {
    id: 1,
    badge: "Cost Savings",
    value: "Up to 80%",
    title: "Save Your Money",
    description: "Access flagship cameras and premium camping gear without paying full retail price for one-time trips.",
    icon: PiggyBank,
    // Colorful Styles for Card 1 (Blue & Cyan Theme)
    bgGradient: "bg-gradient-to-br from-blue-50/80 via-cyan-50/40 to-white dark:from-blue-950/30 dark:via-cyan-950/15 dark:to-zinc-900/80",
    hoverOverlay: "from-blue-500/15 via-cyan-500/10 to-transparent",
    borderColor: "border-blue-200/80 dark:border-blue-800/40 hover:border-blue-400 dark:hover:border-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/50",
    statColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    badge: "Eco Movement",
    value: "Zero Waste",
    title: "Sustainable Sharing",
    description: "Reduce manufacturing demand and electronic waste by sharing existing high-quality gear in your community.",
    icon: Leaf,
    // Colorful Styles for Card 2 (Emerald & Teal Theme)
    bgGradient: "bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white dark:from-emerald-950/30 dark:via-teal-950/15 dark:to-zinc-900/80",
    hoverOverlay: "from-emerald-500/15 via-teal-500/10 to-transparent",
    borderColor: "border-emerald-200/80 dark:border-emerald-800/40 hover:border-emerald-400 dark:hover:border-emerald-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50",
    statColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: 3,
    badge: "Gear Freedom",
    value: "100+ Choices",
    title: "Unlimited Flexibility",
    description: "Try out different gear setups for every adventure without cluttering your home with unused items.",
    icon: Sparkles,
    // Colorful Styles for Card 3 (Purple & Pink Theme)
    bgGradient: "bg-gradient-to-br from-purple-50/80 via-pink-50/40 to-white dark:from-purple-950/30 dark:via-pink-950/15 dark:to-zinc-900/80",
    hoverOverlay: "from-purple-500/15 via-pink-500/10 to-transparent",
    borderColor: "border-purple-200/80 dark:border-purple-800/40 hover:border-purple-400 dark:hover:border-purple-500",
    iconBg: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/50",
    statColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function Impact() {
  return (
    <section className="relative w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-10">
       
        
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-3xl mx-auto leading-tight">
          Smarter for Your <span className="text-primary">Wallet</span>, Better for the <span className="text-primary">Planet</span>
        </h2>
        
        <p className="text-base sm:text-xm text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Joining the gear-sharing movement helps you experience more while reducing waste and saving money.
        </p>
      </div>

      {/* Impact Grid Cards (Colorful Version) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {IMPACT_STATS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative group p-8 rounded-3xl backdrop-blur-xl ${item.bgGradient} ${item.borderColor} border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden`}
            >
              {/* Vibrant Glow Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.hoverOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 space-y-6">
                {/* Card Top Row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl ${item.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Big Stat Highlight */}
                <div>
                  <span className={`text-4xl sm:text-4xl font-black ${item.statColor} tracking-tight`}>
                    {item.value}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 group-hover:text-primary transition-colors">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
    </section>
  );
}