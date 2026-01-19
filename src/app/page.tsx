import AnimatedHeader from "@/components/home/AnimatedHeader";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute top-10 right-10 z-20">
        <ModeToggle />
      </div>
      <AnimatedHeader />
    </div>
  );
}
