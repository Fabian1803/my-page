// server/shared/infrastructure/prisma.ts
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/prisma-client/index.js";
const connectionString = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("Falta la variable de entorno de la base de datos (DATABASE_URL o PRISMA_DATABASE_URL)");
const globalForPrisma = global as unknown as { prismaInstance?: PrismaClient; poolInstance?: pg.Pool };
let prisma: PrismaClient;

if (!globalForPrisma.prismaInstance) {
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  globalForPrisma.poolInstance = pool;
  globalForPrisma.prismaInstance = new PrismaClient({ adapter } as any);
}

prisma = globalForPrisma.prismaInstance;
export { prisma };