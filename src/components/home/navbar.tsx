import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-agora-navy-dark/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-8 h-8 bg-agora-navy dark:bg-slate-100 rounded-sm flex items-center justify-center">
            <span className="text-white dark:text-agora-navy font-serif text-xl font-bold">
              A
            </span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-agora-navy dark:text-white">
            ÁGORA
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#problema"
            className="text-slate-500 dark:text-slate-400 hover:text-agora-navy dark:hover:text-white transition-colors"
          >
            El Problema
          </a>
          <a
            href="#solucion"
            className="text-slate-500 dark:text-slate-400 hover:text-agora-navy dark:hover:text-white transition-colors"
          >
            La Solución
          </a>
          <a
            href="#manifiesto"
            className="text-slate-500 dark:text-slate-400 hover:text-agora-navy dark:hover:text-white transition-colors"
          >
            Manifiesto
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button className="px-5 py-2.5 bg-agora-navy dark:bg-white text-white dark:text-agora-navy text-sm font-medium rounded-full hover:bg-agora-navy/90 dark:hover:bg-slate-200 shadow-none h-auto">
            Unirse
          </Button>
        </div>
      </div>
    </nav>
  );
};
