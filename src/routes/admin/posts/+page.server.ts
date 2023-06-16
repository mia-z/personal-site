import prisma from '$lib/prisma';
import { fail, text } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from "zod";

const createPostBody = z.object({
    postTitle: z.string().nonempty("Title cannot be empty"),
    postCategory: z.string().nonempty("Must give valid ID")
})
.required({
    postTitle: true,
    postCategory: true
});

export const load = (async () => {
    const postsResponse = await prisma.post.findMany({
        include: {
            category: true
        },
        orderBy: {
            id: "asc",
        }
    });

    const categoriesResponse = await prisma.category.findMany();
    
    return { posts: postsResponse, categories: categoriesResponse };
}) satisfies PageServerLoad;

export const actions = {
    createPost: async ({ cookies, request, locals }) => {
        const body = Object.fromEntries(await request.formData());
        const validatedBody = createPostBody.safeParse(body);

        if (validatedBody.success) {
            console.log("creating")
            const createPostRes = await prisma.post.create({
                data: {
                    title: validatedBody.data.postTitle,
                    categoryId: parseInt(validatedBody.data.postCategory)
                },
                select: {
                    id: true
                }
            })
            return {
                newPostId: createPostRes.id
            };
        } else {
            return fail(400, {
                error: "Validation error",
                errors: validatedBody.error.formErrors
            });
        }
    }
} satisfies Actions;