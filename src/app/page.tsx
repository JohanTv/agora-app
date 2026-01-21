import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { Navbar } from "@/components/home/navbar";
import { Problem } from "@/components/home/problem";
import { Solution } from "@/components/home/solution";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-agora-navy-dark transition-colors duration-300 font-inter">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Manifesto />
      </main>
      <Footer />
    </div>
  );
}
