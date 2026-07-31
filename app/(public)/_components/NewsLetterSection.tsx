"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API Call / Server Action
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Glow Effect behind the card */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 blur-3xl -z-10" 
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Deep Green Card Styling */}
        <div className="relative rounded-3xl border border-emerald-800/40 bg-gradient-to-b from-[#041d14] via-[#02140d] to-[#010b07] p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden text-emerald-50">
          
          {/* Subtle Inner Glow Element */}
          <div 
            aria-hidden="true" 
            className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" 
          />

          {/* Top Decorative Subtle Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Join 5,000+ Gear Enthusiasts</span>
            </div>
          </div>

          {/* Heading and Subtitle */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Stay in the Loop with <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Exclusive Gear Deals
              </span>
            </h2>
            <p className="text-sm sm:text-base text-emerald-200/70 leading-relaxed">
              Subscribe to get notified about new rental listings, seasonal discount promo codes, and trending equipment updates directly to your inbox.
            </p>
          </div>

          {/* Form & Success State */}
          <div className="mt-8 max-w-md mx-auto relative z-10">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-medium text-sm animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>You are in! Check your inbox soon for updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-emerald-800/60 bg-[#06281c]/60 text-emerald-100 placeholder:text-emerald-300/40 focus-visible:ring-emerald-400 focus-visible:border-emerald-400 text-sm shadow-inner"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-12 px-6 rounded-xl font-semibold gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-900/40 transition-all hover:gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Privacy Note */}
            <p className="text-[11px] text-center text-emerald-300/50 mt-4">
              We respect your privacy. Unsubscribe at any time. No spam, guaranteed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;