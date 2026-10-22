"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Embed oficial do perfil do Instagram (instagram.com/<perfil>/embed): cabeçalho real + os 6 posts mais recentes,
 * atualizados pelo próprio Instagram, sem token. São 2 linhas de 3 quadrados (2/3 da largura) + o cabeçalho, que o
 * Instagram aumenta junto com a largura (≈ 86 px em 540, ≈ 158 px em 840 — medido nos prints).
 */
const header = (width: number) => Math.max(86, 0.24 * width - 44);

export function InstagramProfileEmbed({ handle }: { handle: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(560);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setHeight(Math.round(header(el.clientWidth) + (el.clientWidth * 2) / 3) + 4);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ocean-900/10">
      <iframe
        src={`https://www.instagram.com/${handle}/embed/`}
        title={`Instagram de @${handle}`}
        loading="lazy"
        scrolling="no"
        className="block w-full border-0"
        style={{ height }}
      />
    </div>
  );
}
