"use client";

import React from "react";
import { 
  ShoppingBag, 
  Clock, 
  Star, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2 
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// 📊 Fake Data for Initial Visualization
const monthlySpendingData = [
  { month: "Jan", spend: 120 },
  { month: "Feb", spend: 300 },
  { month: "Mar", spend: 250 },
  { month: "Apr", spend: 480 },
  { month: "May", spend: 320 },
  { month: "Jun", spend: 650 },
  { month: "Jul", spend: 540 },
];

const categoryData = [
  { category: "Cameras", rentals: 8 },
  { category: "Lenses", rentals: 12 },
  { category: "Lighting", rentals: 5 },
  { category: "Audio", rentals: 3 },
  { category: "Drones", rentals: 2 },
];

const recentActivity = [
  {
    id: "ORD-9823",
    item: "Sony Alpha A7 IV",
    date: "Jul 28, 2026",
    amount: "$150.00",
    status: "Pending",
  },
  {
    id: "ORD-9781",
    item: "Canon RF 24-70mm f/2.8L",
    date: "Jul 15, 2026",
    amount: "$85.00",
    status: "Completed",
  },
  {
    id: "ORD-9654",
    item: "Aputure 300d II Light",
    date: "Jun 30, 2026",
    amount: "$120.00",
    status: "Completed",
  },
];

const CustomerDashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* 🟢 Header Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Rental Overview
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Track your gear rental activity, expenses, and pending requests in one place.
        </p>
      </div>

      {/* 🟢 1. Top Stat Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">30</h2>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="h-3 w-3" /> +12% from last month
            </p>
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Pending Orders
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">02</h2>
            <p className="text-xs text-amber-600 flex items-center gap-1 mt-1 font-medium">
              Awaiting confirmation
            </p>
          </div>
        </div>

        {/* Reviews Posted Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Reviews Given
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">18</h2>
            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
              4.9 average rating given
            </p>
          </div>
        </div>

        {/* Total Money Spent Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Total Spent
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">$2,680</h2>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="h-3 w-3" /> Lifetime spending
            </p>
          </div>
        </div>
      </div>

      {/* 🟢 2. Charts Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Spending Area Chart (Takes 4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Spending History
              </h3>
              <p className="text-xs text-zinc-500">Monthly breakdown of rental expenses ($)</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySpendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary, #2563eb)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary, #2563eb)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="spend" stroke="var(--primary, #2563eb)" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Rented Gear Categories Bar Chart (Takes 3 cols) */}
        <div className="lg:col-span-3 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Category Preference
              </h3>
              <p className="text-xs text-zinc-500">Most rented equipment types</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="rentals" fill="var(--primary, #2563eb)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🟢 3. Recent Activity / Quick Summary Table */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Recent Orders
            </h3>
            <p className="text-xs text-zinc-500">Quick view of your latest gear bookings</p>
          </div>
          <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-medium">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Gear Name</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {recentActivity.map((order) => (
                <tr key={order.id} className="text-zinc-700 dark:text-zinc-300">
                  <td className="py-3.5 font-semibold text-zinc-900 dark:text-zinc-100">
                    {order.id}
                  </td>
                  <td className="py-3.5">{order.item}</td>
                  <td className="py-3.5 text-zinc-500">{order.date}</td>
                  <td className="py-3.5 font-medium">{order.amount}</td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        order.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                      }`}
                    >
                      {order.status === "Completed" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;