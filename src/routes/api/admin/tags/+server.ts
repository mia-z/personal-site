import prisma from "$lib/prisma";
import { newTagSchema } from "$lib/server/schemas/NewTagSchema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { error } from "console";

export const GET = (async ({ }) => {
    const res = await prisma.tag
        .findMany({ 
            select: {
                id: true,
                text: true,
            }
        });
    return json(res);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    const body = await request.json();

    const validatedBody = await newTagSchema.safeParse(body);

    if (!validatedBody.success) {
        throw error(400, "Couldnt validate request body with error: " + validatedBody.error.errors);
    }

    const addRes = await prisma.tag.create({
        data: {
            ...validatedBody.data
        }
    });

    return json(addRes);
}) satisfies RequestHandler;