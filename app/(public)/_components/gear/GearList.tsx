import React from "react";
import { getGear } from "../../_actions/getGear";
import GearCard from "./GearCard";
import { IGear } from "@/lib/types";
import { EmptyGearState } from "./EmptyGearState";
import { GearPagination } from "./GearPagination";

const GearList = async ({searchParams}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const query = await searchParams;
  const gears = await getGear({query});

  if (!gears.success || !gears.data?.gearItems?.length) {
    return <EmptyGearState/>;
  }
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center bg-primary/10 p-4 md:px-6 md:py-8 rounded-2xl">
      {gears.data.gearItems.map((gear: IGear) => (
        <GearCard key={gear.gearId} gear={gear} />
      ))}

    </div>
  );
};

export default GearList;
