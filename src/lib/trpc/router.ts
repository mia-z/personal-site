import { t } from "./t";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { admin } from "./routes/admin";
import { posts } from "./routes/posts";
import { categories } from "./routes/categories";

export const router = t.router({
    admin,
    posts,
    categories
});

export type Router = typeof router;

export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;