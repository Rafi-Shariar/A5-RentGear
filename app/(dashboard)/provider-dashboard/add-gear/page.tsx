
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import AddNewGearForm from '../../_components/provider/AddNewGearForm';

const AddNewGearPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/provider/my-gears"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Inventory
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Add New Gear</h1>
        <p className="text-sm text-gray-500">
          List a new equipment item for customers to rent.
        </p>
      </div>

      {/* Form Client Component */}
      <AddNewGearForm />
    </div>
  );
};

export default AddNewGearPage;