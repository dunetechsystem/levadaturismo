"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DayInfo } from "@/lib/availability";
import { parseISODate, toISODate } from "@/lib/format";
import { cn } from "@/lib/cn";

const WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];

/**
 * Mês em grade, semana começando no domingo. `dayInfo` (regras do DunasTour) pinta os dias lotados
 * ou sem saída e mostra "x vagas" quando a agência controla as vagas.
 */
export function DatePicker({
  value,
  onChange,
  minDate,
  dayInfo,
  initialMonth,
}: {
  value: string;
  onChange: (iso: string) => void;
  minDate: string;
  dayInfo?: (iso: string) => DayInfo | undefined;
  initialMonth?: string;
}) {
  const start = parseISODate(value || initialMonth || minDate);
  const [month, setMonth] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const min = parseISODate(minDate);
  const canGoBack = month > new Date(min.getFullYear(), min.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const offset = month.getDay();
  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Mês anterior" className="grid size-9 place-items-center rounded-full hover:bg-ocean-100 disabled:opacity-25">
          <ChevronLeft size={18} />
        </button>
        <p className="font-display text-lg font-semibold first-letter:uppercase">{month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</p>
        <button type="button" onClick={() => shift(1)} aria-label="Próximo mês" className="grid size-9 place-items-center rounded-full hover:bg-ocean-100">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEK.map((d, i) => (
          <span key={i} className="pb-1 text-[11px] font-bold text-ocean-950/40">
            {d}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`o${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const iso = toISODate(new Date(month.getFullYear(), month.getMonth(), i + 1));
          const info = dayInfo?.(iso);
          const past = iso < minDate;
          const blocked = past || info?.status === "closed" || info?.status === "full";
          const selected = iso === value;
          return (
            <button
              key={iso}
              type="button"
              disabled={blocked}
              onClick={() => onChange(iso)}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition",
                selected ? "bg-ocean-600 text-white shadow-md shadow-ocean-600/30" : "hover:bg-ocean-100",
                blocked && "cursor-not-allowed text-ocean-950/25 line-through hover:bg-transparent"
              )}
            >
              {i + 1}
              {info?.status === "open" && info.left != null && info.left <= 8 && (
                <span className={cn("text-[9px] font-bold leading-none", selected ? "text-white/80" : "text-sun-500")}>{info.left} vg</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
