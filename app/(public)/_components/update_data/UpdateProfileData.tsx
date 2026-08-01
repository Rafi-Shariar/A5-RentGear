"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  Camera,
  Upload,
} from "lucide-react";
import { useUserStore } from "@/lib/store/useUserStore";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/services/uploadImageToCloundinary";
import { IUpdateUserPayload } from "@/lib/types";
import { UpateProfileDataAction } from "../../_actions/profileUpdateActions";
import { toast } from "sonner";
// import { uploadToCloudinary } from "@/utils/uploadToCloudinary"; // 👈 আপনার Cloudinary আপলোড ফাংশনটি ইম্পোর্ট করুন

export const UpdateProfileForm = () => {
  const { user, updateUser } = useUserStore();

  const [formData, setFormData] = useState<IUpdateUserPayload>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const values = {
    name: formData.name ?? user?.data?.name ?? "",
    email: formData.email ?? user?.data?.email ?? "",
    phoneNumber: formData.phoneNumber ?? user?.data?.phoneNumber ?? "",
    address: formData.address ?? user?.data?.address ?? "",
    photoURL: formData.photoURL ?? user?.data?.photoURL ?? "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      const uploadedUrl = await uploadImageToCloudinary(file);

      setFormData((prev) => ({ ...prev, photoURL: uploadedUrl }));
    } catch (error) {
      console.error("Failed to upload image to Cloudinary", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await UpateProfileDataAction(values);

      if (res.success) {
        toast.success("Profile Update Successfully.");
        updateUser(values);
        // setFormData({
        //   name: "",
        //   email: "",
        //   phoneNumber: "",
        //   address: "",
        //   photoURL: "",
        // });
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 🖼️ Profile Avatar Upload & Preview */}
      <div className="flex flex-col items-center justify-center space-y-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative group">
          {/* Circular Image Container */}
          <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-primary/20 flex items-center justify-center text-zinc-400 relative shadow-inner">
            {values.photoURL ? (
              <Image
                src={values.photoURL}
                alt="Profile Preview"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <User className="w-12 h-12" />
            )}

            {/* Loading Spinner during Cloudinary upload */}
            {isUploadingImage && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </div>

          {/* Camera Button Badge (Click to select image) */}
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <Camera className="w-4 h-4" />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploadingImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center">
          <label
            htmlFor="photo-upload"
            className="text-xs font-medium text-primary hover:underline cursor-pointer inline-flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            {isUploadingImage ? "Uploading..." : "Upload new photo"}
          </label>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            JPG, PNG or WEBP (Max 5MB)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" /> Full Name
          </label>
          <Input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
          />
        </div>

        {/* 2. Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
          </label>
          <Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
          />
        </div>

        {/* 3. Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
          </label>
          <Input
            type="tel"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            placeholder="+880 1700 000000"
            className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
          />
        </div>

        {/* 4. Address */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Address
          </label>
          <Input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder="Mirpur-1, Dhaka, Bangladesh"
            className="h-10 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <Button
          type="submit"
          disabled={isSubmitting || isUploadingImage}
          className="h-10 px-6 rounded-xl gap-2 font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
