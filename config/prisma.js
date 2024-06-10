import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;


export const prisma = globalForPrisma.prima || new PrismaClient();

if (process.env.NODE_ENV !== "production")
globalForPrisma.prisma = prisma;

//principal coisa do prisma - criando a conexão - só precisa de 1 conexão