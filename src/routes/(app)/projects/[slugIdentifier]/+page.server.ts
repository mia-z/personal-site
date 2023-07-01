import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const postResponse = await prisma.post.findFirst({
        include: {
            category: true
        },
        where: {
            slugIdentifier: params.slugIdentifier
        }
    });

    return { post: postResponse };
}) satisfies PageServerLoad;