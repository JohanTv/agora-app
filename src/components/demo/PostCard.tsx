"use client";

import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { DemoPost } from "@/mocks/demo-data";

interface PostCardProps {
  post: DemoPost;
  compact?: boolean;
  showThread?: boolean;
}

export const PostCard = ({
  post,
  compact = false,
  showThread = true,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const initials = post.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <article
      className={cn(
        "border-b border-border bg-background transition-colors hover:bg-muted/30",
        compact ? "py-3" : "py-4",
      )}
    >
      <div className="flex gap-3 px-4">
        {/* Avatar */}
        <Link href="/demo/profile" className="flex-shrink-0">
          <Avatar className={cn(compact ? "h-8 w-8" : "h-10 w-10")}>
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/demo/profile"
              className="font-semibold text-foreground hover:underline"
            >
              {post.author.name}
            </Link>
            <span className="text-sm text-muted-foreground">
              {post.author.handle}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {post.createdAt}
            </span>
          </div>

          {/* Post Content */}
          <p
            className={cn(
              "text-foreground whitespace-pre-wrap mb-2",
              compact ? "text-sm" : "text-base",
            )}
          >
            {post.content}
          </p>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="mb-3 rounded-lg overflow-hidden border border-border">
              <Image
                src={post.images[0]}
                alt="Post image"
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center gap-6 text-muted-foreground mt-2">
            {/* Like */}
            <button
              type="button"
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 transition-colors group",
                isLiked ? "text-red-500" : "hover:text-red-500",
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all",
                  isLiked && "fill-red-500",
                )}
              />
              <span className="text-sm">{likeCount}</span>
            </button>

            {/* Comment */}
            {showThread && (
              <Link
                href={`/demo/thread/${post.id}`}
                className="flex items-center gap-1.5 transition-colors hover:text-blue-500 group"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.repliesCount}</span>
              </Link>
            )}

            {/* Repost */}
            <button
              type="button"
              className="flex items-center gap-1.5 transition-colors hover:text-green-500"
            >
              <Repeat2 className="h-4 w-4" />
            </button>

            {/* Share */}
            <button
              type="button"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
