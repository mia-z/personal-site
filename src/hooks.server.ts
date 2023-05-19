import { redirect, error, type Handle, type RequestEvent, type HandleServerError } from "@sveltejs/kit";
import { SECRET_JWT_CODE } from "$env/static/private";
import jwt from "jsonwebtoken";

export const handle: Handle = (async ({ event, resolve }) => {
    if (isProtectedRoute(event)) { 
        const token = event.cookies.get("token");

        if (!token) {
            if (isApiRoute(event)) throw error(401);
            throw redirect(302, "/loginadmin");
        }

        const user = await jwt.verify(token, SECRET_JWT_CODE);
        
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

export const handleError = (async ({ error, event }) => {
    if (error instanceof jwt.JsonWebTokenError) {
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