import { isAccessTokenExits } from "@/services/getAccessToken";

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


export const updateUserStatus = async () => {
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
