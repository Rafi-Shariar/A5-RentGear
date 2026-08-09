"use server";

import { isAccessTokenExits } from "@/services/getAccessToken";

export const createCheckoutSessionAction = async (orderId: string) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("You must be logged in.");
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ orderId }),
    });

    if (!res.ok) {
     throw new Error("Failed to create payment session.") 
    }

    const result = await res.json();

    if (!result.success || !result.data?.paymentURL) {
      throw new Error(result.message || "Payment URL not found.");
    }

    return result.data.paymentURL as string;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Create Checkout Session Error:", error.message);
    throw new Error(error.message || "Internal Server Error. Try again later.");
  }
};


export const getPaymentDetails = async( id : string) =>{

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("You must be logged in.");
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
    });

    if (!res.ok) {
     throw new Error("Failed to fetch payment details.") 
    }

    const result = await res.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || "Payment details not found.");
    }

    return result.data;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Create Checkout Session Error:", error.message);
    throw new Error(error.message || "Internal Server Error. Try again later.");
  }
}


export const getMyPayments = async( searchTerm ?: string ) =>{

  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    throw new Error("You must be logged in.");
  }

  const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : "";

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments${queryParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache : "no-cache"
    });

    if (!res.ok) {
     throw new Error("Failed to fetch payment history.") 
    }

    const result = await res.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || "Payment details not found.");
    }

    return result.data;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("My Payments Error:", error.message);
    throw new Error(error.message || "Internal Server Error. Try again later.");
  }
}