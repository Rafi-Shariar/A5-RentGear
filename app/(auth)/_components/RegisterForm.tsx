"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import { uploadImageToCloudinary } from "@/services/uploadImageToCloundinary";
import { RegisterAction } from "../_actions/authActions";

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }} = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "CUSTOMER",
      address: "",
    },
  });

  // Handle Image Selection and Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);

    try {
      let hostedPhotoURL = "";

      // 1. If user selected a photo, upload it to Cloudinary first
      if (selectedImage) {
        const uploadedUrl = await uploadImageToCloudinary(selectedImage);
        if (uploadedUrl) {
          hostedPhotoURL = uploadedUrl;
        } else {
          toast.error("Failed to upload profile picture!");
          setIsSubmitting(false);
          return;
        }
      } else {
        // Fallback default avatar if user doesn't upload a picture
        hostedPhotoURL = `https://api.dicebear.com/7.x/lorelei/svg`;
      }

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: data.role,
        address: data.address,
        photoURL: hostedPhotoURL,
      };

      // 3. Call server action or backend API
      const result = await RegisterAction(payload);

    //   if (result?.success) {
    //     toast.success(result.message || "Registration successful!");
    //     router.push("/login");
    //   } else {
    //     toast.error(result?.message || "Registration failed!");
    //   }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 w-full">
      {/* Profile Photo Upload Field */}
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden group">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile Preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-zinc-400">
              <Camera className="w-6 h-6" />
              <span className="text-[10px] mt-0.5">Upload</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            disabled={isSubmitting}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-[11px] text-zinc-500 mt-1">
          Profile Picture (Optional)
        </span>
      </div>

      {/* Name Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Full Name
        </label>
        <Input
          {...register("name")}
          type="text"
          disabled={isSubmitting}
          className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.name && (
          <p className="text-xs text-red-500 font-medium pl-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <Input
          {...register("email")}
          type="email"
          disabled={isSubmitting}
          className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.email && (
          <p className="text-xs text-red-500 font-medium pl-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password & Phone Number Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Password Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <Input
            {...register("password")}
            type="password"
            disabled={isSubmitting}
            className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
          />
          {errors.password && (
            <p className="text-xs text-red-500 font-medium pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Phone Number
          </label>
          <Input
            {...register("phoneNumber")}
            type="text"
            placeholder=""
            disabled={isSubmitting}
            className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500 font-medium pl-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
      </div>

      {/* Address Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Address
        </label>
        <Input
          {...register("address")}
          type="text"
          disabled={isSubmitting}
          className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.address && (
          <p className="text-xs text-red-500 font-medium pl-1">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Account Type
        </label>
        <select
          {...register("role")}
          disabled={isSubmitting}
          className="w-full h-10 px-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-200"
        >
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="PROVIDER">PROVIDER</option>
          <option value="ADMIN">ADMIN</option>

         
        </select>
        {errors.role && (
          <p className="text-xs text-red-500 font-medium pl-1">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-lg shadow-emerald-700/20 transition-all cursor-pointer !mt-4"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Creating account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
