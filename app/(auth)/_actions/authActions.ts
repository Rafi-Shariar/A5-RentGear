'use server'

import { cookies } from "next/headers";

export const LoginAction = async(formData : FormData) =>{

    const email = formData.get("email");
    const password = formData.get("password");
    const payload = {email,password}


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
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
    
    

}