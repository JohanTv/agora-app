import { DemoLayout } from "@/components/demo/DemoLayout";
import { cn } from "@/lib/utils";
import { aiRejectedNotifications } from "@/mocks/demo-data";

export default function ActivityPage() {
  return (
    <DemoLayout title="Activity">
      <div className="divide-y divide-border">
        {/* AI Rejection Notifications */}
        {aiRejectedNotifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className="px-4 py-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      notification.color === "text-red-500"
                        ? "bg-red-100 dark:bg-red-950"
                        : "bg-amber-100 dark:bg-amber-950",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", notification.color)} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Timestamp */}
                  <div className="text-sm text-muted-foreground mb-2">
                    {notification.timestamp}
                  </div>

                  {/* Headline */}
                  <h3 className={cn("font-semibold mb-2", notification.color)}>
                    {notification.aiFeedbackHeadline}
                  </h3>

                  {/* Rejected Post Snippet */}
                  <div className="mb-3 p-3 rounded-lg bg-muted border border-border">
                    <p className="text-sm text-muted-foreground italic line-clamp-2">
                      "{notification.postContentSnippet}"
                    </p>
                  </div>

                  {/* Feedback Body */}
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-sm text-foreground leading-relaxed">
                      {notification.aiFeedbackBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Regular Notifications (Empty State for Demo) */}
        <div className="px-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            You're all caught up! 🎉
          </p>
        </div>
      </div>
    </DemoLayout>
  );
}
