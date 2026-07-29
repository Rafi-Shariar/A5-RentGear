"use server";
import { INewOrder } from "@/lib/types";
import { isAccessTokenExits } from "@/services/getAccessToken";
import { revalidateTag } from "next/cache";

export const PlaceOrderAction = async (payload: INewOrder) => {
  const accessToken = await isAccessTokenExits();

  if (!accessToken) {
    return {
      success: false,
      message: "Authentication token missing. Please log in again.",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("my-orders", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.error("Place Order Error: ", error);
    return {
      success: false,
      message: "Internal Server Error. Try again later.",
    };
  }
};
