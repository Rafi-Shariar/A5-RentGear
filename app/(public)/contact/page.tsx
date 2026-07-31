"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@gearrental.com",
    subDetail: "We typically reply within 2 hours",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-200/50",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+880 1617-852079",
    subDetail: "Sat - Thu, 9:00 AM to 8:00 PM",
    color: "text-blue-500 bg-blue-500/10 border-blue-200/50",
  },
  {
    icon: MapPin,
    title: "Visit Our Hub",
    detail: "Mirpur-1, Dhaka, Bangladesh",
    subDetail: "47 A/B, Mazar Road Colony",
    color: "text-purple-500 bg-purple-500/10 border-purple-200/50",
  },
];

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Server Action / API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="py-10 md:py-16 space-y-16 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 🌟 1. HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="px-3.5 py-1.5 text-xs font-semibold border-primary/30 text-primary gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          We are Here to Help
        </Badge>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          Get in Touch with Our Team
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Have questions about booking gear, becoming a provider, or platform policies? Send us a message and we will get back to you shortly.
        </p>
      </section>

      {/* 📞 2. CONTACT INFO CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactDetails.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm font-semibold text-primary">{item.detail}</p>
                  <p className="text-xs text-muted-foreground">{item.subDetail}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* 📝 3. FORM & EXTRA INFO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Fill out the form below and our support team will respond as quickly as possible.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              <h3 className="text-lg font-bold text-foreground">Message Sent Successfully!</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                Thank you for reaching out. We have received your inquiry and will respond to your email address shortly.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-xl"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold">Your Name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 rounded-xl bg-muted/40 border-border/80 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 rounded-xl bg-muted/40 border-border/80 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-semibold">Subject</Label>
                <Input
                  id="subject"
                  required
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-11 rounded-xl bg-muted/40 border-border/80 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-semibold">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Write your details or inquiry here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="rounded-xl bg-muted/40 border-border/80 text-sm resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 rounded-xl font-semibold gap-2 shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Right Side: Office Hours & Banner */}
        <div className="lg:col-span-5 space-y-6">
          
          <Card className="border-border/80 bg-gradient-to-br from-muted/50 via-card to-muted/20 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Support Operating Hours</span>
              </div>
              
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground border-t border-border/60 pt-3">
                <div className="flex justify-between py-1">
                  <span>Saturday - Thursday:</span>
                  <span className="font-semibold text-foreground">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-t border-border/40">
                  <span>Friday:</span>
                  <span className="font-semibold text-foreground">2:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-t border-border/40">
                  <span>Online Emergency Support:</span>
                  <span className="font-semibold text-emerald-600">24/7 Available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dark Emerald Styled Banner */}
          <div className="rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041d14] via-[#02140d] to-[#010b07] p-8 text-white space-y-4 shadow-xl relative overflow-hidden">
            <div aria-hidden="true" className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Direct Assistance</span>
            <h3 className="text-xl font-bold">Need Immediate Help with an Order?</h3>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              If you have an active gear rental or an urgent pickup query, feel free to call our direct hotline for expedited service.
            </p>
            <div className="pt-2">
              <a 
                href="tel:+8801617852079" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                Call +880 1617-852079
              </a>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};

export default ContactPage;