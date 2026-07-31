'use server'

import { isAccessTokenExits } from "@/services/getAccessToken";

export const getOrderList = async () => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "You must be logged in.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return result;
    }

    return {
      success: false,
      message: result?.message || "Failed to retrieved gear list.",
    };
  } catch (error) {
    console.error("Get Gear list Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};