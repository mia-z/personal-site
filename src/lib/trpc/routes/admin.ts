import { router, publicProcedure } from "../t";
import { z } from "zod";
import { SECRET_ADMIN_PASSWORD, SECRET_JWT } from "$env/static/private";
import prisma from "$lib/server/Prisma";
import { TRPCError } from "@trpc/server";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";
import jwt from "jsonwebtoken";

export const admin = router({
    login: publicProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            if (input == SECRET_ADMIN_PASSWORD) {
                const token = uuid();
                const newEntity = await prisma.activeTokens
                    .create({
                        data: {
                            token,
                            dateCreated: DateTime.local().toString(),
                            dateUpdated: DateTime.local().toString(),
                        },
                        select: {
                            token: true
                        }
                    });
                const jwtToken = jwt.sign(token, SECRET_JWT);
                return jwtToken;
            } else {
                throw new TRPCError({
                    code: "UNAUTHORIZED"
                });
            }
        })
});