"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/media";

/** Mural em colunas; clique abre em tela cheia com setas e Esc. */
export function PhotoWall({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const go = (d: number) => setOpen((i) => (i == null ? i : (i + d + items.length) % items.length));

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const current = open != null ? items[open] : null;
  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
        {items.map((it, i) => (
          <button key={it.url} type="button" onClick={() => setOpen(i)} className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-ocean-100">
            {it.video ? (
              <video src={it.url} muted playsInline loop autoPlay className="w-full" />
            ) : (
              <Image src={it.url} alt={it.place} width={600} height={600} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full transition duration-500 group-hover:scale-105" />
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-950/70 to-transparent p-3 text-left text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">{it.place}</span>
          </button>
        ))}
      </div>
      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-950/95 p-4" onClick={() => setOpen(null)}>
          <button type="button" aria-label="Fechar" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white" onClick={() => setOpen(null)}>
            <X />
          </button>
          <button type="button" aria-label="Anterior" className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white" onClick={(e) => (e.stopPropagation(), go(-1))}>
            <ChevronLeft />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {current.video ? (
              <video src={current.url} controls autoPlay className="size-full object-contain" />
            ) : (
              <Image src={current.url} alt={current.place} fill sizes="100vw" className="object-contain" />
            )}
          </div>
          <button type="button" aria-label="Próxima" className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white" onClick={(e) => (e.stopPropagation(), go(1))}>
            <ChevronRight />
          </button>
          <p className="absolute bottom-5 text-sm text-white/70">{current.place}</p>
        </div>
      )}
    </>
  );
}
