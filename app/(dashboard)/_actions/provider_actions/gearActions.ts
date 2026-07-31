"use server";
import { INewGearPayload } from "@/lib/types";
import { isAccessTokenExits } from "@/services/getAccessToken";
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
