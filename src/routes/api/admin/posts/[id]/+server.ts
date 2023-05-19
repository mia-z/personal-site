import prisma from "$lib/prisma";
import { error, json, text, type RequestHandler } from "@sveltejs/kit";

export const GET = (async ({ params }) => {
    if (!params.id) {
        throw error(400);
    }
    const res = await prisma.post
        .findFirst({ 
            where: {
                id: parseInt(params?.id)
            },
            select: {
                category: {
                    select: {
                        categoryName: true,
                        id: true
                    }
                },
                createdAt: true,
                id: true,
                published: true,
                tagsOnPost: true,
                title: true,
                updatedAt: true
            }
         });
    if (!res) {
        throw error(404);
    } else {
        return json(res);
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    if (!params.id) {
        throw error(400);
    }
    const res = await prisma.post
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

    const postToUpdate = await prisma.post
        .findFirst({ 
            where: {
                id: parseInt(params?.id)
            },
            select: {
                category: {
                    select: {
                        categoryName: true,
                        id: true
                    }
                },
                createdAt: true,
                updatedAt: true,
                id: true,
                published: true,
                tagsOnPost: true,
                title: true,
                content: true
            }
        });

    if (!postToUpdate) {
        throw error(404, "Couldnt find existing post with id: " + params.id);
    }

    const updatedData = await request.json();

    

    const res = await prisma.post
        .update({
            where: {
                id: postToUpdate.id
            },
            data: {
                
            }
        })
    if (!res) {
        throw error(404);
    } else {
        return new Response(null, { status: 200 });
    }
}) satisfies RequestHandler;