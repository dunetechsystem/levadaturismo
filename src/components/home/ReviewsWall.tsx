import { Star } from "lucide-react";
import type { AgencyPublicReviews, CheckoutPageContent } from "@/lib/dunastour/types";
import { displayTitle } from "@/lib/format";
import { Heading } from "@/components/ui/Heading";
import { FadeIn } from "@/components/ui/FadeIn";

/** Avaliações dos clientes no DunasTour + as do Google que a agência colou no painel. Some se não houver. */
export function ReviewsWall({ reviews, page }: { reviews: AgencyPublicReviews | null; page: CheckoutPageContent | null | undefined }) {
  const items = [
    ...(reviews?.items ?? []).map((r) => ({ name: r.touristName, rating: r.rating, text: r.comment, about: displayTitle(r.tourTitle) })),
    ...(page?.googleReviews ?? []).map((r) => ({ name: r.author, rating: r.rating, text: r.text, about: "Google" })),
  ].filter((r) => r.text?.trim());
  if (!items.length || page?.showReviews === false) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Heading
        center
        kicker="Quem já foi"
        title={
          <>
            Histórias de <em>quem viajou</em>
          </>
        }
      />
      <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.slice(0, 9).map((r, i) => (
          <FadeIn key={i} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid rounded-[1.75rem] bg-white p-6 ring-1 ring-ocean-900/10">
            <div className="flex gap-0.5 text-sun-400">
              {Array.from({ length: 5 }, (_, n) => (
                <Star key={n} size={16} fill={n < r.rating ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="mt-3 leading-relaxed text-ocean-950/80">“{r.text}”</p>
            <p className="mt-4 text-sm font-bold">{r.name}</p>
            <p className="text-xs text-ocean-950/50">{r.about}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
