"use client";

import { ArrowRight, Compass, Search } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-agora-surface-light dark:bg-agora-surface-dark">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-agora-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-agora-navy/10 dark:bg-white/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated 404 with icons */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Search className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-agora-navy opacity-50" />
            </motion.div>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-bold text-agora-navy dark:text-white">
              404
            </h1>
            <motion.div
              animate={{
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Compass className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-agora-navy opacity-50" />
            </motion.div>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            Error de Navegación
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold text-agora-navy dark:text-white leading-tight mb-4 px-2">
            Parece que te perdiste en el{" "}
            <span className="italic font-light">ágora</span>
          </h2>

          <p className="text-sm sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-3 leading-relaxed px-2">
            Esta página no existe, o quizás nunca existió. Como un político
            prometiendo transparencia... simplemente no está aquí.
          </p>

          <motion.p
            className="text-xs sm:text-base text-slate-400 dark:text-slate-500 max-w-xl mx-auto mb-8 italic px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            (Pero a diferencia de esas promesas, nosotros sí te ayudamos a
            encontrar el camino de vuelta)
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Button
              asChild
              size="lg"
              className="bg-agora-navy dark:bg-white dark:hover:bg-white/90"
            >
              <Link href="/">
                Volver al inicio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Fun animated quote */}
          <motion.div
            className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 italic px-2">
              "No todos los que deambulan están perdidos... pero tú sí. 😄"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
