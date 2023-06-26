import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";

const prisma = new PrismaClient();

export const HashAndSaltPassword  = async (password) => await hash(password, await genSalt(10));

const main = async () => {
    console.log("Starting initial seed");
    console.log("Getting Adming User password from env 'POSTGRES_USER_ADMIN_PASSWORD'");

    const pass = process.env.POSTGRES_USER_ADMIN_PASSWORD;

    if (!pass) {
        throw Error("Couldnt find password in Environment Variable: POSTGRES_USER_ADMIN_PASSWORD");
    }

    console.log("Salting and Hashing password");
    const hashed = await HashAndSaltPassword(pass);

    await prisma.user.create({
        data: {
            name: "admin",
            passwordHash: hashed
        }
    });

    console.log("Creating default category 'Projects'");
    await prisma.category.create({
        data: {
            categoryName: "Projects"
        }
    });

    console.log("Finished seeding");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.log(`Error when seeding: ${error}`);
        await prisma.$disconnect();
        process.exit(1);
    });