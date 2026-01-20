import { PROCESSING_ERROR } from "@/lib/constants";
import type { Result } from "@/types/result.types";

export async function handleResponse<T>(
  url: string,
  options: RequestInit,
): Promise<Result<T>> {
  try {
    const response = await fetch(url, options);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const error =
        response.status === 401 || response.status === 500
          ? PROCESSING_ERROR
          : String(data?.message) || response.statusText;
      return {
        success: false,
        error: error,
      };
    }

    return {
      success: true,
      value: data,
    };
  } catch (error) {
    console.error("[API Exception]", {
      url,
      error,
    });

    return {
      success: false,
      error: PROCESSING_ERROR,
    };
  }
}
