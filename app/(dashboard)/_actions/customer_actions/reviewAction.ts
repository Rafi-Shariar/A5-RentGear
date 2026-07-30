/* eslint-disable @typescript-eslint/no-explicit-any */
import { IReviewPayload } from "@/lib/types";
import { isAccessTokenExits } from "@/services/getAccessToken";

export const addReviewAction = async(payload : IReviewPayload) =>{

    const accessToken = await isAccessTokenExits();
    
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
        if(!res.ok  || !result.success){
          throw new Error(result.message || "Failed to add review.");
        }
    
        return result;
    
        
      } catch (error : any) {
        console.error("Add Review Error: ", error);
        throw new Error(error.message || "Internal Server Error. Try again later.");
      }

}