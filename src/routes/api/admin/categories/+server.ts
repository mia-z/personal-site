import prisma from "$lib/prisma";
import { CategorySchema } from "$lib/server/schemas/CategorySchema";
import type { Category } from "@prisma/client";
import { fail, json, type RequestHandler } from "@sveltejs/kit";

export const GET = (async ({ }) => {
    const res = await prisma.category
        .findMany({ });
    return json(res);
}) satisfies RequestHandler;

export const POST = (async ({ params, request }) => {
    const parsedBody = await request.json() as Category;

    const validatedBody = CategorySchema.safeParse(parsedBody);

    if (validatedBody.success) {
        const res = await prisma.category
            .create({ 
                data: {
                    categoryName: validatedBody.data.categoryName
                },
                select: {
                    categoryName: true,
                    id: true
                }
            });
        return json(res);
    } else {
        throw fail(400, {
            error: "Validation Error",
            errors: validatedBody.error.format()
        });
    }
    
}) satisfies RequestHandler;