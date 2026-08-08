/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { GoogleLoginAction } from "../_actions/authActions";
import { useUserStore } from "@/lib/store/useUserStore";
import { getMe } from "@/services/getMe";


export default function GoogleLoginButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "";
  const {setUser} = useUserStore()
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);

        // Fetch User Info from Google
        const userInfoRes = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const decoded = await userInfoRes.json();

        const payload = {
          email: decoded.email,
          name: decoded.name,
          photoURL: decoded.picture,
          googleId: decoded.sub,
        };

        // Call the Next.js Server Action
        const result = await GoogleLoginAction(payload, redirectTo);

        if (!result.success) {
          throw new Error(result.message || "Failed to log in with Google");
        }

        toast.success("Logged in successfully with Google!");
        const user = await getMe()
        setUser(user)
        router.refresh();

        setTimeout(() => [router.push(result.redirectTo || "/")], 100);
        

      } catch (error: any) {
        toast.error(error.message || "Google Login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Authentication Failed");
    },
  });

  return (
    <button
      type="button"
      onClick={() => loginWithGoogle()}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-sm font-medium text-gray-700 dark:text-zinc-200 transition-colors shadow-sm cursor-pointer"
    >
      <FcGoogle className="w-5 h-5" />
      <span>{loading ? "Signing in..." : "Continue with Google"}</span>
    </button>
  );
}