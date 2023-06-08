import prisma from '$lib/prisma';
import type { Post } from '@prisma/client';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load = (async ({ url }) => {
    const postId = url.searchParams.get("postId");

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

    const response = await prisma.category.findMany({
        select: {
            categoryName: true,
            id: true
        },
    });
    return { categories: response, postToEdit };
}) satisfies PageServerLoad;

export const actions = {
    create: async (event) => {
        return { success: true, data: "Create" }
    },
    update: async (event) => {
        return { success: true, data: "Update" }
    }
} satisfies Actions;