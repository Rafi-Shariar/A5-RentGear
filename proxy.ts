import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./services/getAccessToken";
import { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ['/login', '/register'];

const PUBLIC_ROUTES = ['/', '/gear', '/about', '/contact', '/how-it-works']

export async function proxy(request : NextRequest) {

    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();


    //get Tokens
    const refreshToken = request.cookies.get("refreshToken")?.value;
    let accessToken = request.cookies.get("accessToken")?.value;

    //decode Token
    const decodedRefreshToken = await ( refreshToken ? jwtUtils.varifyToken(refreshToken, process.env.JWT_REFRESH_SECRETE as string) : null)
    let decodedAccessToken = await ( accessToken ? jwtUtils.varifyToken(accessToken, process.env.JWT_ACCESS_SECRETE as string) : null)


    //Access Token Expired but refresh token exitst
    if(!decodedAccessToken?.success && decodedRefreshToken?.success){
        const result = await getNewAccessToken();

        if(result.success){
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                sameSite : "lax"
            })

            //reset values
            request.cookies.set("accessToken", newAccessToken)
            accessToken = newAccessToken
            decodedAccessToken = await jwtUtils.varifyToken(accessToken!, process.env.JWT_ACCESS_SECRETE as string)
        }
    }

    let userRole = null;

    //access Token Expired
    if(!decodedAccessToken?.success){
        const cookieStore = await cookies();
        cookieStore.delete("accessToken")
    }

    //assing role
    if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    //user loggedin but accessing Auth routes
    if(accessToken && AUTH_ROUTES.includes(pathname)) {
        
        if(userRole === "CUSTOMER"){
            return NextResponse.redirect( new URL('/dashboard', request.url));
        }
        else if( userRole === "PROVIDER"){
            return NextResponse.redirect( new URL('/provider-dashboard', request.url));
        }
        else if( userRole === "ADMIN"){
            return NextResponse.redirect( new URL('/admin-dashboard', request.url));
        }
        else{
            return NextResponse.redirect( new URL('/', request.url));
        }
    }



    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))

    if(!accessToken && !isPublicRoute && !isAuthRoute){
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(loginUrl)

    }


    //Authorization
    if(pathname.startsWith('/dashboard') && userRole !== "CUSTOMER"){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if(pathname.startsWith('/provider-dashboard') && userRole !== "PROVIDER"){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if(pathname.startsWith('/admin-dashboard') && userRole !== "ADMIN"){
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
   


    return NextResponse.next()

}


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};