import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { envClient } from "@/env/client";
import { envServer } from "@/env/server";
import { ROLES } from "./constants";
import prisma from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
      redirectURI: `${envClient.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
      disableImplicitSignUp: false,
    },
  },
  plugins: [
    admin({
      adminRole: ROLES.ADMIN,
      defaultRole: ROLES.MEMBER,
    }),
  ],
});
