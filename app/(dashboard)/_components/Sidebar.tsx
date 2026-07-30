"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, User, Package, X } from "lucide-react";
import { create } from "zustand";

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

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/my-orders", icon: ShoppingBag },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-zinc-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            {/* Logo */}
            <div className="flex items-center justify-between px-2 py-3 border-b border-zinc-800">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white shadow-lg">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  GearRent
                </span>
              </Link>
              <button 
                onClick={close}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menus */}
            <nav className="mt-6 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-zinc-800 pt-4 px-2 text-xs text-zinc-500">
            <p>GearRent Dashboard v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}