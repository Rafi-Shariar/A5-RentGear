'use server'

export const getGearCategories = async () => {
  

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "GET",
      headers : {
         "Content-Type": "application/json",
      }
    });

    const result = await res.json();

    if (res.ok && result.success) {
       return result;
    }

    return {
      success: false,
      message: result?.message || "Failed to retrieved category list.",
    };
  } catch (error) {
    console.error("Get Category list Error : ", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};