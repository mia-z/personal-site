import prisma from "$lib/prisma";
import { z } from "zod";

export const newTagSchema = z.object({
    text: z.string().refine(async (val) => {
        const res = await prisma.tag.count({
            where: {
                text: {
                    mode: "insensitive",
                    contains: val
                }
            }
        });

        return res === 0;
    }, "Duplicate tag")
});