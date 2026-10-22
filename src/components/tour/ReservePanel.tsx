"use client";

import { useState } from "react";
import { CalendarCheck, Loader2, TriangleAlert } from "lucide-react";
import { useDayRules } from "@/lib/availability";
import { itemKey, useCart, type CartItem } from "@/lib/cart";
import { isFullDayTour, longDate, money, perUnit, todayISO, unitCount, unitLabel, whatsappUrl } from "@/lib/format";
import { DatePicker } from "@/components/ui/DatePicker";
import { Counter } from "@/components/ui/Counter";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Base = Omit<CartItem, "date" | "seats" | "infants">;

/**
 * Caixa de reserva: calendário com as vagas do DunasTour, quantidade e dois caminhos — guardar na
 * "Minha viagem" (pra juntar com outros) ou perguntar direto no WhatsApp.
 */
export function ReservePanel({ base, phone }: { base: Base; phone: string }) {
  const { items, upsert, setOpen } = useCart();
  const current = items.find((i) => itemKey(i) === itemKey(base));
  const [date, setDate] = useState(current?.date ?? "");
  const [seats, setSeats] = useState(current?.seats ?? 1);
  const [infants, setInfants] = useState(current?.infants ?? 0);
  const rules = useDayRules({ kind: base.kind, id: base.id, trek: base.trek });
  const vehicle = !!base.saleUnit && base.saleUnit !== "PESSOA";
  const error = rules.dateError(date, seats);
  const ok = !!date && !error;
  const total = base.unitPrice * seats;
  const clash =
    date &&
    base.kind === "tour" &&
    isFullDayTour(base) &&
    items.some((i) => itemKey(i) !== itemKey(base) && i.kind === "tour" && i.date === date && isFullDayTour(i));

  const message = [
    `Olá, Levada Turismo! Quero o passeio *${base.title}*.`,
    "",
    `*Data:* ${date ? longDate(date) : ""}`,
    `*${vehicle ? "Quantidade" : "Pessoas"}:* ${unitCount(base.saleUnit, seats)}`,
    ...(base.allowInfants && infants ? [`*Crianças de colo:* ${infants}`] : []),
    `*Total:* ${money(total)}`,
    "",
    "Tem vaga?",
  ].join("\n");

  return (
    <div id="reservar" className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-40px_rgba(6,27,53,.5)] ring-1 ring-ocean-900/10">
      <div className="bg-gradient-to-br from-ocean-600 to-ocean-800 px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-200">A partir de</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold">{money(base.unitPrice)}</span>
          {base.unitPrice < base.fullPrice && <span className="text-white/50 line-through">{money(base.fullPrice)}</span>}
        </p>
        <p className="text-sm text-white/70">{perUnit(base.saleUnit)} · pagamento só depois da confirmação</p>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="min-h-80">
          {rules.loading ? (
            <div className="grid h-80 place-items-center text-ocean-300">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <DatePicker key={rules.firstOpenDate ?? "cal"} value={date} onChange={setDate} minDate={todayISO()} dayInfo={rules.dayInfo} initialMonth={rules.firstOpenDate} />
          )}
        </div>

        <p className={cn("flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold", error ? "bg-red-50 text-red-700" : "bg-ocean-100/70 text-ocean-800")}>
          <CalendarCheck size={16} className="shrink-0" />
          {error ?? (date ? longDate(date) : "Escolha o dia no calendário")}
        </p>
        {clash && (
          <p className="flex gap-2 rounded-xl bg-sun-400/15 p-3 text-xs text-ocean-950/75">
            <TriangleAlert size={15} className="mt-0.5 shrink-0 text-sun-500" />
            Você já tem um passeio de dia inteiro nessa data — os dois dificilmente cabem no mesmo dia.
          </p>
        )}

        <div className="divide-y divide-ocean-900/10 rounded-2xl bg-sand-50 px-4 ring-1 ring-ocean-900/10">
          <Counter
            label={vehicle ? unitLabel(base.saleUnit, 2).replace(/^./, (c) => c.toUpperCase()) : "Pessoas"}
            hint={vehicle ? (base.vehicleMaxOccupancy ? `Até ${base.vehicleMaxOccupancy} pessoas em cada` : perUnit(base.saleUnit)) : "A partir de 2 anos"}
            value={seats}
            onChange={setSeats}
            min={1}
            max={30}
          />
          {base.allowInfants && <Counter label="Crianças de colo" hint="Até 2 anos · não pagam" value={infants} onChange={setInfants} max={6} />}
        </div>

        <div className="flex items-end justify-between">
          <span className="text-sm text-ocean-950/55">
            {unitCount(base.saleUnit, seats)} × {money(base.unitPrice)}
          </span>
          <span className="font-display text-3xl font-semibold">{money(total)}</span>
        </div>

        <button
          type="button"
          disabled={!ok}
          onClick={() => {
            upsert({ ...base, date, seats, infants: base.allowInfants ? infants : 0 });
            setOpen(true);
          }}
          className="w-full rounded-full bg-ocean-600 py-4 font-bold text-white shadow-lg shadow-ocean-600/25 transition hover:bg-ocean-700 disabled:opacity-40 disabled:shadow-none"
        >
          {current ? "Atualizar na minha viagem" : "Adicionar à minha viagem"}
        </button>
        <a
          href={ok ? whatsappUrl(phone, message) : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!ok}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3.5 font-bold text-[#128C4B] transition hover:bg-[#25D366] hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-40"
        >
          <WhatsAppIcon size={18} /> Perguntar no WhatsApp
        </a>
      </div>
    </div>
  );
}
