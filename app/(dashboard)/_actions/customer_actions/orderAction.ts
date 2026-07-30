"use server"
import { isAccessTokenExits } from "@/services/getAccessToken";


export const getCustomerOrders = async () => {

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("You must be logged in to view your orders.")
  }


  try {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method : "GET",
       headers:{
        "Content-Type" : "application/json",
         Cookie : `accessToken=${accessToken}`
       },
       cache : "no-cache",
       
    })

   const result = await res.json();
    if(!res.ok  || !result.success){
      throw new Error(result.message || "Failed to fetch customer orders!");
    }

   

    return result;

    
  } catch (error) {
    console.error("Dashbaord Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
};
