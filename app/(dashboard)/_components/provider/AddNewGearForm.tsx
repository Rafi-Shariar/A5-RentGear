// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { ImagePlus, Loader2, Package, Tag, UploadCloud, X } from 'lucide-react';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// // Demo Category Data (পরবর্তীতে API থেকে ডাইনামিকালি নিয়ে আসতে পারবেন)
// const CATEGORIES = [
//   { id: '71416b52-480c-4aa8-9cea-05f437a3d2b1', name: 'Backpacks & Bags' },
//   { id: 'a2139b52-480c-4aa8-9cea-05f437a3d2b2', name: 'Camping & Tents' },
//   { id: 'b3140b52-480c-4aa8-9cea-05f437a3d2b3', name: 'Cycling Gear' },
//   { id: 'c4151b52-480c-4aa8-9cea-05f437a3d2b4', name: 'Cameras & Drones' },
// ];

// // Zod Schema
// const gearSchema = z.object({
//   brand: z.string().min(2, 'Brand name must be at least 2 characters'),
//   title: z.string().min(5, 'Title must be at least 5 characters'),
//   price: z.coerce.number().positive('Price must be greater than 0'),
//   stock: z.coerce.number().int().min(1, 'Stock must be at least 1'),
//   categoryId: z.string().min(1, 'Please select a category'),
//   description: z.string().min(20, 'Description must be at least 20 characters'),
//   imageFile: z.instanceof(File, { message: 'Gear image is required' }),
// });

// type GearFormValues = z.infer<typeof gearSchema>;

// const AddNewGearForm = () => {
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm<GearFormValues>({
//     resolver: zodResolver(gearSchema),
//     defaultValues: {
//       brand: 'Osprey',
//       title: 'Atmos AG 65 Backcountry Trekking Backpack',
//       price: 340.0,
//       stock: 4,
//       categoryId: '71416b52-480c-4aa8-9cea-05f437a3d2b1',
//       description:
//         'The Osprey Atmos AG 65 features the award-winning Anti-Gravity suspension system, offering unmatched ventilation and load-carrying comfort for multi-day backcountry trekking.',
//     },
//   });

//   // Handle Image Selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         setError('imageFile', { message: 'Please upload a valid image file' });
//         return;
//       }
//       clearErrors('imageFile');
//       setValue('imageFile', file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImagePreview(null);
//     setValue('imageFile', undefined as unknown as File);
//   };

//   // Dummy Image Upload Helper (Replace with your actual upload helper)
//   const uploadImageToHost = async (file: File): Promise<string> => {
//     // Simulats image host function delay
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62';
//   };

//   const onSubmit = async (data: GearFormValues) => {
//     setIsSubmitting(true);
//     try {
//       // 1. Upload image using your helper function
//       const imageURL = await uploadImageToHost(data.imageFile);

//       // 2. Prepare payload for Backend
//       const payload = {
//         brand: data.brand,
//         title: data.title,
//         price: data.price,
//         description: data.description,
//         stock: data.stock,
//         imageURL: imageURL,
//         categoryId: data.categoryId,
//       };

//       console.log('Final Add Gear Payload:', payload);
//       alert('Gear added successfully! Check console for payload.');

//       // TODO: Call your Server Action / API here
//       // await createGearAction(payload);
//     } catch (err) {
//       console.error('Failed to add gear:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column: Form Inputs */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Basic Information Card */}
//           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
//             <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
//               <Package className="w-4 h-4 text-primary" /> Basic Gear Details
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Brand */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Brand Name *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('brand')}
//                   placeholder="e.g. Osprey, Sony, Trek"
//                   className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                 />
//                 {errors.brand && (
//                   <p className="text-xs text-red-500 mt-1">{errors.brand.message}</p>
//                 )}
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Category *
//                 </label>
//                 <select
//                   {...register('categoryId')}
//                   className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
//                 >
//                   <option value="">Select Category</option>
//                   {CATEGORIES.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.categoryId && (
//                   <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Title */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">
//                 Gear Title *
//               </label>
//               <input
//                 type="text"
//                 {...register('title')}
//                 placeholder="e.g. Atmos AG 65 Backcountry Trekking Backpack"
//                 className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
//               />
//               {errors.title && (
//                 <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 rows={5}
//                 {...register('description')}
//                 placeholder="Provide comprehensive details about gear specifications, condition, and usage guidelines..."
//                 className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
//               />
//               {errors.description && (
//                 <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Pricing & Inventory Card */}
//           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
//             <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
//               <Tag className="w-4 h-4 text-primary" /> Rental Pricing & Inventory
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Daily Price */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Daily Rental Price ($) *
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   {...register('price')}
//                   placeholder="0.00"
//                   className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                 />
//                 {errors.price && (
//                   <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
//                 )}
//               </div>

//               {/* Stock */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Available Quantity (Stock) *
//                 </label>
//                 <input
//                   type="number"
//                   {...register('stock')}
//                   placeholder="1"
//                   className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                 />
//                 {errors.stock && (
//                   <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Image Upload & Actions */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
//             <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
//               <ImagePlus className="w-4 h-4 text-primary" /> Gear Photo
//             </h2>

//             {/* Drag & Drop Upload Container */}
//             <div>
//               {imagePreview ? (
//                 <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 group">
//                   <Image
//                     src={imagePreview}
//                     alt="Gear preview"
//                     fill
//                     className="object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleRemoveImage}
//                     className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 hover:border-primary/50 transition-all">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
//                     <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
//                     <p className="text-sm font-medium text-gray-700">
//                       Click to upload gear photo
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       PNG, JPG or WEBP (Max 5MB)
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//               {errors.imageFile && (
//                 <p className="text-xs text-red-500 mt-2">{errors.imageFile.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" /> Adding Gear...
//               </>
//             ) : (
//               'Publish Gear Item'
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddNewGearForm;