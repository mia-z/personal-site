import type { RequestEvent } from "@sveltejs/kit";
import type { inferAsyncReturnType } from "@trpc/server";

export const createContext = async (event: RequestEvent) => {
    const authCookie = event.cookies.get("_t");
    return {
        token: authCookie
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;