import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroCard from "./_components/HeroCard";
import GearContainer from "./_components/GearContainer";

export default function Home() {
  return (
    <div className="">
       <HeroCard/>
       {/* TODO: Add coursale of categories with images */}
       <GearContainer/>
       
    </div>
  );
}
