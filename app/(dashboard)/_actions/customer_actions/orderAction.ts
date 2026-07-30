"use server"
import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidateTag } from "next/cache";


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
    console.error("My Orders Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
};


export const deleteOrderAction = async ( orderId : string) =>{

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("Not Logged in.")
  }


  try {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${orderId}`, {
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

    revalidateTag("dashbaord-overview",{ expire: 0 });

   

    return result;

    
  } catch (error) {
    console.error("Delete Order Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
}