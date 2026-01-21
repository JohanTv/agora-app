"use client";

import { Edit3, Share2 } from "lucide-react";
import { DemoLayout } from "@/components/demo/DemoLayout";
import { PostCard } from "@/components/demo/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  currentUser,
  myProfilePosts,
  myProfileReplies,
} from "@/mocks/demo-data";

export default function ProfilePage() {
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DemoLayout title="Profile">
      {/* Profile Header */}
      <div className="px-4 py-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <Avatar className="h-20 w-20">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {currentUser.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              {currentUser.handle}
            </p>
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <p className="text-foreground mb-4">{currentUser.bio}</p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div>
            <span className="font-semibold text-foreground">
              {currentUser.followersCount}
            </span>{" "}
            <span className="text-sm text-muted-foreground">followers</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="w-full grid grid-cols-2 rounded-none h-12 bg-transparent border-b border-border p-0">
          <TabsTrigger
            value="threads"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Threads
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Replies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threads" className="mt-0">
          {myProfilePosts.length > 0 ? (
            <div className="divide-y divide-border">
              {myProfilePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-12 px-4 text-center">
              <p className="text-muted-foreground">No threads yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="replies" className="mt-0">
          {myProfileReplies.length > 0 ? (
            <div className="divide-y divide-border">
              {myProfileReplies.map((reply) => (
                <PostCard key={reply.id} post={reply} compact />
              ))}
            </div>
          ) : (
            <div className="py-12 px-4 text-center">
              <p className="text-muted-foreground">No replies yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DemoLayout>
  );
}
