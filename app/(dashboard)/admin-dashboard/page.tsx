import React from "react";

import { 
  Package, 
  Users, 
  ShoppingBag, 
  Wallet, 
  TrendingUp, 
  AlertCircle, 
  Layers 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminOverview } from "../_actions/admin_actions/overviewAction";

const AdminPage = async () => {

  const overviewRes = await getAdminOverview(); 

  if (!overviewRes?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Failed to Load Dashboard</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {overviewRes?.message || "Something went wrong while retrieving system analytics."}
        </p>
      </div>
    );
  }

  const { totalGears = 0, totalUsers = 0, totalOrder = 0, totalMoney = 0 } =
    overviewRes?.data || {};


  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${totalMoney.toLocaleString()}`,
      description: "Total earnings processed from rentals",
      icon: Wallet,
      badgeText: "+0.0%",
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-200/50",
    },
    {
      title: "Active Orders",
      value: totalOrder.toLocaleString(),
      description: "Total rental bookings across system",
      icon: ShoppingBag,
      badgeText: "Real-time",
      color: "text-blue-600 bg-blue-500/10 border-blue-200/50",
    },
    {
      title: "Registered Users",
      value: totalUsers.toLocaleString(),
      description: "Total customers & rental providers",
      icon: Users,
      badgeText: "Platform",
      color: "text-purple-600 bg-purple-500/10 border-purple-200/50",
    },
    {
      title: "Total Gear Items",
      value: totalGears.toLocaleString(),
      description: "Gears listed and available for rent",
      icon: Package,
      badgeText: "Inventory",
      color: "text-amber-600 bg-amber-500/10 border-amber-200/50",
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Admin System Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time performance stats, transaction metrics, and system inventory totals.
          </p>
        </div>
        <div>
          <Badge variant="outline" className="px-3 py-1.5 text-xs font-medium gap-1.5 border-primary/30 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Live
          </Badge>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2.5 rounded-xl border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="text-3xl font-extrabold tracking-tight text-foreground">
                  {card.value}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40 text-xs">
                  <span className="text-muted-foreground">{card.description}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                    {card.badgeText}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Action / Status Summary Banner */}
      <div className="rounded-xl border border-border/60 bg-gradient-to-r from-muted/50 via-card to-muted/30 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4 text-primary" />
              Platform Performance Snapshot
            </h3>
            <p className="text-xs text-muted-foreground">
              Currently hosting <strong className="text-foreground">{totalGears} gears</strong> managed by registered providers with <strong className="text-foreground">{totalOrder} order(s)</strong> processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;