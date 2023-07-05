import prisma from "$lib/prisma";
import { unsplashServer } from "$lib/server/unsplash.server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { compile } from "mdsvex";

export const config = {
    runtime: "nodejs18.x",
}

export const load = (async ({ params }) => {
    const postResponse = await prisma.post.findFirst({
        include: {
            category: true
        },
        where: {
            slugIdentifier: params.slugIdentifier
        }
    });

    if (!postResponse) {
        throw error(404, "Couldnt find that project");
    }

    let unsplashHeaderPic = await unsplashServer.search.getPhotos({ 
        query: postResponse.title
    });

    if (unsplashHeaderPic.response && unsplashHeaderPic.response?.total < 1) {
        unsplashHeaderPic = await unsplashServer.search.getPhotos({
            query: postResponse.unsplashFallback ?? "Programming"
        });
    }

    return { post: {
        ...postResponse,
        content: await compile(postResponse.content ?? "")
    }, headerPic: unsplashHeaderPic.response?.results[0] };
}) satisfies PageServerLoad;