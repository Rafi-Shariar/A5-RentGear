"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  CalendarCheck, 
  PackageCheck, 
  RotateCcw, 
  PlusCircle, 
  ShieldCheck, 
  Wallet, 
  Sparkles, 
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import img from '@/assets/bannerImage.jpg'

// Renter Steps Config
const renterSteps = [
  {
    step: "01",
    title: "Browse & Find Gear",
    description: "Search from hundreds of verified gears—cameras, camping tents, sports items, and outdoor equipment near you.",
    icon: Search,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-200/50",
  },
  {
    step: "02",
    title: "Select Dates & Book",
    description: "Choose your collection and return dates, review pricing details, and place your rental booking request securely.",
    icon: CalendarCheck,
    color: "text-blue-500 bg-blue-500/10 border-blue-200/50",
  },
  {
    step: "03",
    title: "Pick Up or Get Delivered",
    description: "Receive the inspected gear at your doorstep or pick it up directly from the provider shop at your convenience.",
    icon: PackageCheck,
    color: "text-purple-500 bg-purple-500/10 border-purple-200/50",
  },
  {
    step: "04",
    title: "Enjoy & Return Easily",
    description: "Use the gear on your trip or project. Once your rental duration ends, return it back safely as scheduled.",
    icon: RotateCcw,
    color: "text-amber-500 bg-amber-500/10 border-amber-200/50",
  },
];

// Provider Steps Config
const providerSteps = [
  {
    step: "01",
    title: "List Your Items",
    description: "Upload high-quality photos, set your daily rental price, and specify gear availability rules in minutes.",
    icon: PlusCircle,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-200/50",
  },
  {
    step: "02",
    title: "Accept Booking Orders",
    description: "Review incoming rental requests, verify customer booking dates, and accept order confirmations.",
    icon: ShieldCheck,
    color: "text-blue-500 bg-blue-500/10 border-blue-200/50",
  },
  {
    step: "03",
    title: "Handover Equipment",
    description: "Handover the equipment safely to the renter or dispatch it via courier after a quick condition check.",
    icon: PackageCheck,
    color: "text-purple-500 bg-purple-500/10 border-purple-200/50",
  },
  {
    step: "04",
    title: "Get Paid Directly",
    description: "Receive smooth and secure payouts to your account once the gear is successfully returned by the renter.",
    icon: Wallet,
    color: "text-amber-500 bg-amber-500/10 border-amber-200/50",
  },
];

// FAQs Config
const faqs = [
  {
    q: "How does payment and deposit work?",
    a: "Payments are processed securely via our online gateway. Depending on the gear category and provider terms, a refundable security deposit may be placed, which is released upon safe return.",
  },
  {
    q: "What if the equipment gets damaged during rental?",
    a: "We recommend inspecting the item thoroughly during collection. If damage occurs during your rental period, our support team will review the issue and utilize security deposits or coverage policies according to platform guidelines.",
  },
  {
    q: "Can I extend my rental period?",
    a: "Yes! You can request an extension directly through your dashboard before your current rental period ends, subject to provider approval and availability.",
  },
  {
    q: "How do I become a verified gear provider?",
    a: "Simply sign up, complete your profile verification, and start listing your gear items with clear details and daily rental rates.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="py-10 md:py-16 space-y-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 🌟 1. HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold border-primary/30 text-primary gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Simple & Transparent Process
        </Badge>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          How Our Gear Rental Platform Works
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Whether you want to rent equipment for your next adventure or list your gear to earn extra money, we make the process smooth and secure.
        </p>
      </section>

      {/* 🔄 2. RENTER VS PROVIDER TABBED STEPS */}
      <section className="space-y-8">
        <Tabs defaultValue="renter" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12 p-1 rounded-2xl bg-muted/80">
              <TabsTrigger value="renter" className="rounded-xl font-semibold text-sm">
                For Renters
              </TabsTrigger>
              <TabsTrigger value="provider" className="rounded-xl font-semibold text-sm">
                For Gear Owners
              </TabsTrigger>
            </TabsList>
          </div>

          {/* RENTER CONTENT */}
          <TabsContent value="renter" className="space-y-12 animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renterSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={idx} className="relative border-border/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-extrabold text-muted-foreground/30 font-mono">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <Button asChild size="lg" className="rounded-xl font-semibold gap-2 px-8 shadow-md">
                <Link href="/gear">
                  Browse Gear Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* PROVIDER CONTENT */}
          <TabsContent value="provider" className="space-y-12 animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {providerSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={idx} className="relative border-border/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-extrabold text-muted-foreground/30 font-mono">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <Button asChild size="lg" className="rounded-xl font-semibold gap-2 px-8 shadow-md">
                <Link href="/provider/add-gear">
                  List Your First Gear
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* 🖼️ 3. VISUAL / IMAGE BANNER */}
      <section className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            Guaranteed Quality & Support
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            We Take Care of Security and Smooth Handovers
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Every order features collection-to-return timeline tracking, verified customer profiles, and direct provider communication so both parties can deal with total peace of mind.
          </p>
        </div>
        <div className="lg:col-span-6 relative aspect-[16/10] bg-muted">
          <Image
            src={img}
            alt="Seamless gear handoff process"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ❓ 4. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="border border-border/60 rounded-2xl px-5 bg-card/50"
            >
              <AccordionTrigger className="text-sm sm:text-base font-semibold hover:no-underline py-4 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

    </div>
  );
};

export default HowItWorksPage;