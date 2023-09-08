import prisma from "$lib/server/Prisma";
import type { Category, Tag } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const initialData = await Promise.all([
        prisma.post.count({
            where: {
                published: true
            }
        }),
        prisma.post.count({
            where: {
                published: false
            }
        }),
        prisma.category.findMany(),
        prisma.tag.findMany()
    ]);

    return {
        publishedCount: initialData[0],
        unpublishedCount: initialData[1],
        categories: initialData[2] as Category[],
        tags: initialData[3] as Tag[]
    }
};