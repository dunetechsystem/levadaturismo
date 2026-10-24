import { Star } from "lucide-react";
import type { ReviewItem } from "@/lib/reviews";

export function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5 text-sun-400">
      {Array.from({ length: 5 }, (_, n) => (
        <Star key={n} size={size} fill={n < Math.round(rating) ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

/**
 * Prova social na página do passeio, perto da reserva: média, total e até 3 depoimentos — os deste
 * passeio primeiro, completando com os outros.
 */
export function ReviewsSnippet({ items, summary, tourTitle }: { items: ReviewItem[]; summary: { average: number; count: number } | null; tourTitle: string }) {
  if (!items.length || !summary) return null;
  const picked = [...items.filter((r) => r.about === tourTitle), ...items.filter((r) => r.about !== tourTitle)].slice(0, 3);
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-3xl font-semibold">Quem já foi com a gente</h2>
        <p className="flex items-center gap-2 text-sm text-ocean-950/60">
          <Stars rating={summary.average} />
          <strong className="text-ocean-950">{summary.average.toFixed(1).replace(".", ",")}</strong> · {summary.count} avaliações
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {picked.map((r, i) => (
          <figure key={i} className="flex flex-col rounded-[1.75rem] bg-white p-5 ring-1 ring-ocean-900/10">
            <Stars rating={r.rating} size={14} />
            <blockquote className="mt-3 line-clamp-6 flex-1 text-sm leading-relaxed text-ocean-950/80">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-bold">
              {r.name} <span className="block text-xs font-normal text-ocean-950/50">{r.about}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
