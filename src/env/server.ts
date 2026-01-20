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

    BETTER_AUTH_SECRET: type("string").pipe(type("string>=32")),
    BETTER_AUTH_URL: type("string.url"),

    GOOGLE_CLIENT_ID: type("string>=1"),
    GOOGLE_CLIENT_SECRET: type("string>=1"),
  },
  experimental__runtimeEnv: process.env,
});
