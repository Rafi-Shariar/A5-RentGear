/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { 
  Clock, 

  ArrowUpRight, 
  CheckCircle2 
} from "lucide-react"
import { recentOrders } from '@/utils/customerDashbaordHelper';
import { formatDate } from '@/utils/dateFormetter';
import Link from 'next/link';


const RecentOrdersContains = ({overview} : {overview : any}) => {

   const recentActivity = recentOrders(overview) || [];

    return (
        <div>
             <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Recent Orders
            </h3>
            <p className="text-xs text-zinc-500">Quick view of your latest gear bookings</p>
          </div>

          <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            <Link href={'/dashboard/my-orders'}>View All</Link> <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-medium">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Gear Name</th>
                <th className="pb-3 font-medium">Quantity</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {recentActivity.map((order) => (
                <tr key={order.orderId} className="text-zinc-700 dark:text-zinc-300">
                  <td className="py-3.5 font-semibold text-zinc-900 dark:text-zinc-100">
                    #{order.orderId.slice(0,12)}
                  </td>
                  <td className="py-3.5">{order.gear.title}</td>
                  <td className="py-3.5">{order.quantity}</td>
                  <td className="py-3.5 text-zinc-500">{formatDate(order.orderedAt)}</td>
                  <td className="py-3.5 font-medium">{order.totalAmount}</td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        order.status === "CONFIRMED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                      }`}
                    >
                      {order.status === "PLACED" ? (
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

export default RecentOrdersContains;