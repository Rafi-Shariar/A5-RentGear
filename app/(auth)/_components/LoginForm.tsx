"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { LoginAction } from "../_actions/authActions";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { useUserStore } from "@/lib/store/useUserStore";
import { getMe } from "@/services/getMe";
import GoogleLoginButton from "./GoogleLoginButon";

const LoginForm = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await LoginAction(null, formData, redirectTo);

      if (result?.success) {
        toast.success(result.message || "Login successful!");
        const user = await getMe();
        setUser(user);

        router.refresh();
        setTimeout(() => [router.push(result.redirectTo || "/")], 100);
      } else {
        toast.error(result?.message || "Invalid credentials!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {/* Email Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.email && (
          <p className="text-xs text-red-500 font-medium pl-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <Input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.password && (
          <p className="text-xs text-red-500 font-medium pl-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-lg shadow-emerald-700/20 transition-all cursor-pointer mt-2"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500 dark:text-zinc-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Login Component */}
      <GoogleLoginButton />
    </form>
  );
};

export default LoginForm;
