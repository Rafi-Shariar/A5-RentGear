import { GearItem } from "@/lib/types";
import { boolean } from "zod";

export const getUniqueBrandCategory = (gearItems : GearItem[]) =>{

    const categories = [ ... new Set( gearItems.map((gear) => gear.category))].filter(Boolean)
    const brands = [ ... new Set( gearItems.map((gear) => gear.brand))].filter(Boolean)


    return { categories, brands}

    

}