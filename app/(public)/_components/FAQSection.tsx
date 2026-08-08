"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

// ShareGear specific customer queries
const FAQS = [
  {
    id: "item-1",
    question: "How do I pick up the gear after my booking is confirmed?",
    answer:
      "Once the owner approves your rental request and payment is completed, you will receive the owner's contact details and exact pickup location. You can coordinate a convenient time directly with the owner to inspect and pick up the gear.",
  },
  {
    id: "item-2",
    question: "What happens if the gear is damaged during my trip?",
    answer:
      "All rentals are covered under ShareGear's rental guidelines and security deposit policy. Minor wear and tear from normal use is expected, but for accidental damage, repair or replacement costs will be settled using the security deposit held during booking.",
  },
  {
    id: "item-3",
    question: "Can I cancel or extend my rental duration?",
    answer:
      "Yes! You can request an extension through your dashboard if the gear is available for those extra dates. Cancellations made 24 hours prior to the pickup time are eligible for a full refund according to our cancellation policy.",
  },
  {
    id: "item-4",
    question: "How are owners and gear quality verified on ShareGear?",
    answer:
      "Every owner undergoes identity verification (NID/Passport check) before listing gear. Additionally, renters leave ratings and reviews after every trip, ensuring you always get high-quality and well-maintained equipment.",
  },
  {
    id: "item-5",
    question: "Do I need to pay a security deposit before renting?",
    answer:
      "Yes, a refundable security deposit is held temporarily at the time of booking depending on the gear's value. The full deposit is automatically released back to your payment account once the owner confirms the safe return of the item.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3  mb-6">
       
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="text-primary">Frequently</span> Asked Questions
        </h2>
        <p className="text-sm sm:text-xm text-gray-500 dark:text-zinc-400 max-w-xl mx-auto">
          Everything you need to know about renting and sharing gear safely on ShareGear.
        </p>
      </div>

      {/* shadcn Accordion */}
      <div className="bg-white dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQS.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-gray-100 dark:border-zinc-800/80 last:border-b-0 px-2 py-1"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 dark:text-zinc-100 hover:text-primary dark:hover:text-primary transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}