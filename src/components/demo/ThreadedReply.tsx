"use client";

import { cn } from "@/lib/utils";
import type { DemoPost } from "@/mocks/demo-data";
import { PostCard } from "./PostCard";

interface ThreadedReplyProps {
  reply: DemoPost;
  level: number;
  allReplies: DemoPost[];
}

export const ThreadedReply = ({
  reply,
  level,
  allReplies,
}: ThreadedReplyProps) => {
  const childReplies = allReplies.filter((r) => r.parentId === reply.id);
  const hasChildren = childReplies.length > 0;

  return (
    <div className={cn("relative", level > 0 && "ml-8")}>
      {/* Connection Line */}
      {level > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border -ml-4" />
      )}

      {/* Reply Post */}
      <PostCard post={reply} compact showThread={false} />

      {/* Nested Children */}
      {hasChildren && (
        <div className="relative">
          {childReplies.map((childReply) => (
            <ThreadedReply
              key={childReply.id}
              reply={childReply}
              level={level + 1}
              allReplies={allReplies}
            />
          ))}
        </div>
      )}
    </div>
  );
};
