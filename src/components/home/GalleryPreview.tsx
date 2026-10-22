import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryItem } from "@/lib/media";
import { Heading } from "@/components/ui/Heading";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/cn";

// Mosaico de 8 em 4 colunas: a 1ª ocupa 2×2 e a última fecha a 3ª linha com 2 colunas.
const SPAN: Record<number, string> = { 0: "col-span-2 row-span-2", 7: "col-span-2" };

/** Prévia da galeria na home — fotos do DunasTour + do site; o resto em /galeria. */
export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  const photos = items.filter((i) => !i.video).slice(0, 8);
  if (photos.length < 4) return null;
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Heading
          kicker="Galeria"
          title={
            <>
              Cartões-postais <em>de verdade</em>
            </>
          }
          lead="Fotos dos nossos passeios — sem filtro, do jeito que você vai ver."
        />
        <Link href="/galeria" className="group flex shrink-0 items-center gap-2 font-bold text-ocean-700 hover:text-ocean-500">
          Ver galeria completa <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4">
        {photos.map((p, i) => (
          <FadeIn key={p.url} delay={(i % 4) * 0.05} className={cn("group relative overflow-hidden rounded-2xl bg-ocean-100", SPAN[i])}>
            <Link href="/galeria" className="absolute inset-0">
              <Image src={p.url} alt={p.place} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-950/70 to-transparent p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                {p.place}
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
