import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const response = await prisma.post.findMany({
        include: {
            category: true
        },
    });
    return { posts: response };
}) satisfies PageServerLoad;