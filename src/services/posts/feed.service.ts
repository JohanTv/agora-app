import "server-only";

import type { Post } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import type { Result } from "@/types/result.types";
import { getErrorMessage } from "@/utils/format-error";

// ==========================================
// TYPES
// ==========================================
type FeedResult = {
  posts: Post[];
  nextCursor?: string;
};

type PostDetailResult = {
  post: Post;
  parent?: Post | null;
  children: Post[];
  childrenNextCursor?: string;
};

// ==========================================
// GET FEED (CURSOR PAGINATION)
// ==========================================
/**
 * Retrieves root posts (no parent) with PUBLISHED status.
 * Uses cursor-based pagination for infinite scroll.
 */
export const getFeed = async (
  limit = 10,
  cursor?: string,
): Promise<Result<FeedResult>> => {
  try {
    const posts = await prisma.post.findMany({
      take: limit + 1, // +1 to detect if there's a next page
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        parentId: null, // Only root posts
        status: "PUBLISHED", // Only published posts
        deletedAt: null, // Exclude soft-deleted posts
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            children: true,
          },
        },
      },
    });

    let nextCursor: string | undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop(); // Remove the extra item
      nextCursor = nextItem?.id;
    }

    return {
      success: true,
      value: {
        posts,
        nextCursor,
      },
    };
  } catch (error: unknown) {
    console.error("[GET_FEED_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "No se pudo obtener el feed."),
    };
  }
};

// ==========================================
// GET POST DETAIL (FOCUS VIEW)
// ==========================================
/**
 * Retrieves a single post with context:
 * - The target post
 * - The immediate parent (if exists)
 * - Direct children (paginated)
 */
export const getPostDetail = async (
  postId: string,
  childrenLimit = 10,
  childrenCursor?: string,
): Promise<Result<PostDetailResult>> => {
  try {
    // 1. Get the target post
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

    // 2. Get the parent (if exists)
    let parent: Post | null = null;
    if (post.parentId) {
      parent = await prisma.post.findUnique({
        where: { id: post.parentId },
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
    }

    // 3. Get direct children (paginated)
    const children = await prisma.post.findMany({
      take: childrenLimit + 1,
      cursor: childrenCursor ? { id: childrenCursor } : undefined,
      where: {
        parentId: postId,
        deletedAt: null, // Exclude soft-deleted
      },
      orderBy: { createdAt: "asc" }, // Oldest first for comments
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

    let childrenNextCursor: string | undefined;
    if (children.length > childrenLimit) {
      const nextItem = children.pop();
      childrenNextCursor = nextItem?.id;
    }

    return {
      success: true,
      value: {
        post,
        parent,
        children,
        childrenNextCursor,
      },
    };
  } catch (error: unknown) {
    console.error("[GET_POST_DETAIL_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "No se pudo obtener el detalle del post."),
    };
  }
};

// ==========================================
// GET USER POSTS
// ==========================================
/**
 * Retrieves posts authored by a specific user.
 * Uses cursor-based pagination.
 */
export const getUserPosts = async (
  userId: string,
  limit = 10,
  cursor?: string,
): Promise<Result<FeedResult>> => {
  try {
    const posts = await prisma.post.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        authorId: userId,
        status: "PUBLISHED",
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            children: true,
          },
        },
      },
    });

    let nextCursor: string | undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem?.id;
    }

    return {
      success: true,
      value: {
        posts,
        nextCursor,
      },
    };
  } catch (error: unknown) {
    console.error("[GET_USER_POSTS_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(
        error,
        "No se pudo obtener los posts del usuario.",
      ),
    };
  }
};
