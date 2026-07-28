import React, { Suspense } from "react";
import GearList from "../_components/gear/GearList";
import GearGridSkeleton from "../_components/gear/GearGridSkeleton";
import { SearchBar } from "../_components/gear/SearchBar";


const GearPage = async () => {


  return (
    <div>
      <div className="text-center space-y-2">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Explore <span className="text-primary">What You Need</span>
        </h1>

        {/* Subtitle */}
        <p className=" mx-auto text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal">
          Skip buying expensive equipment. Get high-quality gear delivered right
          when you need it.
        </p>
      </div>

      <div>
        {/* <SearchBar/> */}
      </div>
      <div>
        <Suspense fallback={<GearGridSkeleton/>}>
            <GearList/>
        </Suspense>
      </div>
    </div>
  );
};

export default GearPage;
