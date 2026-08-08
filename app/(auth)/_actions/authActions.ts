"use server";

import { IRegisterUser, LoginState } from "@/lib/types";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";




export const RegisterAction = async (payload: IRegisterUser) => {
  const validatedFields = registerSchema.safeParse(payload);
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      },
    );

    const result = await res.json();

    if (result.success) {
      return result;
    }

    return {
      success: false,
      message: result?.message,
    };
  } catch (error) {
    console.error("Register Error:", error);
    return {
      success: false,
      message: "Server Connection Error. Please try agin later",
    };
  }
};

export const LoginAction = async (
  prevState: LoginState | null,
  formData: FormData,
  redirectTo: string,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  //Zod validation
  const validatedFields = loginSchema.safeParse({ email, password });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    let targetPath = '';

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      //  redirect(redirectTo)
      targetPath=redirectTo
      
    } else if (decodedToken.role === "CUSTOMER" ) {
      //  redirect('/dashboard')
      targetPath='/dashboard'
      
    } else if (decodedToken.role === "ADMIN" ) {
      //  redirect('/admin-dashboard')
      targetPath='/admin-dashboard'
      
    } else if (decodedToken.role === "PROVIDER") {
      //  redirect('/provider-dashboard')
      targetPath='/provider-dashboard'
      
    }
    else{
      targetPath = '/'
    }

    return {
    ...result,
    redirectTo : targetPath
  };

  }

  return result

  
};


export interface IGoogleAuthPayload {
  email: string;
  name: string;
  photoURL?: string;
  googleId: string;
}

export const GoogleLoginAction = async (
  googlePayload: IGoogleAuthPayload,
  redirectTo?: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googlePayload),
    });

    const result = await res.json();

    if (result.success) {
      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

      // Security Check: Google login is strictly restricted to CUSTOMER role
      if (decodedToken?.role !== "CUSTOMER") {
        return {
          success: false,
          message: "Google login is only allowed for Customers.",
        };
      }

      const cookieStore = await cookies();

      // Set Access Token & Refresh Token in HTTP-only cookies
      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      if (result.data.refreshToken) {
        cookieStore.set("refreshToken", result.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      let targetPath = "/dashboard";

      if (
        redirectTo &&
        typeof redirectTo === "string" &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//")
      ) {
        targetPath = redirectTo;
      }

      return {
        ...result,
        redirectTo: targetPath,
      };
    }

    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong during Google Login",
    };
  }
};