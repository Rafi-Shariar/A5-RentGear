"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderPlus, Loader2 } from "lucide-react";
import { addNewCategoryAction } from "../../_actions/admin_actions/addNewCategory";
import { toast } from "sonner";

const AddNewCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
        console.log(categoryName);
        
      const res = await addNewCategoryAction(categoryName);

      if (res?.success) {
        setCategoryName("");
        toast.success(res?.message || "Category added successfully!");
      } else {
        toast.error(res?.message || "Failed to add category.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Add Category Error:", err);
      toast(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-primary" /> Create New Category
        </h2>
        <p className="text-xs text-gray-500">
          Enter a unique category name for grouping gear items.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Category Name *
          </label>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. Backpacks & Bags, Tents, Cameras"
            className="w-full text-sm"
          />
          {error && (
            <p className="text-xs text-red-500 mt-1.5">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-medium flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Adding...
            </>
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddNewCategory;