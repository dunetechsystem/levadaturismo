"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// Uma onda de período 100 desenhada duas vezes num viewBox de 200: deslizando -50% ela emenda sem corte.
const WAVE = "M0 10 Q25 2 50 10 T100 10 T150 10 T200 10 V20 H0Z";

/**
 * Água enchendo o cartão da estação até `level`% quando ele aparece na tela: duas cristas de onda
 * em velocidades diferentes, bolhas subindo e o número contando junto.
 */
export function WaterLevel({ level, delay = 0 }: { level: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 bottom-0"
        initial={{ height: "0%" }}
        animate={inView ? { height: `${level}%` } : undefined}
        transition={{ duration: 2.4, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* cristas */}
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute bottom-full left-0 h-5 w-[200%] animate-wave-slow fill-ocean-200/70">
          <path d={WAVE} />
        </svg>
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute bottom-full left-0 -mb-px h-3.5 w-[200%] animate-wave-fast fill-ocean-200">
          <path d={WAVE} transform="translate(25 0)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-200 to-ocean-300/80" />
        {/* bolhas */}
        {inView &&
          [12, 34, 58, 81].map((left, i) => (
            <span
              key={left}
              className="absolute bottom-2 size-1.5 animate-bubble rounded-full bg-white/80"
              style={{ left: `${left}%`, animationDelay: `${delay + 2 + i * 0.9}s` }}
            />
          ))}
      </motion.div>
    </div>
  );
}

/**
 * Porcentagem contando de 0 até o nível, no mesmo ritmo da água. Conta no próprio requestAnimationFrame e um
 * timer garante o número final: no iPhone o contador ficava em 0% quando a animação não chegava a rodar.
 */
export function LevelCount({ level, delay = 0 }: { level: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2400;
    const start = performance.now() + delay * 1000;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setN(Math.round(level * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const done = setTimeout(() => setN(level), delay * 1000 + duration + 200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
  }, [inView, level, delay]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}%
    </span>
  );
}
