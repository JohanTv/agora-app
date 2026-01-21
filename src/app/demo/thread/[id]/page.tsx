import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoLayout } from "@/components/demo/DemoLayout";
import { PostCard } from "@/components/demo/PostCard";
import { ThreadedReply } from "@/components/demo/ThreadedReply";
import { feedPosts, heroPost, heroPostReplies } from "@/mocks/demo-data";

interface ThreadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { id } = await params;

  // Find the post (for demo, we only have hero post and feed posts)
  const post =
    id === heroPost.id ? heroPost : feedPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  // Get replies (only hero post has replies in our demo data)
  const replies = id === heroPost.id ? heroPostReplies : [];
  const topLevelReplies = replies.filter((r) => r.parentId === post.id);

  return (
    <DemoLayout>
      {/* Back Button */}
      <div className="border-b border-border px-4 py-3">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* Main Post */}
      <div className="border-b-2 border-border">
        <PostCard post={post} showThread={false} />
      </div>

      {/* Replies */}
      {topLevelReplies.length > 0 && (
        <div className="divide-y divide-border">
          {topLevelReplies.map((reply) => (
            <ThreadedReply
              key={reply.id}
              reply={reply}
              level={0}
              allReplies={replies}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {topLevelReplies.length === 0 && (
        <div className="py-12 px-4 text-center">
          <p className="text-muted-foreground">
            No replies yet. Be the first to respond!
          </p>
        </div>
      )}
    </DemoLayout>
  );
}
