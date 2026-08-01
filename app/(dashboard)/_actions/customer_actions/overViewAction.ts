'use server'
import { isAccessTokenExits } from "@/services/getAccessToken";
import { success } from "zod";

export const overviewAction = async () => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      message: "You must be Logged In.",
    };
  }


  try {

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method : "GET",
       headers:{
        "Content-Type" : "application/json",
         Cookie : `accessToken=${accessToken}`
       },
       
    })


    if(!res.ok){
      return {
        success : false,
        message : 'Failed to fetch dashaboard overview!'
      }
    }

    const result = await res.json();

    return result.data;

    
  } catch (error) {
    console.error("dashboard Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
};
