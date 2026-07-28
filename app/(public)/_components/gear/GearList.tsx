import React from "react";
import { getGear } from "../../_actions/getGear";
import GearCard from "./GearCard";
import { IGear } from "@/lib/types";

const GearList = async () => {
  const gears = await getGear();

  if (!gears.success || !gears.data?.gearItems?.length) {
    return <p>No Gear found</p>;
  }
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center bg-primary/10 p-4 md:px-6 md:py-8 rounded-2xl">
      {gears.data.gearItems.map((gear: IGear) => (
        <GearCard key={gear.gearId} gear={gear} />
      ))}
    </div>
  );
};

export default GearList;
