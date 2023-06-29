import prisma from "$lib/prisma";
import { z } from "zod";

export const CategorySchema = z.object({
    categoryName: z.string().refine(async (val) => {
        const res = await prisma.category.count({
            where: {
                categoryName: {
                    mode: "insensitive",
                    contains: val
                }
            }
        });

        return res === 0;
    }, "Category with that name already exists")
});