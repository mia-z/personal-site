import { router, secureProcedure, publicProcedure } from "../t";
import { z } from "zod";
import prisma from "$lib/server/Prisma";

export const posts = router({
    getAll: secureProcedure
        .query(async () => {
            return await prisma.post
                .findMany();
        }),
    getAllPublished: secureProcedure
        .query(async () => {
            return await prisma.post
                .findMany({
                    where: {
                        published: true
                    }
                })
        }),
    getByCategory: secureProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return await prisma.post
                .findMany({
                    where: {
                        published: true,
                        category: {
                            name: input
                        }
                    }
                })
        }),
    getById: secureProcedure
        .input(z.number())
        .query(async ({ input }) => {
            return await prisma.post
                .findFirst({
                    where: {
                        published: true,
                        category: {
                            id: input
                        }
                    }
                })
        }),
    create: secureProcedure
        .input(z.object({
            title: z.string().nonempty(),
            categoryId: z.number().nonnegative()
        }))
        .mutation(async ({ input }) => {
            return await prisma.post
                .create({
                    data: {
                        title: input.title,
                        categoryId: input.categoryId,
                        slug: input.title.toLowerCase().trim().split(" ").join("-")
                    }
                })
        }),
    updateContent: secureProcedure
        .input(z.object({
            postId: z.number(),
            content: z.string().nonempty()
        }))
        .mutation(async ({ input }) => {
            return await prisma.post
                .update({
                    where: {
                        id: input.postId
                    },
                    data: {
                        content: input.content
                    }
                })
        }),
    updateCategory: secureProcedure
        .input(z.object({
            postId: z.number(),
            categoryId: z.number()
        }))
        .mutation(async ({ input }) => {
            return await prisma.post
                .update({
                    where: {
                        id: input.postId
                    },
                    data: {
                        categoryId: input.categoryId
                    }
                })
        }),
    addTag: secureProcedure
        .input(z.object({
            postId: z.number(),
            tagName: z.string()
        }))
        .mutation(async ({ input }) => {
            const tagExists = await prisma.tag
                .findFirst({
                    where: {
                        tagName: {
                            mode: "insensitive",
                            equals: input.tagName
                        }
                    }
                })
            if (tagExists) {
                console.log("tag exists");
                return await prisma.post
                    .update({
                        where: {
                            id: input.postId
                        },
                        data: {
                            tags: {
                                connect: [
                                    { id: tagExists.id }
                                ]
                            }
                        },
                        select: {
                            tags: true
                        }
                    })
            } else {
                console.log("tag doesnt exist");
                return await prisma.post
                    .update({
                        where: {
                            id: input.postId
                        },
                        data: {
                            tags: {
                                create: {
                                    tagName: input.tagName.trim()
                                }
                            }
                        },
                        select: {
                            tags: true
                        }
                    })
            }
        }),
    removeTag: secureProcedure
        .input(z.object({
            postId: z.number(),
            tagId: z.number()
        }))
        .mutation(async ({ input }) => {
            return await prisma.post
                .update({
                    where: {
                        id: input.postId
                    },
                    data: {
                        tags: {
                            disconnect: [
                                { id: input.tagId }
                            ]
                        }
                    },
                    select: {
                        tags: true
                    }
                })
        }),
    publish: secureProcedure
        .input(z.number())
        .mutation( async ({ input }) => {
            return await prisma.post
                .update({
                    where: {
                        id: input
                    },
                    data: {
                        published: true
                    }
                })
        }),
    unpublish: secureProcedure
        .input(z.number())
        .mutation( async ({ input }) => {
            return await prisma.post
                .update({
                    where: {
                        id: input
                    },
                    data: {
                        published: false   
                    }
                })
        })
});