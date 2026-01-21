import { DemoLayout } from "@/components/demo/DemoLayout";
import { PostCard } from "@/components/demo/PostCard";
import { feedPosts } from "@/mocks/demo-data";

export default function DemoPage() {
  return (
    <DemoLayout title="Home">
      <div className="divide-y divide-border">
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </DemoLayout>
  );
}
