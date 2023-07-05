import prisma from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const config = {
    runtime: "edge"
}

export const load = (async ({ params: { postId } }) => {
    let postToEdit = null;

    if (postId) {
        postToEdit = await prisma.post.findFirst({
            include: {
                category: true,
                tags: true
            },
            where: {
                id: parseInt(postId)
            }
        });
    }

    if (!postToEdit) {
        throw error(404, `Post with id ${postId} not found`);
    }
    const response = await prisma.category.findMany({
        select: {
            categoryName: true,
            id: true,
        },
    });
    return { categories: response, postToEdit };
}) satisfies PageServerLoad;
