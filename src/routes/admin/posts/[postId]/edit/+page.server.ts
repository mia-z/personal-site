import prisma from '$lib/prisma';
import type { Post } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from "zod";

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

    const response = await prisma.category.findMany({
        select: {
            categoryName: true,
            id: true
        },
    });
    return { categories: response, postToEdit };
}) satisfies PageServerLoad;
