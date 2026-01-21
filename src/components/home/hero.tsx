"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center -mt-20 pt-40 pb-24 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 mt-10">
            The Civic Standard
          </span>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-8">
            La visibilidad no se gana con emoción, sino con{" "}
            <span className="italic font-light">calidad.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ágora es la plataforma cívica donde el argumento tiene peso y las
            promesas se transforman en hitos trazables. Menos ruido, más
            ejecución.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              className="px-8 py-4 bg-agora-navy dark:bg-white text-white dark:text-agora-navy rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
            >
              Empezar ahora
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#manifiesto"
              className="px-8 py-4 text-slate-600 dark:text-slate-400 font-medium hover:text-agora-navy dark:hover:text-white transition-colors"
            >
              Explorar el manifiesto
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
