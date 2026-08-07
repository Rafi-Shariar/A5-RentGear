/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IAddNewGear, IAddNewGearFromProp } from '@/lib/types';
import { uploadImageToCloudinary } from '@/services/uploadImageToCloundinary';
import { ImagePlus, Loader2, Package, Tag, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { addNewGearAction } from '../../_actions/provider_actions/gearActions';

const initialFormData = {
  brand: '',
  title: '',
  price: '',
  stock: '',
  categoryId: '',
  description: '',
};

const AddNewGearForm =  ( {categories} : IAddNewGearFromProp) => {


  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Selection Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Image Removal
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };



  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validations
    if (!formData.brand.trim()) return toast.error('Brand name is required');
    if (!formData.title.trim()) return toast.error('Gear title is required');
    if (!formData.categoryId) return toast.error('Please select a category');
    if (!formData.description.trim()) return toast.error('Description is required');
    if (Number(formData.price) <= 0) return toast.error('Price must be greater than 0');
    if (Number(formData.stock) < 1) return toast.error('Stock must be at least 1');
    if (!imageFile) return toast.error('Gear photo is required');

    setIsSubmitting(true);

    try {
     
      const imageURL = await uploadImageToCloudinary(imageFile);

      if(!imageURL){
        toast.error("Failed to upload photo. Please Try Again.")
        return;
      }

      const payload = {
        brand: formData.brand.trim(),
        title: formData.title.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: formData.categoryId,
        description: formData.description.trim(),
        imageURL,
      };

    //   console.log( payload);

      const res = await addNewGearAction(payload)

      if(res.success){
        
        toast.success("Gear added successfully!")
        setFormData(initialFormData)
        setImageFile(null)
        setImagePreview(null)
      }

    } catch (err: any) {
      console.error('Add Gear Error:', err);
      toast.error(err?.message || 'Failed to publish gear item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4 dark:bg-zinc-900 dark:border-gray-500">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2 dark:text-gray-300">
              <Package className="w-4 h-4 text-primary " /> Basic Gear Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs dark:text-gray-300 font-semibold text-gray-700 mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Osprey, Sony, Trek"
                  required
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs dark:text-gray-300 font-semibold text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-zinc-900"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat : IAddNewGear) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs dark:text-gray-300 font-semibold text-gray-700 mb-1">
                Gear Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Atmos AG 65 Backcountry Trekking Backpack"
                required
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs dark:text-gray-300 font-semibold text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about specifications, condition, and usage..."
                required
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4 dark:bg-zinc-900 dark:border-gray-600">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2 dark:text-gray-300 ">
              <Tag className="w-4 h-4 text-primary" /> Rental Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs dark:text-gray-300 font-semibold text-gray-700 mb-1">
                  Daily Rental Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Available Quantity (Stock) *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="1"
                  required
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image & Submit */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4 dark:bg-zinc-900">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2 dark:text-gray-300">
              <ImagePlus className="w-4 h-4 text-primary" /> Gear Photo
            </h2>

            <div>
              {imagePreview ? (
                <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 group">
                  <Image
                    src={imagePreview}
                    alt="Gear preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 hover:border-primary/50 transition-all dark:bg-zinc-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Click to upload gear photo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Adding Gear...
              </>
            ) : (
              'Publish Gear Item'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNewGearForm;