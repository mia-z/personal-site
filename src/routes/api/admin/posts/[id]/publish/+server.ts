import { error, json, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import prisma from "$lib/prisma";

export const config = {
    runtime: "edge",
    platform: "node"
}

const publishSchema = z.object({
    publish: z.boolean()
});

export const PUT = (async ({ params, request }) => {
    if (!params.id) {
        throw error(400, "Must provide an id paramter");
    }

    const body = await request.json();

    const validated = await publishSchema.safeParse(body);

    if (!validated.success) {
        throw error(400, "Couldnt validate body, error: " + validated.error.errors.join(", "));
    }

    const updateRes = await prisma.post
        .update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                published: validated.data.publish
            }
        });

    return json(updateRes);
}) satisfies RequestHandler;