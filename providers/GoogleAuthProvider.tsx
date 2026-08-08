"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local");
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      {children}
    </GoogleOAuthProvider>
  );
}