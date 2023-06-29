import prisma from "$lib/prisma";
import { CategorySchema } from "$lib/server/schemas/CategorySchema";
import type { Category } from "@prisma/client";
import { json, text, type RequestHandler, fail, error } from "@sveltejs/kit";

export const GET = (async ({ params }) => {
    if (!params.id) {
        throw error(400);
    }
    const res = await prisma.category
        .findFirst({ 
            where: {
                id: parseInt(params?.id)
            },
            select: {
                categoryName: true,
                id: true,
                posts: true,
            }
        });
    return json(res);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    if (!params.id) {
        throw error(400);
    }
    const res = await prisma.category
        .delete({ 
            where: {
                id: parseInt(params?.id)
            }
        });
    if (!res) {
        throw error(404);
    } else {
        return new Response(null, { status: 200 });
    }
}) satisfies RequestHandler;

export const PUT = (async ({ params, request }) => {
    if (!params.id) {
        throw error(400);
    }

    const categoryToUpdate = await prisma.category
        .findFirst({ 
            where: {
                id: parseInt(params?.id)
            },
            select: {
                id: true,
                categoryName: true
            }
        });

    if (!categoryToUpdate) {
        throw error(404, "Couldnt find existing category with id: " + params.id);
    }

    const updatedData = await request.json() as Category;

    const validatedBody = CategorySchema.safeParse(updatedData);

    if (validatedBody.success) {
        const res = await prisma.category
            .update({
                where: {
                    id: categoryToUpdate.id
                },
                data: {
                    categoryName: updatedData.categoryName
                }
            })
        return json(res);
    } else {
        throw fail(400, {
            error: "Validation Error",
            errors: validatedBody.error.format()
        });
    }
}) satisfies RequestHandler;