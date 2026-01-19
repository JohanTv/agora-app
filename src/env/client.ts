import { createEnv } from "@t3-oss/env-nextjs";
import { type } from "arktype";

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: type("string.url"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
