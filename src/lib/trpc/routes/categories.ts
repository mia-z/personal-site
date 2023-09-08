import { router, secureProcedure, publicProcedure } from "../t";
import { z } from "zod";
import prisma from "$lib/server/Prisma";

export const categories = router({
    getAll: secureProcedure
        .query(async () => {
            return await prisma.category
                .findMany();
        }),
    getById: secureProcedure
        .input(z.number())
        .query(async ({ input }) => {
            return await prisma.category
                .findFirst({
                    where: {
                        id: input
                    }
                });
        }),
    create: secureProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            return await prisma.category
                .create({
                    data: {
                        name: input.trim()
                    }
                })
        }),
    update: secureProcedure
        .input(z.object({
            categoryId: z.number(),
            categoryName: z.string().nonempty()
        }))
        .mutation(async ({ input }) => {
            return await prisma.category
                .update({
                    where: {
                        id: input.categoryId
                    },
                    data: {
                        name: input.categoryName.trim()
                    }
                })
        }),
    delete: secureProcedure
        .input(z.number())
        .mutation(async ({ input }) => {
            return await prisma.category
                .delete({
                    where: {
                        id: input
                    }
                })
        })
});