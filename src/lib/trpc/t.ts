import type { Context } from "$lib/trpc/context";
import { initTRPC } from "@trpc/server";
import { logger } from "./middleware";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

export const publicProcedure = procedure.use(logger);

export type Procedure = typeof t.procedure;