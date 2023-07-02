import { error, json, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/prisma";

export const DELETE = (async ({ params, request }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    if (!params.tagId) {
        throw error(400, "Must provide an id paramter");
    }

    const updateRes = await prisma.post
        .update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                tags: {
                    disconnect: [{ id: parseInt(params.tagId) }]
                } 
            },
            include: {
                tags: true
            }
        })
    .catch((e) => {
        throw error(400, `Couldnt delete tag with id: ${params.tagId}\n${e.toString()}`);
    });

    return json(updateRes);
}) satisfies RequestHandler;