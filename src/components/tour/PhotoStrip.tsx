"use client";

import Image from "next/image";
import { useState } from "react";
import { isVideo } from "@/lib/media";
import { cn } from "@/lib/cn";

/** Foto grande + fileira de miniaturas (vídeos tocam sem som). */
export function PhotoStrip({ urls, title }: { urls: string[]; title: string }) {
  const [active, setActive] = useState(0);
  if (!urls.length) return null;
  const current = urls[active];
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-ocean-100">
        {isVideo(current) ? (
          <video key={current} src={current} className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline controls />
        ) : (
          <Image key={current} src={current} alt={title} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        )}
      </div>
      {urls.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {urls.map((u, i) => (
            <button
              key={u}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
              className={cn("relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition", i === active ? "ring-ocean-500" : "opacity-60 ring-transparent hover:opacity-100")}
            >
              {isVideo(u) ? <video src={u} className="size-full object-cover" muted /> : <Image src={u} alt="" fill sizes="96px" className="object-cover" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
