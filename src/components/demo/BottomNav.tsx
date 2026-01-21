"use client";

import { Bell, Home, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/demo" },
  { icon: Search, label: "Search", href: "/demo" }, // Mock, no search page
  { icon: Plus, label: "Create", href: "/demo" }, // Mock, no create page
  { icon: Bell, label: "Activity", href: "/demo/activity" },
  { icon: User, label: "Profile", href: "/demo/profile" },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/demo" && pathname === "/demo");
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "fill-foreground")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
