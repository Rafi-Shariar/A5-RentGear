"use server";
import { INewGearPayload } from "@/lib/types";
import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";
/* eslint-disable @typescript-eslint/no-explicit-any */


export const addNewGearAction = async (payload : INewGearPayload) => {

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "Authentication Failed. Please login.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath('/provider-dashaboard/my-gears')
      return result;
    }

    return {
      success: false,
      message: result?.message || "Failed to add gear.",
    };
  } catch (error: any) {
    console.error("Add new gear Error:", error);
    return {
      success: false,
      message: "Server Connection Error. Please try again later",
    };
  }
};


export const getMyGearListAction = async () => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "Authentication Failed.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      }
    });

    const result = await res.json();

    if (res.ok && result.success) {
       return result;
    }

    return {
      success: false,
      message: "Failed to retrieved gear list.",
    };
  } catch (error) {
    console.error("Get Provider Gear list Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};


export const deleteMyGearAction = async ( gearId : string) =>{

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("Not Logged in.")
  }


  try {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear/${gearId}`, {
        method : "DELETE",
       headers:{
        "Content-Type" : "application/json",
         Cookie : `accessToken=${accessToken}`
       },
       
    })

   const result = await res.json();
    if(!res.ok  || !result.success){
      throw new Error(result.message || "Failed to delete order.");
    }

    revalidateTag("provider-gears",{ expire: 0 });



    return result;

    
  } catch (error) {
    console.error("Delete Gear Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
}


export const updateGearDataAction = async ( gearId : string, payload: INewGearPayload) =>{

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("Not Logged in.")
  }


  try {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear/${gearId}`, {
        method : "PUT",
       headers:{
        "Content-Type" : "application/json",
         Cookie : `accessToken=${accessToken}`
       },
       body : JSON.stringify(payload)
       
    })

   const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath('/provider-dashaboard/my-gears')
      revalidatePath('/gears')
      return result;
    }

    return {
      success: false,
      message: result?.message || "Failed to update gear.",
    };

    
  } catch (error) {
    console.error("Update Gear Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
}
