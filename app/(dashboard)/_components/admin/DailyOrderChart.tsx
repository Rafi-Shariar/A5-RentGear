"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, TrendingUp, Calendar } from "lucide-react";
import { getOrderList } from "../../_actions/admin_actions/orderAction";

interface OrderItem {
  orderId: string;
  orderedAt: string;
}

export default function DailyOrdersChart() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await getOrderList()

       

        

        if ( res.success && res.data?.orders) {
          setOrders(res.data.orders);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Failed to fetch admin rentals data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminOrders();
  }, []);

  // 📊 Process API data to map days of the current month (e.g. Day 1 - Day 31)
  const chartData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Get total days in the current month
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Initialize counts for all days of the current month
    const daysMap: { [key: number]: number } = {};
    for (let day = 1; day <= totalDaysInMonth; day++) {
      daysMap[day] = 0;
    }

    // Populate actual order counts based on orderedAt date
    orders.forEach((order) => {
      const orderDate = new Date(order.orderedAt);
      if (
        orderDate.getFullYear() === currentYear &&
        orderDate.getMonth() === currentMonth
      ) {
        const day = orderDate.getDate();
        daysMap[day] = (daysMap[day] || 0) + 1;
      }
    });

    // Transform map to Recharts format
    return Object.keys(daysMap).map((dayStr) => {
      const day = Number(dayStr);
      return {
        dayLabel: `Day ${day}`,
        dayNumber: day,
        ordersCount: daysMap[day],
      };
    });
  }, [orders]);

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Order Analytics</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            Daily Received Orders
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700/60">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span>{currentMonthName}</span>
        </div>
      </div>

      {/* Loader / Error / Chart View */}
      {isLoading ? (
        <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Generating chart analytics...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-rose-200/60 bg-rose-50/50 dark:border-rose-900/30 dark:bg-rose-950/10 text-xs text-rose-500">
          Failed to load order analytics chart.
        </div>
      ) : (
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary, #000)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary, #000)" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#374151"
                opacity={0.15}
              />

              {/* X Axis: Days of the Month */}
              <XAxis
                dataKey="dayNumber"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#888888" }}
                label={{
                  value: "Days of the month",
                  position: "insideBottom",
                  offset: -12,
                  fill: "#888888",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />

              {/* Y Axis: Num of Orders */}
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#888888" }}
                label={{
                  value: "Num of Orders",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fill: "#888888",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />

              {/* Smooth Hover Tooltip */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl bg-zinc-900 text-white p-3 text-xs shadow-xl border border-zinc-800 space-y-1">
                        <p className="font-semibold text-zinc-300">{data.dayLabel}</p>
                        <p className="font-bold text-primary text-sm">
                          {data.ordersCount} {data.ordersCount === 1 ? "Order" : "Orders"}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Curved Line / Area (Monotone type for smooth curve like sketch) */}
              <Area
                type="monotone"
                dataKey="ordersCount"
                stroke="var(--primary, #000)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#orderGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}