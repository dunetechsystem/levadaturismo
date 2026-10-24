import type { AgencyPublicReviews, CheckoutPageContent } from "./dunastour/types";
import { displayTitle } from "./format";

export interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  about: string;
}

/** Avaliações dos clientes no DunasTour + as do Google que a agência colou no painel (vazio se desligadas). */
export function reviewItems(reviews: AgencyPublicReviews | null, page: CheckoutPageContent | null | undefined): ReviewItem[] {
  if (page?.showReviews === false) return [];
  return [
    ...(reviews?.items ?? []).map((r) => ({ name: r.touristName, rating: r.rating, text: r.comment, about: displayTitle(r.tourTitle) })),
    ...(page?.googleReviews ?? []).map((r) => ({ name: r.author, rating: r.rating, text: r.text, about: "Google" })),
  ].filter((r) => r.text?.trim());
}

/** Média e total pra mostrar as estrelas: as do DunasTour quando houver, senão a conta das que estão na lista. */
export function reviewSummary(reviews: AgencyPublicReviews | null, items: ReviewItem[]) {
  if (reviews?.count) return { average: reviews.average, count: reviews.count };
  if (!items.length) return null;
  return { average: items.reduce((s, r) => s + r.rating, 0) / items.length, count: items.length };
}
