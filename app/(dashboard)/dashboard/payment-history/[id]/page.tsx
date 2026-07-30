import { getPaymentDetails } from '@/app/(dashboard)/_actions/customer_actions/paymentAction';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  DollarSign, 
  Hash, 
  PackageCheck, 
  ShieldCheck, 
  Tag, 
  User 
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

const PaymentDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <p className="text-red-500 font-medium">Invalid Payment ID</p>
        <Link href="/dashboard/payment-history" className="text-sm text-primary underline">
          Back to Payments
        </Link>
      </div>
    );
  }

  // Fetching data on the server
  const payment = await getPaymentDetails(id);


  if (!payment) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <p className="text-gray-600 font-medium">Payment Record Not Found</p>
        <Link href="/dashboard/payments" className="text-sm text-primary underline">
          Back to Payments
        </Link>
      </div>
    );
  }

  const { order } = payment;
  const { gear } = order;

  // Rental Duration Calculation (in Days)
  const collectionDate = new Date(order.collectionDate);
  const returnDate = new Date(order.returnDate);
  const rentalDays = Math.ceil(
    (returnDate.getTime() - collectionDate.getTime()) / (1000 * 3600 * 24)
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/payments"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Payment History
        </Link>
        
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {payment.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <span>Transaction ID:</span>
            <span className="font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-xs">
              {payment.transactionId}
            </span>
          </p>
        </div>
        <div className="text-left sm:text-right bg-gray-50 sm:bg-transparent p-4 sm:p-0 rounded-lg w-full sm:w-auto">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Paid Amount</p>
          <p className="text-3xl font-black text-gray-900">${payment.amount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Gear Details + Rental Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rented Gear Item Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Tag className="w-4 h-4 text-primary" /> Rented Item Overview
            </h2>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative w-full sm:w-36 h-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                <img
                  src={gear.imageURL}
                  alt={gear.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 flex-grow">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                    {gear.brand}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Gear ID: {gear.gearId}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{gear.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                  <span className="font-semibold text-gray-900">${gear.price} <span className="text-xs font-normal text-gray-500">/ day</span></span>
                  <span>•</span>
                  <span>Quantity: <strong>{order.quantity} unit</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Timeline & Dates Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Rental Schedule & Period
              </span>
              <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                Duration: {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl space-y-1">
                <p className="text-xs text-blue-600 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Pickup / Collection Date
                </p>
                <p className="font-bold text-gray-900 text-base">
                  {new Date(order.collectionDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-1">
                <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Return Date
                </p>
                <p className="font-bold text-gray-900 text-base">
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

          {/* Comprehensive Order Metadata */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <PackageCheck className="w-4 h-4 text-primary" /> Associated Order Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div>
                <p className="text-xs text-gray-500">Order Reference ID</p>
                <p className="font-mono text-xs font-semibold text-gray-800 break-all">{order.orderId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Order Status</p>
                <span className="inline-block mt-0.5 text-xs font-bold text-emerald-600 uppercase">
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Order Placed Date</p>
                <p className="font-medium text-gray-800">
                  {new Date(order.orderedAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Order Last Updated</p>
                <p className="font-medium text-gray-800">
                  {new Date(order.updatedAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Billing Breakdown & Customer Data */}
        <div className="space-y-6">
          {/* Detailed Payment Breakdown Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <CreditCard className="w-4 h-4 text-primary" /> Financial Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Daily Rate</span>
                <span className="font-medium text-gray-900">${gear.price}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Duration</span>
                <span className="font-medium text-gray-900">{rentalDays} Days</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Quantity</span>
                <span className="font-medium text-gray-900">x{order.quantity}</span>
              </div>

              <hr className="border-gray-100 my-2" />

              <div className="flex justify-between text-gray-600">
                <span>Order Total</span>
                <span className="font-medium text-gray-900">${order.totalAmount}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Payment Method</span>
                <span className="font-semibold text-gray-900 capitalize flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-gray-500" /> {payment.method}
                </span>
              </div>

              <hr className="border-gray-100 my-2" />

              <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                <span>Amount Paid</span>
                <span className="text-primary text-lg">${payment.amount}</span>
              </div>
            </div>
          </div>

          {/* Audit Timestamps & Customer Meta */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Hash className="w-4 h-4 text-primary" /> System Metadata
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-500 flex items-center gap-1">
                  <User className="w-3 h-3 text-gray-400" /> Customer Account ID
                </p>
                <p className="font-mono text-gray-800 break-all mt-0.5">{payment.customerId}</p>
              </div>

              <div>
                <p className="text-gray-500">Payment Completed At</p>
                <p className="font-medium text-gray-800 mt-0.5">
                  {new Date(payment.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Payment Audit Updated</p>
                <p className="font-medium text-gray-800 mt-0.5">
                  {new Date(payment.updatedAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                  })}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2 mt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>Verified payment record stored directly in PostgreSQL cluster.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;