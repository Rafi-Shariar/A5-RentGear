import { Clock, ShoppingBag, Star, TrendingUp, Wallet } from 'lucide-react';
import React from 'react';

const MatricContainer = () => {
    return (
        <div>
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
        </div>
    );
};

export default MatricContainer;