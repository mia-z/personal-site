import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
    const postsResponse = await prisma.post.findFirst({
        include: {
            category: true
        },
        where: {
            id: parseInt(params.postId),
        }
    });
    
    return { post: postsResponse };
}) satisfies PageServerLoad;