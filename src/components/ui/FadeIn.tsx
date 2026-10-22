"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Entra na tela deslizando de leve, como maré chegando. */
export function FadeIn({ children, delay = 0, className, x = 0, y = 24 }: { children: ReactNode; delay?: number; className?: string; x?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
