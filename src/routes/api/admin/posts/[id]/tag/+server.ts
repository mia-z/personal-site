import { error, json, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/prisma";
import { newTagSchema } from "$lib/server/schemas/NewTagSchema";

export const POST = (async ({ params, request }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    const body = await request.json();

    const validated = await newTagSchema.safeParse(body);

    if (!validated.success) {
        throw error(400, "Couldnt validate body, error: " + validated.error.errors.join(", "));
    }

    const updateRes = await prisma.post
        .create({
            where: {
                id: parseInt(params.id)
            },
            data: {
                tags: {
                    connectOrCreate: {
                        where: {
                            
                        }
                    }
                } 
            },
            include: {
                tags: true
            }
        });

    return json(updateRes);
}) satisfies RequestHandler;

export const DELETE = (async ({ params, request }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    const body = await request.json() as { idToDelete: number };

    const updateRes = await prisma.post
        .update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                tags: {
                    disconnect: [{ id: body.idToDelete }]
                } 
            },
            include: {
                tags: true
            }
        });

    return json(updateRes);
}) satisfies RequestHandler;