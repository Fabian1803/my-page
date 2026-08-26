import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/prisma-client/index.js";

const rawConnectionString = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
if (!rawConnectionString) throw new Error("Falta la variable de entorno de la base de datos (DATABASE_URL o PRISMA_DATABASE_URL)");

const globalForPrisma = global as unknown as { prismaInstance?: PrismaClient; poolInstance?: pg.Pool };
let prisma: PrismaClient;

if (!globalForPrisma.prismaInstance) {
  const isLocal = rawConnectionString.includes("localhost") || rawConnectionString.includes("127.0.0.1");

  const pool = new pg.Pool({
    connectionString: rawConnectionString,
    max: 10,
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 30000,
    ssl: isLocal ? undefined : { rejectUnauthorized: false }
  });

  pool.on("error", (err) => {
    console.warn("Aviso de conexión inactiva en Vercel Postgres pool:", err.message);
  });

  const adapter = new PrismaPg(pool);

  globalForPrisma.poolInstance = pool;
  globalForPrisma.prismaInstance = new PrismaClient({ adapter } as any);
}

prisma = globalForPrisma.prismaInstance;
export { prisma };