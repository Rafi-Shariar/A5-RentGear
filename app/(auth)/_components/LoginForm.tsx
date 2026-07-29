
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { LoginAction } from "../_actions/authActions";
import { loginSchema, LoginInput } from "@/lib/validations/auth"; // আপনার স্কিমা পাথ

const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm<LoginInput>({
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

      const result = await LoginAction(null, formData);

      if (result?.success) {
        toast.success(result.message || "Login successful!");
        router.push("/");
        router.refresh();
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
    <div className="flex justify-center items-center py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        <Card className="p-6 space-y-4 shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* Email Input */}
          <div className="space-y-1">
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              disabled={isSubmitting}
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
            className="w-full bg-green-700 hover:bg-green-800 text-white transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;