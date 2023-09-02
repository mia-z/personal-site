import { router, secureProcedure } from "../t";
import { z } from "zod";
import { SECRET_ADMIN_PASSWORD, SECRET_JWT } from "$env/static/private";
import prisma from "$lib/server/Prisma";
import { TRPCError } from "@trpc/server";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";
import jwt from "jsonwebtoken";

export const posts = router({
    
});