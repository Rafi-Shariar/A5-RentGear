import React from "react";
import { getGear } from "../_actions/getGear";
import GearCard from "./GearCard";

const GearContainer = async () => {

    const gears = await getGear();

    
  return (
    <div className="mt-16">
      <div className="text-center space-y-2">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Rent <span className="text-primary">What You Need</span>
        </h1>

        {/* Subtitle */}
        <p className=" mx-auto text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal">
          Skip buying expensive equipment. Get high-quality gear delivered right when you need it.
        </p>
      </div>

      <div className="mt-6">
        <GearCard/>
      </div>
    </div>
  );
};

export default GearContainer;
