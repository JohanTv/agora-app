import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { envClient } from "@/env/client";
import type { Result } from "@/types/result.types";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession, resetPassword } =
  authClient;

// Helper function for Google authentication
// OAuth requires browser redirection, the Result pattern cannot be used.
export const signInWithGoogle = () => {
  return authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    errorCallbackURL: "/",
  });
};

export const signInWithEmail = async (
  email: string,
  password: string,
): Promise<Result<void>> => {
  const result = await authClient.signIn.email({
    email,
    password,
  });

  if (result?.error) {
    return {
      success: false,
      error: "Email o contraseña incorrectos.",
    };
  }

  return { success: true, value: undefined };
};
