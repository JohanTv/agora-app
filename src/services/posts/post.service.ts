import "server-only";

import { type } from "arktype";
import type { Post } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import {
  type CreatePost,
  CreatePostSchema,
  type UpdatePost,
  UpdatePostSchema,
  validatePostContent,
  validatePostImages,
} from "@/types/post.types";
import type { Result } from "@/types/result.types";
import { getErrorMessage } from "@/utils/format-error";

const EDICION_LIMIT_MINUTES = 10;

// ==========================================
// CREATE POST
// ==========================================
/**
 * Creates a new post with PENDING status.
 * If parentId is provided, increments the parent's replyCount.
 */
export const create = async (
  userId: string,
  data: CreatePost,
): Promise<Result<Post>> => {
  // Validate basicinput structure
  const validation = CreatePostSchema(data);
  if (validation instanceof type.errors) {
    return { success: false, error: validation.summary };
  }

  // Custom validation for content length
  const contentError = validatePostContent(data.content);
  if (contentError) {
    return { success: false, error: contentError };
  }

  // Custom validation for images array
  const imagesError = validatePostImages(data.images);
  if (imagesError) {
    return { success: false, error: imagesError };
  }

  try {
    // Use transaction to ensure atomicity when post is a reply
    const post = await prisma.$transaction(async (tx) => {
      // Create the post
      const newPost = await tx.post.create({
        data: {
          content: data.content,
          images: data.images || [],
          authorId: userId,
          parentId: data.parentId ?? null,
          status: "PENDING", // Awaiting AI moderation
        },
      });

      // If it's a reply, increment parent's replyCount
      if (data.parentId) {
        await tx.post.update({
          where: { id: data.parentId },
          data: { replyCount: { increment: 1 } },
        });
      }

      return newPost;
    });

    return {
      success: true,
      value: post,
    };
  } catch (error: unknown) {
    console.error("[CREATE_POST_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "No se pudo crear el post."),
    };
  }
};

// ==========================================
// UPDATE POST CONTENT
// ==========================================
/**
 * Updates post content if within 10-minute edit window.
 * Sets editedAt timestamp.
 */
export const updateContent = async (
  userId: string,
  data: UpdatePost,
): Promise<Result<Post>> => {
  // Validate input structure
  const validation = UpdatePostSchema(data);
  if (validation instanceof type.errors) {
    return { success: false, error: validation.summary };
  }

  // Custom validation for content length
  const contentError = validatePostContent(data.content);
  if (contentError) {
    return { success: false, error: contentError };
  }

  try {
    // Fetch the post
    const post = await prisma.post.findUnique({
      where: { id: data.postId },
    });

    if (!post) {
      return {
        success: false,
        error: "El post no existe.",
      };
    }

    // Check ownership
    if (post.authorId !== userId) {
      return {
        success: false,
        error: "No tienes permiso para editar este post.",
      };
    }

    // Validate 10-minute edit window
    const now = new Date();
    const diffMs = now.getTime() - post.createdAt.getTime();
    const diffMins = diffMs / (1000 * 60);

    if (diffMins > EDICION_LIMIT_MINUTES) {
      return {
        success: false,
        error: "El tiempo límite de edición (10 min) ha expirado.",
      };
    }

    // Update the post
    const updated = await prisma.post.update({
      where: { id: data.postId },
      data: {
        content: data.content,
        editedAt: new Date(),
      },
    });

    return {
      success: true,
      value: updated,
    };
  } catch (error: unknown) {
    console.error("[UPDATE_POST_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "No se pudo actualizar el post."),
    };
  }
};

// ==========================================
// SOFT DELETE (TOMBSTONE)
// ==========================================
/**
 * Soft deletes a post by setting deletedAt, clearing content and images.
 * Preserves post structure for threading integrity.
 */
export const softDelete = async (
  userId: string,
  postId: string,
): Promise<Result<Post>> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        success: false,
        error: "El post no existe.",
      };
    }

    // Check ownership
    if (post.authorId !== userId) {
      return {
        success: false,
        error: "No tienes permiso para eliminar este post.",
      };
    }

    // Soft delete: Set deletedAt, clear content and images
    const deleted = await prisma.post.update({
      where: { id: postId },
      data: {
        deletedAt: new Date(),
        content: "[Este mensaje ha sido eliminado por el autor.]",
        images: [],
      },
    });

    return {
      success: true,
      value: deleted,
    };
  } catch (error: unknown) {
    console.error("[SOFT_DELETE_POST_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "No se pudo eliminar el post."),
    };
  }
};

// ==========================================
// GET POST BY ID
// ==========================================
/**
 * Retrieves a single post by ID with author information.
 */
export const getById = async (postId: string): Promise<Result<Post>> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      return {
        success: false,
        error: "El post no existe.",
      };
    }

    return {
      success: true,
      value: post,
    };
  } catch (error: unknown) {
    console.error("[GET_POST_BY_ID_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "No se pudo obtener el post."),
    };
  }
};
