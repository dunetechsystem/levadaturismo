"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { lodgingLines, useTrip, type LodgingRequest } from "@/lib/trip";
import { todayISO, whatsappUrl } from "@/lib/format";
import { track } from "@/lib/track";
import { Counter } from "@/components/ui/Counter";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { Field, inputCls } from "./fields";

/** Pedido de hospedagem: a Levada indica e reserva com os parceiros (pousada, hostel ou hotel). */
export function LodgingForm({ phone, initialType }: { phone: string; initialType?: string }) {
  const saved = useTrip((s) => s.lodging);
  const setLodging = useTrip((s) => s.setLodging);
  const openTrip = useCart((s) => s.setOpen);
  const [l, setL] = useState<LodgingRequest>(saved ?? { type: initialType ?? "Pousada", checkIn: "", checkOut: "", guests: 2, rooms: 1 });
  const set = (patch: Partial<LodgingRequest>) => setL((prev) => ({ ...prev, ...patch }));
  const ok = !!l.checkIn && !!l.checkOut && l.checkOut > l.checkIn;
  const message = ["Olá, Levada Turismo! Quero indicação de hospedagem:", "", ...lodgingLines(l)].join("\n");
  const types = site.lodging.map((x) => x.singular);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => set({ type })}
            className={cn("rounded-full px-4 py-2 text-sm font-bold ring-1 transition", l.type === type ? "bg-ocean-600 text-white ring-ocean-600" : "bg-white text-ocean-800 ring-ocean-900/15 hover:ring-ocean-500")}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Check-in">
          <input type="date" min={todayISO()} className={inputCls} value={l.checkIn} onChange={(e) => set({ checkIn: e.target.value })} />
        </Field>
        <Field label="Check-out">
          <input type="date" min={l.checkIn || todayISO()} className={inputCls} value={l.checkOut} onChange={(e) => set({ checkOut: e.target.value })} />
        </Field>
      </div>
      <div className="divide-y divide-ocean-900/10 rounded-2xl bg-white px-4 ring-1 ring-ocean-900/10">
        <Counter label="Hóspedes" value={l.guests} onChange={(n) => set({ guests: n })} min={1} max={30} />
        <Counter label="Quartos" value={l.rooms} onChange={(n) => set({ rooms: n })} min={1} max={15} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          disabled={!ok}
          onClick={() => {
            setLodging(l);
            track("AddToCart", { item: "hospedagem" });
            openTrip(true);
          }}
          className="rounded-full bg-ocean-600 py-3.5 font-bold text-white transition hover:bg-ocean-700 disabled:opacity-40"
        >
          {saved ? "Atualizar na viagem" : "Adicionar à viagem"}
        </button>
        <a
          href={ok ? whatsappUrl(phone, message) : undefined}
          data-lead="hospedagem"
          target="_blank"
          rel="noreferrer"
          aria-disabled={!ok}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3 font-bold text-[#128C4B] transition hover:bg-[#25D366] hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-40"
        >
          <WhatsAppIcon size={18} /> Só a hospedagem
        </a>
      </div>
      {l.checkIn && l.checkOut && !ok && <p className="text-sm font-semibold text-red-600">O check-out precisa ser depois do check-in.</p>}
    </form>
  );
}
