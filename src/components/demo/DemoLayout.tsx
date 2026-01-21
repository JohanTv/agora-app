import { BottomNav } from "./BottomNav";

interface DemoLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const DemoLayout = ({ children, title }: DemoLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <h1 className="text-xl font-bold text-foreground">
            {title || "Ágora"}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto">{children}</main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
