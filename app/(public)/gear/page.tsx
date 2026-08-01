import React, { Suspense } from "react";
import GearList from "../_components/gear/GearList";
import GearGridSkeleton from "../_components/gear/GearGridSkeleton";
import { GearFilters } from "../_components/gear/GearFilters";
import { getGear } from "../_actions/getGear";
import { getCategoryBrand } from "../_actions/getCategoryBrand";
import { GearPagination } from "../_components/gear/GearPagination";
import { Sparkles, SlidersHorizontal } from "lucide-react";

const GearPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // 1. Next.js 15 searchParams await
  const query = await searchParams;

  // 2. Fetch category & brand data for filters
  const categoryBrandRes = await getCategoryBrand();
  const gearItemsForFilters = categoryBrandRes?.data?.gearItems || [];

  // 3. Fetch active query gear items for pagination meta
  const currentGearData = await getGear({ query });
  const meta = currentGearData?.meta;

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/50  px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 🌟 Header Section */}
        <section className="text-center  max-w-3xl mx-auto">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Explore <span className="text-primary">What You Need</span>
          </h1>

        </section>

        {/* 📐 Main Content Grid (Left Sidebar + Right Items) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* 👈 LEFT SIDEBAR: Gear Filters */}
          <aside className="md:mt-6 lg:col-span-1 bg-white dark:bg-zinc-900/80 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-xl lg:sticky lg:top-6 transition-all">
           

            {/* Filters Component */}
            <GearFilters gearItems={gearItemsForFilters} />
          </aside>

          {/* 👉 RIGHT CONTENT: Gear Items & Pagination */}
          <section className="lg:col-span-3 space-y-8">
            {/* Gear Items Grid */}
            <Suspense fallback={<GearGridSkeleton />}>
              <GearList searchParams={searchParams} />
            </Suspense>

            {/* Pagination at the bottom of Right Column */}
            {meta && (
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
                <GearPagination meta={meta} />
              </div>
            )}
          </section>

        </div>

      </div>
    </main>
  );
};

export default GearPage;