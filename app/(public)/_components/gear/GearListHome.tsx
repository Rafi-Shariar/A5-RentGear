import React from "react";
import { getGear } from "../../_actions/getGear";
import GearCard from "./GearCard";
import { IGear } from "@/lib/types";
import { EmptyGearState } from "./EmptyGearState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GearListHome = async () => {
  const gears = await getGear();

  if (!gears.success || !gears.data?.gearItems?.length) {
    return <EmptyGearState />;
  }
  return (
    <div className="bg-primary/10 pb-8 rounded-xl">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center  md:px-6 md:py-6 rounded-2xl">
        {gears.data.gearItems.slice(0, 6).map((gear: IGear) => (
          <GearCard key={gear.gearId} gear={gear} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
       <Link href={'/gear'}>
        <Button className="p-5 rounded-lg hover:bg-primary/30 hover:text-primary cursor-pointer hover:border">Explore More </Button>
       </Link>
      </div>
    </div>
  );
};

export default GearListHome;
