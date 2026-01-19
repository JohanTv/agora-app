import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { envServer } from "@/env/server";
import { PrismaClient } from "@/generated/prisma/client";

const prismaClientSingleton = () => {
  // Prisma v7 requires an adapter for database connections
  // In production, use DATABASE_POOL_URL (port 6543) for faster pooled queries
  // In development, use DATABASE_URL (direct connection)
  const connectionString =
    envServer.NODE_ENV === "production" && envServer.DATABASE_POOL_URL
      ? envServer.DATABASE_POOL_URL
      : envServer.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log:
      envServer.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

  if (envServer.NODE_ENV === "development") {
    client.$on("query", (e: { params: unknown; duration: number }) => {
      console.log(`Params: ${e.params}`);
      console.log(`Duration: ${e.duration}ms`);
      console.log("---------------------------------");
    });
  }

  return client;
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (envServer.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
