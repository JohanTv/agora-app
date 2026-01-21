"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Post } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import * as PostService from "@/services/posts/post.service";
import type { CreatePost, UpdatePost } from "@/types/post.types";
import type { Result } from "@/types/result.types";

// ==========================================
// CREATE POST ACTION
// ==========================================
/**
 * Creates a new post.
 * Requires authentication.
 */
export async function createPostAction(
  data: CreatePost,
): Promise<Result<Post>> {
  try {
    // 1. Authentication check
    const session = await auth.api.getSession({
      headers: await import("next/headers").then((mod) => mod.headers()),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Debes iniciar sesión para crear un post.",
      };
    }

    // 2. Call service
    const result = await PostService.create(session.user.id, data);

    if (!result.success) {
      return result;
    }

    // 3. Revalidate cache
    revalidatePath("/feed");
    if (data.parentId) {
      revalidatePath(`/post/${data.parentId}`);
    }

    // 4. Redirect to the new post
    redirect(`/post/${result.value.id}`);
  } catch (error: unknown) {
    console.error("[CREATE_POST_ACTION]", error);
    return {
      success: false,
      error: "No se pudo crear el post.",
    };
  }
}

// ==========================================
// UPDATE POST ACTION
// ==========================================
/**
 * Updates post content (10-minute window enforced in service).
 * Requires authentication.
 */
export async function updatePostAction(
  data: UpdatePost,
): Promise<Result<Post>> {
  try {
    // 1. Authentication check
    const session = await auth.api.getSession({
      headers: await import("next/headers").then((mod) => mod.headers()),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Debes iniciar sesión para editar un post.",
      };
    }

    // 2. Call service (includes ownership and time validation)
    const result = await PostService.updateContent(session.user.id, data);

    if (!result.success) {
      return result;
    }

    // 3. Revalidate cache
    revalidatePath(`/post/${data.postId}`);
    revalidatePath("/feed");

    return result;
  } catch (error: unknown) {
    console.error("[UPDATE_POST_ACTION]", error);
    return {
      success: false,
      error: "No se pudo actualizar el post.",
    };
  }
}

// ==========================================
// DELETE POST ACTION
// ==========================================
/**
 * Soft deletes a post (tombstone pattern).
 * Requires authentication.
 */
export async function deletePostAction(postId: string): Promise<Result<Post>> {
  try {
    // 1. Authentication check
    const session = await auth.api.getSession({
      headers: await import("next/headers").then((mod) => mod.headers()),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Debes iniciar sesión para eliminar un post.",
      };
    }

    // 2. Call service (includes ownership validation)
    const result = await PostService.softDelete(session.user.id, postId);

    if (!result.success) {
      return result;
    }

    // 3. Revalidate cache
    revalidatePath(`/post/${postId}`);
    revalidatePath("/feed");

    return result;
  } catch (error: unknown) {
    console.error("[DELETE_POST_ACTION]", error);
    return {
      success: false,
      error: "No se pudo eliminar el post.",
    };
  }
}
