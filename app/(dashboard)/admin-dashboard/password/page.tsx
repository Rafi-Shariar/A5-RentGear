"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";
import { UpatePasswordAction } from "@/app/(public)/_actions/profileUpdateActions";

export const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset error message on typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Client-side Validations
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.newPassword.length < 5) {
      setErrorMessage("New password must be at least 5 characters long.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    const payload = {
        currentPassword : formData.oldPassword,
        newPassword : formData.newPassword
    }

    setIsSubmitting(true);

    try {

      const res = await UpatePasswordAction(payload)

      if(res.success){
        toast.success("Password Updated Successfully.")
      }

      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Failed to change password", error);
      setErrorMessage("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      {/* Header Section */}
      <div className="flex items-center gap-3 pb-5 border-b border-zinc-100 dark:border-zinc-800">
        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Change Password
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Ensure your account is using a strong and secure password.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pt-5">
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 text-xs font-medium bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {successMessage}
          </div>
        )}

        {/* 1. Current / Old Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary" /> Current Password
          </label>
          <div className="relative">
            <Input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="h-10 pr-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> New Password
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="At least 5 characters"
              className="h-10 pr-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3. Confirm New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Confirm New Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className="h-10 pr-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-6 rounded-xl gap-2 font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;