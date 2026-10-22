"use client";

import { useState } from "react";
import { ArrowDownUp, Check } from "lucide-react";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { transferLines, useTrip, type TransferRequest } from "@/lib/trip";
import { todayISO, whatsappUrl } from "@/lib/format";
import { Counter } from "@/components/ui/Counter";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Field, inputCls } from "./fields";

const PLACES = [...new Set(site.transfer.routes.flatMap((r) => [r.from, r.to]))];

/** Pedido de transfer: entra na "Minha viagem" ou vai sozinho pro WhatsApp. */
export function TransferForm({ phone }: { phone: string }) {
  const saved = useTrip((s) => s.transfer);
  const setTransfer = useTrip((s) => s.setTransfer);
  const openTrip = useCart((s) => s.setOpen);
  const [t, setT] = useState<TransferRequest>(
    saved ?? { from: "Aeroporto de São Luís", to: "Barreirinhas", date: "", passengers: 2, roundTrip: true, flight: "" }
  );
  const set = (patch: Partial<TransferRequest>) => setT((prev) => ({ ...prev, ...patch }));
  const ok = t.from.trim() && t.to.trim() && t.from !== t.to;
  const message = ["Olá, Levada Turismo! Quero um transfer:", "", ...transferLines(t)].join("\n");

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <datalist id="transfer-places">
        {PLACES.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
      <div className="relative grid gap-3">
        <Field label="Saindo de">
          <input list="transfer-places" className={inputCls} value={t.from} onChange={(e) => set({ from: e.target.value })} />
        </Field>
        <button
          type="button"
          onClick={() => set({ from: t.to, to: t.from })}
          aria-label="Inverter trecho"
          className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-ocean-600 text-white shadow-md"
        >
          <ArrowDownUp size={16} />
        </button>
        <Field label="Indo para">
          <input list="transfer-places" className={inputCls} value={t.to} onChange={(e) => set({ to: e.target.value })} />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Data">
          <input type="date" min={todayISO()} className={inputCls} value={t.date} onChange={(e) => set({ date: e.target.value })} />
        </Field>
        <Field label="Voo (opcional)">
          <input className={inputCls} placeholder="Ex.: G3 1234 · 14h20" value={t.flight} onChange={(e) => set({ flight: e.target.value })} />
        </Field>
      </div>
      <div className="rounded-2xl bg-white px-4 ring-1 ring-ocean-900/10">
        <Counter label="Passageiros" value={t.passengers} onChange={(n) => set({ passengers: n })} min={1} max={30} />
      </div>
      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
        <input type="checkbox" checked={t.roundTrip} onChange={(e) => set({ roundTrip: e.target.checked })} className="size-5 accent-ocean-600" />
        Ida e volta
      </label>
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          disabled={!ok}
          onClick={() => {
            setTransfer(t);
            openTrip(true);
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-ocean-600 py-3.5 font-bold text-white transition hover:bg-ocean-700 disabled:opacity-40"
        >
          {saved ? <Check size={18} /> : null} {saved ? "Atualizar na viagem" : "Adicionar à viagem"}
        </button>
        <a
          href={ok ? whatsappUrl(phone, message) : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!ok}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3 font-bold text-[#128C4B] transition hover:bg-[#25D366] hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-40"
        >
          <WhatsAppIcon size={18} /> Só o transfer
        </a>
      </div>
    </form>
  );
}
