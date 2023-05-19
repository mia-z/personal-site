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
        const formData = Object.fromEntries(await request.formData());
        
        const validationResult = loginSchema.safeParse(formData);
        if (!validationResult.success) {
            const errors = validationResult.error.format();
            return fail(400, errors);
        }

        const user = await prisma.user
            .findFirst({ where: { name: validationResult.data.username } });

        if (!user) {
            return fail(400, { error: "Invalid username or password" });
        }

        const validPass = await VerifyPassword(validationResult.data.password, user.passwordHash);

        if (validPass) {
            const cookieToken = jwt.sign(user.name, SECRET_JWT_CODE);
            cookies.set("token", cookieToken);
            locals.username = user.name;
            return;
        } else {
            return fail(400, { error: "Invalid username or password" });
        }
    }
} satisfies Actions;