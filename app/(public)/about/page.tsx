import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Repeat, 
  Users, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  Zap, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import img from '@/assets/delivaryImage.jpg'

const stats = [
  { label: "Active Gears Listed", value: "2,500+" },
  { label: "Happy Adventurers", value: "10,000+" },
  { label: "Verified Providers", value: "450+" },
  { label: "Successful Rentals", value: "18,000+" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Verified & Safe Gear",
    description: "Every item on our platform goes through quality checks so you can focus entirely on your trip or production.",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-200/40",
  },
  {
    icon: Repeat,
    title: "Seamless Circular Sharing",
    description: "We empower individuals and shops to earn from unused equipment while providing affordable access to renters.",
    color: "text-blue-500 bg-blue-500/10 border-blue-200/40",
  },
  {
    icon: HeartHandshake,
    title: "Community First",
    description: "Built on trust, transparent ratings, and responsive customer support to ensure memorable rental experiences.",
    color: "text-purple-500 bg-purple-500/10 border-purple-200/40",
  },
  {
    icon: Zap,
    title: "Instant Booking & Delivery",
    description: "Simple scheduling with flexible pickup or direct door-to-door delivery tracking for maximum convenience.",
    color: "text-amber-500 bg-amber-500/10 border-amber-200/40",
  },
];

const AboutPage = () => {
  return (
    <div className="space-y-20 py-10 md:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 🌟 1. HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold border-primary/30 text-primary gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Reimagining Equipment Access
        </Badge>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Empowering Your Next Adventure Without the{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-500 to-teal-400">
            Ownership Cost
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          We connect outdoor enthusiasts, creators, and professionals with verified gear owners. Rent premium equipment on demand, or turn your unused gear into passive income.
        </p>
      </section>

      {/* 📊 2. STATS OVERVIEW BANNER */}
      <section className="rounded-3xl border border-border/80 bg-gradient-to-r from-muted/60 via-card to-muted/40 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💡 3. OUR STORY & MISSION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Story Image Grid */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-xl aspect-[4/3] bg-muted">
            <Image
              src={img} // 👈 আপনার ইমেজের পাথ
              alt="Gear rental story"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Overlay Floating Card */}
          <div className="absolute -bottom-6 -right-2 sm:right-6 p-4 sm:p-5 rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-2xl flex items-center gap-4 max-w-xs">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Top Rated Rental Platform</p>
              <p className="text-xs text-muted-foreground mt-0.5">Trusted by thousands across the country</p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Why We Started This Platform
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            High-quality gear—whether for camping, trekking, photography, or events—is expensive and often ends up sitting in closets for most of the year. Meanwhile, people wanting to try new experiences face steep upfront costs.
          </p>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            We built this platform to bridge that gap. By facilitating safe peer-to-peer and shop rentals, we make exploration affordable for everyone while supporting a sustainable, circular economy.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-xl font-semibold gap-2 shadow-md">
              <Link href="/gear">
                Explore Available Gears
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 🛡️ 4. CORE VALUES / WHY CHOOSE US */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Core Principles</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Built for Trust & Ease
          </h2>
          <p className="text-sm text-muted-foreground">
            Here is how we ensure every gear rental transaction is smooth, safe, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 🚀 5. CTA CALLOUT SECTION */}
      <section className="rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041d14] via-[#02140d] to-[#010b07] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div aria-hidden="true" className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Have Gear Sitting Idle? <br />
            <span className="text-emerald-400">Start Earning Today</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/80 leading-relaxed">
            List your rental items in minutes, set your pricing and availability, and start earning from verified renters in your community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl px-8 shadow-lg shadow-emerald-950/50 w-full sm:w-auto">
              <Link href="/register">
                Become a Provider
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-emerald-700/60 text-primary hover:bg-emerald-900/40 hover:text-white rounded-xl px-8 w-full sm:w-auto">
              <Link href="/how-it-works">
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;