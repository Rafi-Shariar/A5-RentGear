'use server'

import { isAccessTokenExits } from "@/services/getAccessToken";

export const getAdminOverview = async () => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "You must be logged in.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/overview`, {
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
      message: result?.message || "Failed to load overview",
    };
  } catch (error) {
    console.error("Admin Overview Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};