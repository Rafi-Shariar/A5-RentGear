'use server'
import { isAccessTokenExits } from "@/services/getAccessToken";

export const getOrderList = async (query?: {
  page?: string;
  limit?: string;
  status?: string;
}) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "You must be logged in.",
    };
  }

  // Build query parameters
  const params = new URLSearchParams();
  if (query?.page) params.append("page", query.page);
  params.append("limit", query?.limit || "20"); // Default 20
  if (query?.status && query.status !== "ALL") params.append("status", query.status);

  const queryString = params.toString() ? `?${params.toString()}` : "";

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals${queryString}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store", // Filter/Page পরিবর্তনের সাথে সাথেই নতুন ডেটা নিশ্চিত করার জন্য
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return result;
    }

    return {
      success: false,
      message: result?.message || "Failed to retrieve order list.",
    };
  } catch (error) {
    console.error("Get Order list Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};