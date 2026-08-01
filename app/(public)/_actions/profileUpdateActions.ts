'use server'
import { IUpdatePasswordPayload, IUpdateUserPayload } from "@/lib/types";
import { isAccessTokenExits } from "@/services/getAccessToken";
import { success } from "zod";

export const UpateProfileDataAction = async (payload: IUpdateUserPayload) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      message: "Authentication Failed!",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      return result;
    }
    else{
        return {
            success : false,
            message : "Failed to update data. Try again."
        }
    }

  } catch (error) {
    console.error("Upate User Data Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
};


export const UpatePasswordAction = async (payload: IUpdatePasswordPayload) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return {
      success: false,
      message: "Authentication Failed!",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      return result;
    }
    else{
        return {
            success : false,
            message : "Failed to update password. Try again."
        }
    }

  } catch (error) {
    console.error("Update Password Order Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
};