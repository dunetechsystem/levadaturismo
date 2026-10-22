import type { TourCard } from "./dunastour/types";

/** Abas do quadro de passeios — o DunasTour não tem categoria, então sai do título e do tipo de venda. */
export const TOUR_KINDS = [
  { id: "lagoas", label: "Lagoas e dunas" },
  { id: "rio", label: "Rio e vilas" },
  { id: "aventura", label: "Aventura" },
] as const;

export type TourKind = (typeof TOUR_KINDS)[number]["id"];

export function tourKind(tour: Pick<TourCard, "title" | "riskType" | "saleUnit">): TourKind {
  if (tour.riskType || (tour.saleUnit && tour.saleUnit !== "PESSOA") || /quadri|utv|buggy|sobrevoo|moto/i.test(tour.title)) return "aventura";
  if (/rio|vassouras|mandacaru|cabur|caiaque|cardosa|barco|lancha|voadeira|atins/i.test(tour.title)) return "rio";
  return "lagoas";
}
