'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IReviewPayload } from "@/lib/types";
import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidatePath } from "next/cache";

export const addReviewAction = async(payload : IReviewPayload) =>{

    const accessToken = await isAccessTokenExits();

    const {orderId} = payload
    
      if (!accessToken || accessToken === "undefined" || accessToken === "null") {
        throw new Error("Not Logged in.")
      }
    
    
      try {
    
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
            method : "POST",
           headers:{
            "Content-Type" : "application/json",
             Cookie : `accessToken=${accessToken}`
           },
           body : JSON.stringify(payload)
           
        })
    
       const result = await res.json();
        if (res.ok && result.success) {
              revalidatePath(`/dashboard/my-orders/${orderId}`)
              return result;
            }
        
            return {
              success: false,
              message: result?.message || "Failed to add review.",
            };
    
        
      } catch (error : any) {
        console.error("Add Review Error: ", error);
        throw new Error(error.message || "Internal Server Error. Try again later.");
      }

}