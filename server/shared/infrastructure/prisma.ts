// server/shared/infrastructure/prisma.ts
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/prisma-client/index.js";
const connectionString = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("Falta la variable de entorno de la base de datos (DATABASE_URL o PRISMA_DATABASE_URL)");
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter } as any);