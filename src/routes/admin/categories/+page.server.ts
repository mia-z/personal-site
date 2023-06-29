import prisma from '$lib/prisma';
import { fail, text, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { CategorySchema } from "$lib/server/schemas/CategorySchema";

export const load = (async () => {
    const categoriesResponse = await prisma.category.findMany({
        include: {
            posts: true
        },
    });

    return { categories: categoriesResponse };
}) satisfies PageServerLoad;

export const actions = {
    createCategory: async ({ request }) => {
        const body = await request.formData();
        const validatedBody = await CategorySchema.safeParseAsync({
            categoryName: body.get("categoryName")
        });

        if (validatedBody.success) {
            console.log("creating Category");
            const createCategoryRes = await prisma.category.create({
                data: {
                    categoryName: validatedBody.data.categoryName,
                },
                select: {
                    id: true,
                    categoryName: true
                }
            })
            return {
                newCategoryId: createCategoryRes.id
            };
        } else {
            return fail(400, {
                error: "Validation error",
                errors: validatedBody.error.format()
            });
        }
    }
} satisfies Actions;