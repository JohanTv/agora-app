import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-agora-navy-dark transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-agora-navy dark:bg-white rounded-sm flex items-center justify-center">
            <span className="text-white dark:text-agora-navy font-serif text-xs font-bold">
              A
            </span>
          </div>
          <span className="text-sm font-bold tracking-tight text-agora-navy dark:text-white uppercase">
            Ágora
          </span>
        </div>

        <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
          <Link
            href="#"
            className="hover:text-agora-navy dark:hover:text-white transition-colors"
          >
            Privacidad
          </Link>
          <Link
            href="#"
            className="hover:text-agora-navy dark:hover:text-white transition-colors"
          >
            Términos
          </Link>
          <Link
            href="#"
            className="hover:text-agora-navy dark:hover:text-white transition-colors"
          >
            Contacto
          </Link>
        </div>

        <p className="text-sm text-slate-400 dark:text-slate-500">
          © 2026 Ágora. Rediseñando la democracia.
        </p>
      </div>
    </footer>
  );
};
