import { error, json, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/prisma";
import { z } from "zod";

export const config = {
    runtime: "nodejs18.x",
}

const tagSchema = z.object({
    text: z.string().nonempty()
})

export const POST = (async ({ params, request }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    const body = await request.json();

    const validated = await tagSchema.safeParseAsync(body);

    if (!validated.success) {
        const errors = validated.error.format();
        throw error(400, "Couldnt validate body, error: " + errors._errors.join(", "));
    }

    const tagExists = await prisma.tag
        .findFirst({
            where: {
                text: {
                    mode: "insensitive",
                    contains: validated.data.text
                }
            },
            select: {
                id: true
            }
        });

    if (tagExists) {
        const updateRes = await prisma.post
            .update({
                where: {
                    id: parseInt(params.id)
                },
                data: {
                    tags: {
                        connect: {
                            id: tagExists.id
                        }
                    } 
                },
                include: {
                    tags: true
                }
            });

        return json(updateRes);
    } else {
        const createRes = await prisma.tag
            .create({
                data: {
                    text: validated.data.text
                },
                select: {
                    id: true
                }
            })
        .catch((e) => {
            throw error(400, "Couldnt create new tag!\n" + e.toString())
        });
        
        await prisma.post
            .update({
                where: {
                    id: parseInt(params.id)
                },
                data: {
                    tags: {
                        connect: {
                            id: createRes.id
                        }
                    } 
                },
                include: {
                    tags: true
                }
            })
        .catch((e) => {
            throw error(400, "Couldnt update post with created tag!\n" + e.toString())
        })
        
        return new Response("created", { status: 201 });
    }
}) satisfies RequestHandler;