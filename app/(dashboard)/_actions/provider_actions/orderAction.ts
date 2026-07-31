'use server';

import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidatePath } from "next/cache";

export const getMyOrdersAction = async () => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "Authentication Failed.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/orders`, {
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
      message: "Failed to retrieved order list.",
    };
  } catch (error) {
    console.error("Get Provider Gear list Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};


export const updateOrderStatusAction = async (orderId : string, status : string) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "Authentication Failed.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body : JSON.stringify({status})
    });

    const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath('/provider-dashboard/my-orders')
      revalidatePath('/provider-dashboard')
      revalidatePath('/dashboard/my-orders')

       return result;
    }

    return {
      success: false,
      message: "Failed to update order status",
    };
  } catch (error) {
    console.error("Update Status Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};
