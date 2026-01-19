import "server-only";
import { createEnv } from "@t3-oss/env-nextjs";
import { type } from "arktype";

export const envServer = createEnv({
  server: {
    NODE_ENV: type("'development' | 'production' | 'test'"),

    DATABASE_URL: type("string.url"),
    DATABASE_POOL_URL:
      process.env.NODE_ENV === "production"
        ? type("string.url")
        : type("string.url | undefined"),
  },
  experimental__runtimeEnv: process.env,
});
