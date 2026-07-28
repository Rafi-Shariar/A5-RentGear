import { Suspense } from "react";
import HeroCard from "./_components/HeroCard";
import GearContainer from "./_components/gear/GearContainer";
import GearGridSkeleton from "./_components/gear/GearGridSkeleton";

export default function Home() {
  return (
    <div >
       <HeroCard/>
       {/* TODO: Add coursale of categories with images */}
      
         <GearContainer/>

      
        {/* TODO: Add Steps Section */}
        {/* TODO: Add Reviews Section*/}
       
    </div>
  );
}
