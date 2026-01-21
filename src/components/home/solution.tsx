"use client";

import { Brain, CheckCircle2, Kanban } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: "Sin Reacciones",
    desc: "Adiós al 'me divierte' o 'me enoja'. Evaluamos claridad, coherencia y evidencia. La razón sobre el impulso.",
  },
  {
    icon: <Kanban className="w-5 h-5" />,
    title: "Tablero del Cómo",
    desc: "Promesas transformadas en hitos públicos. Cada compromiso es un objeto vivo con plazos y responsables.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "Moderación Sistémica",
    desc: "El algoritmo prioriza la solidez lógica, no la viralidad. IA diseñada para elevar la calidad del argumento.",
  },
];

export const Solution = () => {
  return (
    <section
      id="solucion"
      className="py-32 px-6 bg-white dark:bg-agora-navy-dark scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6"
          >
            Incentivos distintos para una política distinta
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 dark:text-slate-400 font-light"
          >
            Rediseñamos la infraestructura de la conversación cívica para que la
            transparencia sea el estándar predeterminado.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 bg-agora-navy dark:bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-slate-200 dark:shadow-none">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {f.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[240px]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
