"use client";

import Link from "next/link";
import { MountainSnow, Mail } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="w-full border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-xl ">
                <Image
                  src={logo}
                  alt="ShareGear Logo"
                  width={36}
                  height={40}
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Share<span className="text-primary">Gear</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Your ultimate marketplace for premium outdoor and event equipment
              rentals. Skip buying expensive gear and rent what you need, right
              when you need it.
            </p>

            {/* Social Links using React Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Link href="https://github.com/Rafi-Shariar" target="_blank" rel="noreferrer">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full hover:text-primary"
                >
                  <FaGithub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              
              <Link
                href="https://www.linkedin.com/in/rafi-shariar/"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full hover:text-primary"
                >
                  <FaLinkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link
                href="https://www.facebook.com/rafi.shariar.630040/"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full hover:text-primary"
                >
                  <FaFacebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Explore Gear
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/gear"
                  className="transition hover:text-primary"
                >
                  Cycling & Bikes
                </Link>
              </li>
              <li>
                <Link
                  href="/gears"
                  className="transition hover:text-primary"
                >
                  Camping & Hiking
                </Link>
              </li>
              <li>
                <Link
                  href="/gears"
                  className="transition hover:text-primary"
                >
                  Cameras & Photography
                </Link>
              </li>
              <li>
                <Link
                  href="/gears"
                  className="transition hover:text-primary"
                >
                  Water Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners & Community */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Partners & Community
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/register"
                  className="transition hover:text-primary"
                >
                  List Your Gear
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="transition hover:text-primary"
                >
                  How Renting Works
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition hover:text-primary">
                  FAQs & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          {/* <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Stay Updated</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Subscribe to get notified about new rental equipment and seasonal deals.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9 text-xs rounded-xl"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-xl text-xs font-semibold">
                Subscribe
              </Button>
            </form>
          </div> */}
        </div>

        {/* Bottom Divider */}
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-zinc-500 dark:text-zinc-400">
            <p>© {currentYear} RentGear. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="transition hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="transition hover:text-primary">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
