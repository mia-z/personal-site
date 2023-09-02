import { createContext } from "$lib/trpc/context";
import { router } from "$lib/trpc/router";
import { redirect, type Handle, error } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { createTRPCHandle } from "trpc-sveltekit";
import jwt from "jsonwebtoken";
import { SECRET_JWT } from "$env/static/private";

export const trpcHandle: Handle = createTRPCHandle({ router, createContext });

export const adminRoutesHandle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith("/admin/")) {
        const tokenCookie = event.cookies.get("_t");
        if (!tokenCookie) {
            throw redirect(302, "/admin");
        }
        try {
            const verifiedToken = jwt.verify(tokenCookie, SECRET_JWT);
            return await resolve(event);
        } catch (e) {
            event.cookies.set("_t", "", { path: "/", maxAge: 0}) 
            throw redirect(302, "/admin");
        }
    }
    return await resolve(event);
}

export const handle = sequence(adminRoutesHandle, trpcHandle);