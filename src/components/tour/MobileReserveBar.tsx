"use client";

import { useEffect, useState } from "react";
import { money } from "@/lib/format";

/**
 * No celular o painel de reserva fica lá embaixo, depois de fotos e texto: esta barra fixa leva até ele.
 * Some quando o painel aparece na tela e empurra o botão do WhatsApp pra cima (variável --dock).
 */
export function MobileReserveBar({ price, unit }: { price: number; unit: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const panel = document.getElementById("reservar");
    if (!panel) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(panel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    root.style.setProperty("--dock", !hidden && mobile ? "5rem" : "0px");
    return () => {
      root.style.removeProperty("--dock");
    };
  }, [hidden]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 border-t border-ocean-900/10 bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${hidden ? "translate-y-full" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="leading-tight">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-ocean-950/45">A partir de</span>
          <span className="font-display text-2xl font-semibold">{money(price)}</span> <span className="text-xs text-ocean-950/50">{unit}</span>
        </p>
        <a href="#reservar" className="rounded-full bg-ocean-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-ocean-600/25">
          Ver datas e vagas
        </a>
      </div>
    </div>
  );
}
