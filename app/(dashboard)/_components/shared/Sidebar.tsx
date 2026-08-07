"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut, Globe, User as UserIcon } from "lucide-react";
import { create } from "zustand";
import { ISidebarItem } from "@/lib/types";
import { useUserStore } from "@/lib/store/useUserStore";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { sidebarMenuItems } from "../../_config/sidebarMenuItems";
import { logout } from "@/services/logout";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { DashboardThemeToggle } from "@/components/shared/DashboardThemToggleButton";

// Mobile Drawer State Management via lightweight Zustand
interface SidebarState {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface SidebarProps {
  onLogout?: () => void; // আপনার Logout ফাংশনটি Prop হিসেবে পাস করার জন্য
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  let navItems: ISidebarItem[] = [];

  if (user?.data) {
    if (user.data.role === "CUSTOMER") {
      navItems = sidebarMenuItems.CUSTOMER;
    } else if (user.data.role === "PROVIDER") {
      navItems = sidebarMenuItems.PROVIDER;
    } else if (user.data.role === "ADMIN") {
      navItems = sidebarMenuItems.ADMIN;
    }
  }

    const handleLogout = async () => {
      await logout();
      clearUser();
      router.push('/login');
      router.refresh();
    };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-zinc-900 text-white transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-30 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          {/* Top Section: Logo + Navigation */}
          <div className="flex flex-col gap-6">
            {/* Logo Header */}
            <div className="flex items-center justify-between px-2 py-2 border-b border-zinc-800/80">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src={logo}
                    alt="ShareGear Logo"
                    width={36}
                    height={40}
                    priority
                  />
                </div>
                <span className="text-xl font-semibold tracking-tight">
                  Share<span className="font-extrabold text-primary">Gear</span>
                </span>
              </Link>
              <button
                onClick={close}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                Menu
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/25 font-semibold"
                        : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section: Profile & Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800/80">

          {/* <div className="flex items-center text-sm font-medium text-zinc-400 hover:bg-zinc-800/70 hover:text-white transition-all duration-200">
              <h1>Theme: </h1>
               <ThemeToggleButton/>
                
               
              </div> */}
            
            <DashboardThemeToggle/>

            

            {/* Action Buttons */}
            <div className="flex flex-col gap-1">

              <Link
                href="/dashbaord/my-profile"
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/70 hover:text-white transition-all duration-200"
              >
                <Globe className="h-4 w-4 shrink-0" />
                <span>Update Profile Info</span>
              </Link>
              {/* Back to Website */}
              <Link
                href="/"
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/70 hover:text-white transition-all duration-200"
              >
                <Globe className="h-4 w-4 shrink-0" />
                <span>Back to Website</span>
              </Link>

              

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}