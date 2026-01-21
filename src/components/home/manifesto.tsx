"use client";

import { motion } from "motion/react";

export const Manifesto = () => {
  return (
    <section
      id="manifiesto"
      className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative scroll-mt-20"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_transparent_70%)]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase mb-12 block"
        >
          El Manifiesto Ágora
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-serif italic leading-tight text-slate-100"
        >
          &quot;Ágora parte de una intuición poderosa: El problema de la
          política no es la naturaleza humana, son los incentivos de donde
          conversamos. Si cambias los incentivos, cambias la política.&quot;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px w-24 bg-white/30 mx-auto mt-12 mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 font-medium tracking-wide uppercase text-sm"
        >
          Fundación Ágora · 2026
        </motion.p>
      </div>
    </section>
  );
};
