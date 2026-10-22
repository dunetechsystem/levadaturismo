"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "./cart";
import { longDate, money, shortDate, unitCount } from "./format";

/**
 * O que não é passeio do DunasTour mas entra na mesma viagem: o transfer e a hospedagem. Ficam ao
 * lado do carrinho (lib/cart) e vão juntos na mensagem do WhatsApp.
 */
export interface TransferRequest {
  from: string;
  to: string;
  date: string;
  passengers: number;
  roundTrip: boolean;
  flight: string;
}

export interface LodgingRequest {
  type: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

interface TripState {
  transfer: TransferRequest | null;
  lodging: LodgingRequest | null;
  setTransfer: (t: TransferRequest | null) => void;
  setLodging: (l: LodgingRequest | null) => void;
  clear: () => void;
}

export const useTrip = create<TripState>()(
  persist(
    (set) => ({
      transfer: null,
      lodging: null,
      setTransfer: (transfer) => set({ transfer }),
      setLodging: (lodging) => set({ lodging }),
      clear: () => set({ transfer: null, lodging: null }),
    }),
    { name: "levada-extras", storage: createJSONStorage(() => localStorage) }
  )
);

export const transferLines = (t: TransferRequest) => [
  `🚐 *Transfer:* ${t.from} → ${t.to}${t.roundTrip ? " (ida e volta)" : ""}`,
  `   ${t.date ? longDate(t.date) : "data a combinar"} · ${t.passengers} ${t.passengers === 1 ? "passageiro" : "passageiros"}${t.flight ? ` · voo ${t.flight}` : ""}`,
];

export const lodgingLines = (l: LodgingRequest) => [
  `🛏️ *Hospedagem:* ${l.type}`,
  `   ${l.checkIn ? shortDate(l.checkIn) : "?"} a ${l.checkOut ? shortDate(l.checkOut) : "?"} · ${l.guests} ${l.guests === 1 ? "hóspede" : "hóspedes"} · ${l.rooms} ${l.rooms === 1 ? "quarto" : "quartos"}`,
];

/** Mensagem única da viagem: passeios em ordem de data + transfer + hospedagem. */
export function tripMessage(items: CartItem[], transfer: TransferRequest | null, lodging: LodgingRequest | null) {
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const total = sorted.reduce((sum, i) => sum + i.unitPrice * i.seats, 0);
  const lines = ["Olá, Levada Turismo! Quero montar esta viagem:", ""];
  if (lodging) lines.push(...lodgingLines(lodging), "");
  if (transfer) lines.push(...transferLines(transfer), "");
  sorted.forEach((i) => {
    lines.push(`🌊 *${i.title}*`, `   ${longDate(i.date)} · ${unitCount(i.saleUnit, i.seats)}${i.infants ? ` + ${i.infants} de colo` : ""} · ${money(i.unitPrice * i.seats)}`);
  });
  if (sorted.length) lines.push("", `*Passeios:* ${money(total)}`);
  lines.push("", "Pode verificar a disponibilidade?");
  return lines.join("\n");
}
