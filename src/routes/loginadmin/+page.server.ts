import type { Actions } from "./$types";
import jwt from "jsonwebtoken";
import { VerifyPassword } from "$lib/server/crypto";
import prisma from "$lib/prisma";
import { SECRET_JWT_CODE } from "$env/static/private";
import { z } from "zod";
import { error, fail, json, redirect,  } from "@sveltejs/kit";

const loginSchema = z.object({
    username: z.string().nonempty("Must enter a username"),
    password: z.string().nonempty("Must enter a password")
});

export const actions = {
    login: async ({ cookies, request, locals }) => {
        const formData = await request.formData();
        
        const validationResult = loginSchema.safeParse({
            username: formData.get("username"),
            password: formData.get("password"),
        });
        if (!validationResult.success) {
            return fail(400, {
                error: "Validation Error",
                errors: validationResult.error.format()
            });
        }

        const user = await prisma.user
            .findFirst({ where: { name: validationResult.data.username } });

        if (!user) {
            return fail(400, { error: "Invalid username or password", errors: null });
        }

        const validPass = await VerifyPassword(validationResult.data.password, user.passwordHash);

        if (validPass) {
            const cookieToken = jwt.sign(user.name, SECRET_JWT_CODE);
            cookies.set("token", cookieToken);
            return;
        } else {
            return fail(400, { error: "Invalid username or password", errors: null });
        }
    }
} satisfies Actions;