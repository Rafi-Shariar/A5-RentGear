"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAddNewGear, IAddNewGearFromProp, IGearDetailItem } from "@/lib/types";
import { uploadImageToCloudinary } from "@/services/uploadImageToCloundinary";
import { updateGearDataAction } from "../../_actions/provider_actions/gearActions";


interface IEditGearFormProps {
  gear: IGearDetailItem;
  categories: IAddNewGear[];
}

export const EditGearForm = ({ gear, categories }: IEditGearFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial state prefills with existing gear data
  const [formData, setFormData] = useState({
    brand: gear.brand || "",
    title: gear.title || "",
    price: gear.price ? String(gear.price) : "",
    stock: gear.stock ? String(gear.stock) : "",
    categoryId: gear.categoryId || "",
    description: gear.description || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(gear.imageURL || "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageURL = gear.imageURL;

      if (imageFile) {
        const newImageURL = await uploadImageToCloudinary(imageFile);
        if (!newImageURL) {
          toast.error("Failed to upload new image");
          setIsSubmitting(false);
          return;
        }
        imageURL = newImageURL;
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


      const res = await updateGearDataAction(gear.gearId, payload)

      if(res.success){
         toast.success("Gear updated successfully!");
         router.push("/provider-dashboard/my-gears");
      }
      else{
        toast.error("Gear updated Failed!");
      }

     
      // router.refresh();
    } catch (error) {
      toast.error("Something went wrong while updating gear.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border shadow-sm">
      {/* Title & Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Waterproof Tent"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Brand</label>
          <Input
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            placeholder="e.g. ApexGear"
            required
          />
        </div>
      </div>

      {/* Price, Stock, Category */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price ($)</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Quantity</label>
          <Input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={formData.categoryId}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, categoryId: val }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your gear..."
          required
        />
      </div>

      {/* Image Preview & Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Gear Photo</label>
        <div className="flex items-center gap-4">
          {imagePreview && (
            <div className="relative h-20 w-20 rounded-md overflow-hidden border bg-muted">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <label className="flex items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-muted/50 transition">
            <UploadCloud className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {imageFile ? imageFile.name : "Change photo"}
            </span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Gear
        </Button>
      </div>
    </form>
  );
};