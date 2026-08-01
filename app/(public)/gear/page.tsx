import React, { Suspense } from "react";
import GearList from "../_components/gear/GearList";
import GearGridSkeleton from "../_components/gear/GearGridSkeleton";
import { GearFilters } from "../_components/gear/GearFilters";
import { getGear } from "../_actions/getGear";
import { getCategoryBrand } from "../_actions/getCategoryBrand";
import { GearPagination } from "../_components/gear/GearPagination";

const GearPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const query = await searchParams;

  const categoryBrandRes = await getCategoryBrand();
  const gearItemsForFilters = categoryBrandRes?.data?.gearItems || [];

  const currentGearData = await getGear({ query });
  const meta = currentGearData?.meta;

  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Explore <span className="text-primary">What You Need</span>
        </h1>
        <p className="mx-auto text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal">
          Skip buying expensive equipment. Get high-quality gear delivered right when you need it.
        </p>
      </div>

      <div>
        <GearFilters gearItems={gearItemsForFilters} />
      </div>

      <div>
        <Suspense fallback={<GearGridSkeleton />}>
          <GearList searchParams={searchParams} />
        </Suspense>
      </div>

      <GearPagination meta={meta} />
    </div>
  );
};

export default GearPage;