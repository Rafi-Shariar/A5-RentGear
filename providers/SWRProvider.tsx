"use client";

import { SWRConfig } from "swr";

const globalFetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch data");
  }

  const result = await res.json();
  return result.data; 
};
export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: globalFetcher,
        revalidateOnFocus: false, 
      }}
    >
      {children}
    </SWRConfig>
  );
}