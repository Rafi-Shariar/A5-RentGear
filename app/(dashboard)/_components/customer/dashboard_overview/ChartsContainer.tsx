"use client"
import React from 'react';
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
const ChartsContainer = () => {
    return (
        <div>
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
        </div>
    );
};

export default ChartsContainer;