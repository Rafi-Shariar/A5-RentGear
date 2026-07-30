'use server'
import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidatePath } from "next/cache";

export const getUserList = async () => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "You must be logged in get user list.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return {
        success: true,
        message: result.message || "User List Retrieved Successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result?.message || "Failed to retrieved user list.",
    };
  } catch (error) {
    console.error("Get User list Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};


export const updateUserStatus = async (userId : string, status : string) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      data: null,
      error: "Authentication Failed!",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({status})
    });

    const result = await res.json();

    if (res.ok && result.success) {

        revalidatePath('/admin-dashboard/users')
      return {
        success: true,
        message: result.message || "User Status Updated Successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result?.message || "Failed to update status",
    };
  } catch (error) {
    console.error("Update Status Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};
