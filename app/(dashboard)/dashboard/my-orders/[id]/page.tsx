import { getOrderDetails } from '@/app/(dashboard)/_actions/customer_actions/orderAction';
import ReviewSection from '@/app/(dashboard)/_components/customer/my-reviews/ReviewSection';

import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  Clock, 
  CreditCard, 
  Hash, 
  Mail, 
  MapPin, 
  PackageCheck, 
  Phone, 
  ShieldAlert, 
  Tag, 
  User 
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

const OrderDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <p className="text-red-500 font-medium">Invalid Order ID</p>
        <Link href="/dashboard/my-orders" className="text-sm text-primary underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const orderResponse = await getOrderDetails(id);
  const order = orderResponse?.data || orderResponse; 

  if (!order) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <p className="text-gray-600 dark:text-zinc-400 font-medium">Order Not Found</p>
        <Link href="/dashboard/my-orders" className="text-sm text-primary underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const { gear } = order;
  const { provider } = gear || {};

  // Rental Duration Calculation
  const collectionDate = new Date(order.collectionDate);
  const returnDate = new Date(order.returnDate);
  const rentalDays = Math.max(
    1,
    Math.ceil((returnDate.getTime() - collectionDate.getTime()) / (1000 * 3600 * 24))
  );

  // Status Badge Styling Helper
  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
      case 'COMPLETED':
      case 'RETURNED':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50';
      case 'PLACED':
      case 'PENDING':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/my-orders"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Orders
        </Link>
        <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono">
          Order ID: {order.orderId}
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h1>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${getStatusBadge(
                order.status
              )}`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              {order.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            Placed on:{' '}
            {new Date(order.orderedAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>

        <div className="text-left sm:text-right bg-gray-50 dark:bg-zinc-800/50 sm:bg-transparent sm:dark:bg-transparent p-4 sm:p-0 rounded-lg w-full sm:w-auto">
          <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
            Total Price
          </p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">${order.totalAmount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Gear Overview + Schedule + Review Section + Provider */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gear Details */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 space-y-4 transition-colors">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
              <Tag className="w-4 h-4 text-primary" /> Item Details
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                  {gear?.brand}
                </span>
                <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono">
                  Gear ID: {gear?.gearId}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-xl">{gear?.title}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-zinc-300 pt-2 border-t border-gray-50 dark:border-zinc-800/50">
                <span>Quantity: <strong className="text-gray-900 dark:text-white">{order.quantity} unit</strong></span>
                <span>•</span>
                <span>Rental Period: <strong className="text-gray-900 dark:text-white">{rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}</strong></span>
              </div>
            </div>
          </div>

          {/* Schedule / Pickup & Return Timeline */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 space-y-4 transition-colors">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Rental Schedule
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 p-4 rounded-xl space-y-1">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Collection Date
                </p>
                <p className="font-bold text-gray-900 dark:text-zinc-100 text-base">
                  {new Date(order.collectionDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 p-4 rounded-xl space-y-1">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Return Date
                </p>
                <p className="font-bold text-gray-900 dark:text-zinc-100 text-base">
                  {new Date(order.returnDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* 🌟 Conditional Review Section */}
          {order.status === 'RETURNED' && (
            <ReviewSection 
              orderId={order.orderId} 
              gearId={gear.gearId} 
              existingReview={order.review} 
            />
          )}

          {/* Provider Details (Contact Information) */}
          {provider && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 space-y-4 transition-colors">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
                <Building2 className="w-4 h-4 text-primary" /> Provider / Gear Location
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Provider Name</p>
                  <p className="font-bold text-gray-800 dark:text-zinc-200 mt-0.5">{provider.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" /> Pickup Address
                  </p>
                  <p className="font-medium text-gray-800 dark:text-zinc-200 mt-0.5">{provider.address}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" /> Support Email
                  </p>
                  <a
                    href={`mailto:${provider.email}`}
                    className="font-medium text-primary hover:underline mt-0.5 block"
                  >
                    {provider.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" /> Contact Number
                  </p>
                  <a
                    href={`tel:${provider.phoneNumber}`}
                    className="font-medium text-primary hover:underline mt-0.5 block"
                  >
                    {provider.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing & System Identifiers */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 space-y-5 transition-colors">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
              <CreditCard className="w-4 h-4 text-primary" /> Payment Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                <span>Duration</span>
                <span className="font-medium text-gray-900 dark:text-zinc-200">{rentalDays} Days</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                <span>Quantity</span>
                <span className="font-medium text-gray-900 dark:text-zinc-200">x{order.quantity}</span>
              </div>

              <hr className="border-gray-100 dark:border-zinc-800 my-2" />

              <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-1">
                <span>Total Amount</span>
                <span className="text-primary text-lg">${order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* System Audit */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 space-y-4 transition-colors">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
              <Hash className="w-4 h-4 text-primary" /> System Info
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                  <User className="w-3 h-3 text-gray-400 dark:text-zinc-500" /> Customer ID
                </p>
                <p className="font-mono text-gray-800 dark:text-zinc-300 break-all mt-0.5">
                  {order.customerId}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-zinc-400">Last Updated</p>
                <p className="font-medium text-gray-800 dark:text-zinc-300 mt-0.5">
                  {new Date(order.updatedAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-lg p-3 text-xs text-slate-600 dark:text-zinc-300 flex items-start gap-2 mt-4">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Please contact the provider directly for pickup instructions.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;