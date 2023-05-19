import prisma from "$lib/prisma";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET = (async ({ }) => {
    const res = await prisma.post
        .findMany({ 
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
    return json(res);
}) satisfies RequestHandler;