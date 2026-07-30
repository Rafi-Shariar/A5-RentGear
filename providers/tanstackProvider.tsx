"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

export default function TanstackProvider({ children }: { children: ReactNode }) {
  // 🟢 useState ব্যবহার করার ফলে রিরেন্ডারে নতুন QueryClient ইন্সট্যান্স তৈরি হওয়া আটকাবে
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes cache
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}