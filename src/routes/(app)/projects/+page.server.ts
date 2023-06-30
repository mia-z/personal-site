import prisma from '$lib/prisma';
import { fail, text } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from "zod";

export const load = (async () => {
    const postsResponse = await prisma.post.findMany({
        include: {
            category: true
        },
        orderBy: {
            id: "asc",
        },
        where: {
            published: true,
            category: {
                categoryName: {
                    mode: 'insensitive',
                    contains: "projects"
                }
            }
        }
    });

    return { posts: postsResponse };
}) satisfies PageServerLoad;