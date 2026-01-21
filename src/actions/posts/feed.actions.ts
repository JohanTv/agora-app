"use server";

import * as FeedService from "@/services/posts/feed.service";

// ==========================================
// GET FEED ACTION
// ==========================================
/**
 * Bridge for client components to fetch the feed.
 * Wrapper around feed service.
 */
export async function getFeedAction(limit = 10, cursor?: string) {
  return await FeedService.getFeed(limit, cursor);
}

// ==========================================
// GET POST DETAIL ACTION
// ==========================================
/**
 * Bridge for client components to fetch post detail.
 * Wrapper around feed service.
 */
export async function getPostDetailAction(
  postId: string,
  childrenLimit = 10,
  childrenCursor?: string,
) {
  return await FeedService.getPostDetail(postId, childrenLimit, childrenCursor);
}

// ==========================================
// GET USER POSTS ACTION
// ==========================================
/**
 * Bridge for client components to fetch user posts.
 * Wrapper around feed service.
 */
export async function getUserPostsAction(
  userId: string,
  limit = 10,
  cursor?: string,
) {
  return await FeedService.getUserPosts(userId, limit, cursor);
}
