import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";
import { compile } from "mdsvex";

export const config = {
    runtime: "nodejs18.x",
}

export const load = (async ({ params }) => {
    const postsResponse = await prisma.post.findFirst({
        include: {
            category: true
        },
        where: {
            id: parseInt(params.postId),
        }
    });
    
    return { post: {
        ...postsResponse,
        content: await compile(postsResponse?.content ?? "")
    } };
}) satisfies PageServerLoad;