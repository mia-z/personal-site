import type { Context } from "$lib/trpc/context";
import { initTRPC } from "@trpc/server";
import l from "$lib/server/Logger";
import { v4 as uuid } from "uuid"
import prisma from "$lib/server/Prisma";
import { SECRET_JWT } from "$env/static/private";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

export const logger = t.middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const id = uuid();
    l.info({ source: "tRPC", text: `Received tRPC call to [${path}] [${id}]` });
    const res = await next();
    const ms = Date.now() - start;
    if (res.ok) {
        l.info({ source: "tRPC", text: `Finished tRPC call to [${path}] [${id}] after ${ms}ms` });
    } else {
        l.error({ source: "tRPC", text: `Error with tRPC call [${id}] - ${type} ${path}` });
    }
    return res;
}); 

export const authorize = t.middleware(async ({ ctx, next }) => {
    if (!ctx.token) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: `NO TOKEN`,
            cause: "tRPC/Server/middleware/authorize"
        });
    }

    const verifiedToken = await jwt.verify(ctx.token, SECRET_JWT) as string;
    
    const validId = await prisma.activeTokens.findFirst({
        where: {
            token: verifiedToken
        }
    });

    if (validId) {
        return await next();
    } else {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: `INVALID TOKEN`,
            cause: "tRPC/Server/middleware/authorize"
        });
    }
});

export const publicProcedure = procedure.use(logger);
export const secureProcedure = procedure.use(logger).use(authorize);

export type Procedure = typeof t.procedure;