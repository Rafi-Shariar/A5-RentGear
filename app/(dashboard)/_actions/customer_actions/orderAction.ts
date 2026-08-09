"use server"
import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidateTag } from "next/cache";


export const getCustomerOrders = async (status : string) => {

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("You must be logged in to view your orders.")
  }

  const queryParam = status && status !== "ALL" ? `?status=${status}` : "";


  try {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals${queryParam}`, {
        method : "GET",
       headers:{
        "Content-Type" : "application/json",
         Cookie : `accessToken=${accessToken}`
       },
       cache : "no-store"
       
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

    revalidateTag("dashboard-overview",{ expire: 0 });

   

    return result;

    
  } catch (error) {
    console.error("Delete Order Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
}


export const getOrderDetails = async(id : string) => {

    const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
   return {
      success: false,
      data: null,
      error: "You must be logged in to view order details.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache : "force-cache"
    });

    if (!res.ok) {
     return {
        success: false,
        data: null,
        error: `Failed to fetch order details (Status: ${res.status})`,
      };
    }

    const result = await res.json();

    if (!result.success || !result.data) {
      return {
      success: false,
      data: null,
      error: "Order Details Not Found",
    };
    }

    return result.data;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Order Details Action Error:", error?.message || error);
    return {
      success: false,
      data: null,
      error: error?.message || "Internal Server Error. Try again later.",
    };
  }
}