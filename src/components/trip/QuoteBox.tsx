"use client";

import { useState } from "react";
import { todayISO, longDate, whatsappUrl } from "@/lib/format";
import { Counter } from "@/components/ui/Counter";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Field, inputCls } from "./fields";

/** Orçamento de roteiro de vários dias: data de chegada + pessoas → WhatsApp. */
export function QuoteBox({ phone, name, days }: { phone: string; name: string; days: number }) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const message = [
    `Olá, Levada Turismo! Quero um orçamento do roteiro *${name}* (${days} dias).`,
    "",
    `*Chegada:* ${date ? longDate(date) : "a definir"}`,
    `*Adultos:* ${adults}`,
    ...(kids ? [`*Crianças:* ${kids}`] : []),
  ].join("\n");
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ocean-900/10">
      <div className="bg-ocean-950 px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-300">Orçamento sem compromisso</p>
        <p className="mt-1 font-display text-2xl font-semibold">{days} dias de viagem</p>
      </div>
      <div className="space-y-4 p-6">
        <Field label="Dia da chegada">
          <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </Field>
        <div className="divide-y divide-ocean-900/10 rounded-2xl bg-sand-50 px-4 ring-1 ring-ocean-900/10">
          <Counter label="Adultos" value={adults} onChange={setAdults} min={1} max={40} />
          <Counter label="Crianças" hint="Até 11 anos" value={kids} onChange={setKids} max={20} />
        </div>
        <a href={whatsappUrl(phone, message)} data-lead={`roteiro ${name}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-bold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#1ebe5b]">
          <WhatsAppIcon /> Pedir orçamento
        </a>
        <p className="text-center text-xs text-ocean-950/50">Hospedagem, transfer e passeios ajustados à sua data.</p>
      </div>
    </div>
  );
}
