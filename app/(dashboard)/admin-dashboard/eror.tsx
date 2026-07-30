'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center px-4 py-12 bg-gradient-to-b from-zinc-50 to-zinc-100/50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Animated Visual / Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-red-500/10 dark:bg-red-500/20 animate-ping opacity-75" />
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 shadow-xl shadow-red-500/10">
            <AlertTriangle className="w-10 h-10" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            We ran into an unexpected issue while loading this gear segment. Do not worry, your data is safe.
          </p>
        </div>

        {/* Error Digest Badge (Useful for debugging in Dev/Prod) */}
        {/* {error.digest && (
          <div className="inline-block px-3 py-1 text-xs font-mono rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300/50 dark:border-zinc-700/50">
            Error ID: {error.digest}
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Try Again Button */}
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto gap-2 rounded-xl bg-primary text-white hover:bg-primary/90 font-medium px-5 shadow-lg shadow-primary/20"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>

          {/* Go Home Button */}
          <Link href="/admin-dashbaord" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-5"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Extra Support Link */}
        <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Persistent issue?{' '}
            <Link
              href="/faq"
              className="text-zinc-600 dark:text-zinc-300 font-medium underline underline-offset-4 hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <LifeBuoy className="w-3.5 h-3.5" /> Visit Support
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}