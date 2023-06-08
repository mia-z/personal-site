import prisma from "$lib/prisma";
import { json, type RequestHandler } from "@sveltejs/kit";
import { error } from "console";
import { z } from "zod";

const newTagSchema = z.object({
    text: z.string().nonempty("Cannot give an empty string")
});

export const GET = (async ({ params }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    const res = await prisma.tag
        .findFirst({ 
            where: {
                id: parseInt(params.id)
            },
            select: {
                id: true,
                text: true,
                TagsOnPost: {
                    select: {
                        post: {
                            select: {
                                category: {
                                    select: {
                                        categoryName: true,
                                        id: true
                                    }
                                },
                                id: true,
                                content: true,
                                createdAt: true,
                                published: true,
                                title: true,
                                updatedAt: true
                            }
                        }
                    }
                }
            }
        });
    return json(res);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    if (!params.id) {
        throw error(400);
    }
    const res = await prisma.tag
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

export const PUT = (async ({ request, params }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    const body = await request.json();

    const validatedBody = await newTagSchema.safeParse(body);

    if (!validatedBody.success) {
        throw error(400, "Couldnt validate request body with error: " + validatedBody.error.errors);
    }

    const addRes = await prisma.tag.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            ...validatedBody.data
        }
    });

    return json(addRes);
}) satisfies RequestHandler;