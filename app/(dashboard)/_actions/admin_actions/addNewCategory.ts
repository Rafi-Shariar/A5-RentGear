"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAccessTokenExits } from "@/services/getAccessToken";

export const addNewCategoryAction = async (categoryName: string) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "You must be logged in add new category.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ categoryName }),
      },
    );

    const result = await res.json();

    if (res.ok && result.success) {
      return {
        success: true,
        message: result.message || "Category added successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result?.message || "Failed to add category",
    };
  } catch (error: any) {
    console.error("Add new category Error:", error);
    return {
      success: false,
      message: "Server Connection Error. Please try again later",
    };
  }
};
