import { compare, hash, genSalt } from "bcrypt";

const secret = import.meta.env.SECRET_JWT_CODE;

const SALT_ROUNDS = 10;

export const HashAndSaltPassword  = async (password: string): Promise<string> => await hash(password, await genSalt(SALT_ROUNDS));

export const VerifyPassword = async (input: string, hashToCompare: string): Promise<boolean> => await compare(input, hashToCompare);

export const encodedJWTSecret = new TextEncoder().encode(secret);