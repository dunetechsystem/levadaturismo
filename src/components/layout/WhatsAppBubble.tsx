"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Botão fixo do WhatsApp; depois de alguns segundos mostra um balão de conversa (uma vez por visita). */
export function WhatsAppBubble({ phone }: { phone: string }) {
  const [hint, setHint] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("levada-hint") === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setHint(true), 9000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setHint(false);
    try {
      sessionStorage.setItem("levada-hint", "1");
    } catch {}
  };

  return (
    <div className="fixed bottom-[calc(1.25rem+var(--dock,0px))] right-5 z-30 flex items-end gap-3 transition-[bottom] duration-300">
      <AnimatePresence>
        {hint && (
          <motion.button
            type="button"
            onClick={dismiss}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2 hidden max-w-60 rounded-2xl rounded-br-sm bg-white p-4 text-left text-sm shadow-xl ring-1 ring-ocean-900/10 sm:block"
          >
            <p className="font-bold text-ocean-900">Planejando a viagem? 🌊</p>
            <p className="mt-1 text-ocean-950/60">A gente monta passeios, transfer e hospedagem pra você.</p>
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={whatsappUrl(phone, "Olá, Levada Turismo! Vim pelo site.")}
        target="_blank"
        rel="noreferrer"
        onClick={dismiss}
        aria-label="Conversar no WhatsApp"
        className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
        <WhatsAppIcon size={28} className="relative" />
      </a>
    </div>
  );
}
