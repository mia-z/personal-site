import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const config = {
    runtime: "edge"
}

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
                    mode: "insensitive",
                    contains: "projects"
                }
            }
        }
    });

    return { posts: postsResponse };
}) satisfies PageServerLoad;