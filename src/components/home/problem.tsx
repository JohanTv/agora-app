"use client";

import { AlertCircle, Link2Off, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const problems = [
  {
    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    bg: "bg-red-50 dark:bg-red-900/10",
    title: "Optimización del Odio",
    desc: "Las redes premian lo polémico. La atención se monetiza a través de la indignación, castigando la complejidad del debate.",
  },
  {
    icon: <Link2Off className="w-6 h-6 text-amber-600" />,
    bg: "bg-amber-50 dark:bg-amber-900/10",
    title: "Desconexión Real",
    desc: "Se debate el 'qué' pero nunca el 'cómo'. Las promesas políticas carecen de estructura, plazos y responsables trazables.",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50 dark:bg-blue-900/10",
    title: "Cámaras de Eco",
    desc: "Los algoritmos te encierran en lo que ya crees. Sin disenso real, la deliberación democrática se vuelve imposible.",
  },
];

export const Problem = () => {
  return (
    <section
      id="problema"
      className="py-24 px-6 bg-slate-50 dark:bg-agora-navy/50 border-y border-slate-100 dark:border-slate-800 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            El sistema actual está roto
          </h2>
          <div className="h-1 w-20 bg-agora-navy dark:bg-blue-600" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="group bg-white dark:bg-agora-navy p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl dark:hover:border-slate-700 hover:-translate-y-1"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                  problem.bg,
                )}
              >
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              // 1. Cambiamos X por Y para un movimiento más natural
              // 2. Quitamos el delay excesivo para que se sienta más reactivo
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} // Empieza un poco antes
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.21, 0.47, 0.32, 0.98], // Un cubic-bezier más premium
              }}
              // 3. Importante: Quitamos 'transition-all' de aquí para evitar el glitch
              className="group bg-white dark:bg-agora-navy p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl dark:hover:border-slate-700 transition-shadow duration-300"
              // 4. Agregamos el hover mediante Framer Motion para que sea perfecto
              whileHover={{ y: -5 }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                  problem.bg,
                )}
              >
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
};
