import { redirect, error, type Handle, type RequestEvent, type HandleServerError } from "@sveltejs/kit";
import { SECRET_JWT_CODE } from "$env/static/private";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { sequence } from "@sveltejs/kit/hooks";

const protectedRoutes: Handle = (async ({ event, resolve }) => {
    if (isProtectedRoute(event)) { 
        const token = event.cookies.get("token");

        if (!token) {
            if (isApiRoute(event)) throw error(401);
            throw redirect(302, "/loginadmin");
        }

        const user = await verify(token, SECRET_JWT_CODE);
        
        if (!user) {
            if (isApiRoute(event)) throw error(401);
            throw redirect(302, "/loginadmin");
        }

        event.locals.username = user as string;

        return resolve(event);
     } else {
        return resolve(event);
     }
}) satisfies Handle;

const injectUserInfo: Handle = (async ({ event, resolve }) => {
    const token = event.cookies.get("token");

    if (!token) {
        return resolve(event);
    }

    const user = await verify(token, SECRET_JWT_CODE);
        
    if (!user) {
        event.cookies.delete("token");
        return resolve(event);
    } else {
        event.locals.username  = user as string;
        return resolve(event);
    }
}) satisfies Handle;

export const handle = sequence(protectedRoutes, injectUserInfo);

export const handleError = (async ({ error, event }) => {
    if (error instanceof JsonWebTokenError) {
        return { 
            message: error.message
        };
    } else if (error instanceof Error) {
        return { 
            message: error.message 
        };
    }

    return {
        message: "Unknown error :("
    };
}) satisfies HandleServerError;

const isProtectedRoute = (event: RequestEvent) => 
    (event.url.pathname.startsWith("/admin") || 
    event.url.pathname.startsWith("/api/admin")) ;

const isApiRoute = (event: RequestEvent) => event.url.pathname.startsWith("/api")