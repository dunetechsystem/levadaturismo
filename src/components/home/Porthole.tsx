"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Janela redonda com as fotos trocando a cada 5 s, com aro em degradê azul como o selo. */
export function Porthole({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative aspect-square rounded-full bg-gradient-to-br from-ocean-400 via-ocean-600 to-ocean-900 p-3 shadow-[0_40px_80px_-30px_rgba(8,115,187,.6)] sm:p-4">
      <div className="relative size-full overflow-hidden rounded-full bg-ocean-200 ring-8 ring-white">
        <AnimatePresence initial={false}>
          {images[i] && (
            <motion.div key={images[i]} className="absolute inset-0" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>
              <Image src={images[i]} alt="" fill priority={i === 0} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((src, n) => (
            <button key={src} type="button" aria-label={`Foto ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-ocean-600" : "w-1.5 bg-ocean-900/20"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
