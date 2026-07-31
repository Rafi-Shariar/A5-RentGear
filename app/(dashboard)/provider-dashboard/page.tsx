/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { 
  ShoppingBag, 
  Clock, 
  BadgeDollarSign, 
  Truck, 
  RotateCcw, 
  ArrowRight, 
  PlusCircle, 
  User, 
  PackageCheck,
  ChevronRight
} from 'lucide-react';

import { getMyOrdersAction } from '../_actions/provider_actions/orderAction';
import { calculateOrderStats } from '@/utils/providerOrderHelper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface IStats {
     totalOrders : number;
        newOrders : number;
        totalAmount : number;
        pickedUp : number;
        returned : number
}

const ProviderDashboard = async () => {
  const ordersRes = await getMyOrdersAction();
  const orders = ordersRes.data || [];

  const stats : IStats = calculateOrderStats(orders);

  // Recent 5 orders for fast overview
  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
      case 'RETURNED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'CONFIRMED':
      case 'PICKED_UP':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400';
      case 'PLACED':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Provider Dashboard
          </h1>
          <p className="text-sm text-zinc-500">
            Welcome back! Here is what is happening with your rental inventory today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
            <Link href="/provider-dashboard/add-gear">
              <PlusCircle className="h-4 w-4" /> Add New Gear
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Earnings */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Total Revenue
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <BadgeDollarSign className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              ৳{(stats.totalAmount || 0).toLocaleString()}
            </p>
            <p className="text-xs text-zinc-400 mt-1">Cumulative earnings</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Total Orders
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {stats.totalOrders || 0}
            </p>
            <p className="text-xs text-zinc-400 mt-1">All time bookings</p>
          </div>
        </div>

        {/* New Orders */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              New Orders
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {stats.newOrders || 0}
            </p>
            <p className="text-xs text-zinc-400 mt-1">Pending action</p>
          </div>
        </div>

        {/* Picked Up */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Active Rentals
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {stats.pickedUp || 0}
            </p>
            <p className="text-xs text-zinc-400 mt-1">Currently picked up</p>
          </div>
        </div>

        {/* Returned */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Returned
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              <RotateCcw className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {stats.returned || 0}
            </p>
            <p className="text-xs text-zinc-400 mt-1">Returned items</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-emerald-600" />
              Recent Booking Activity
            </h2>

            <Link
              href="/provider-dashboard/my-orders"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 flex items-center gap-1"
            >
              View All Orders <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 text-sm">
                No rental bookings found yet.
              </div>
            ) : (
              <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                {recentOrders.map((order: any) => (
                  <div
                    key={order.orderId}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden border bg-zinc-100">
                        <Image
                          src={order.gear.imageURL}
                          alt={order.gear.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                          {order.gear.title}
                        </p>
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <User className="h-3 w-3" /> {order.user.name} • Qty: {order.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          ৳{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          {format(new Date(order.orderedAt), 'MMM dd, yyyy')}
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${getStatusBadge(order.status)}`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Quick Action & Guidance */}
        <div className="space-y-6">
          {/* Quick Shortcuts */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Quick Shortcuts
            </h3>

            <div className="space-y-2">
              <Link
                href="/provider-dashboard/my-orders"
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 transition-colors group"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Update Order Statuses
                  </p>
                  <p className="text-xs text-zinc-400">
                    Mark items as Picked Up or Returned
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/provider-dashboard/my-gears"
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 transition-colors group"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Manage Gear Inventory
                  </p>
                  <p className="text-xs text-zinc-400">
                    Update prices, availability & stock
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        
        </div>
      </div>

       
    </div>
  );
};

export default ProviderDashboard;