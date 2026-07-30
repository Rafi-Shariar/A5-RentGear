

import Link from "next/link";
import { Package } from "lucide-react";

import UserInfoNav from "./_components/shared/UserInfoNav";
import Sidebar from "./_components/shared/Sidebar";
import MobileMenuButton from "./_components/shared/MobileMenuButtons";
import TanstackProvider from "@/providers/tanstackProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans flex flex-col lg:flex-row">
      {/* 🔵 Desktop & Mobile Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 lg:px-8">
          {/* Mobile Sidebar Toggle Button */}
          <MobileMenuButton />

          <div className="flex items-center gap-2 lg:hidden">
            <Package className="w-5 h-5 text-primary" />
            <span className="font-bold text-zinc-900 dark:text-white">GearRent</span>
          </div>

          {/* 🔵 Dynamic Client User Info (Name, Email, Phone) */}
          <div className="ml-auto">
            <UserInfoNav />
          </div>
        </header>

        {/* Dynamic Route Pages */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <TanstackProvider>
          {children}
          </TanstackProvider>
        </main>
      </div>
    </div>
  );
}