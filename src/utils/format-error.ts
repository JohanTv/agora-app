import { PROCESSING_ERROR } from "@/lib/constants";

export function getErrorMessage(
  error: unknown,
  defaultMessage?: string,
): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return defaultMessage ?? PROCESSING_ERROR;
}
