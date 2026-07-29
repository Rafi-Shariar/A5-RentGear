'use server'

import { IRegisterUser, LoginState } from "@/lib/types";
import { loginSchema } from "@/lib/validations/auth";
import { error } from "console";
import { cookies } from "next/headers";
import { emit } from "process";
import { success } from "zod";


export const LoginAction = async(prevState:LoginState | null, formData : FormData) =>{

    const email = formData.get("email");
    const password = formData.get("password");

    //Zod validation
    const validatedFields = loginSchema.safeParse({email, password});
    if(!validatedFields.success){
        return {
            success : false,
            message : "Invalid form data",
            error : validatedFields.error.flatten().fieldErrors
        }
    }


    try {

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(validatedFields.data)
    })


    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly : true,
            sameSite : "lax",
            maxAge : 60*60*24
        })

         cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly : true,
            sameSite : "lax",
            maxAge : 60*60*24*7
        })
    }

      return result
    
        
    } catch (error) {
        console.error("Login Error:", error)

        return {
            success : false,
            message : "Server Connection Error. Please try agin later"
        }
    }

  
    
    

}


export const RegisterAction = async(payload : IRegisterUser) =>{

}