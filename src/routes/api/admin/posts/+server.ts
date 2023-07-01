import prisma from "$lib/prisma";
import { json, text, type RequestHandler, fail } from "@sveltejs/kit";

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
                slug: true,
                slugIdentifier: true,
                description: true,
                id: true,
                published: true,
                tags: true,
                title: true,
                updatedAt: true
            }
        });
    return json(res);
}) satisfies RequestHandler;