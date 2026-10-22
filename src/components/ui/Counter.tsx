"use client";

import { Minus, Plus } from "lucide-react";

/** Linha "rótulo · − n +" dos formulários. */
export function Counter({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  const btn =
    "grid size-9 place-items-center rounded-full border border-ocean-900/15 text-ocean-800 transition hover:border-ocean-500 hover:bg-ocean-100 disabled:pointer-events-none disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-semibold text-ocean-950">{label}</p>
        {hint && <p className="text-xs text-ocean-950/50">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Menos ${label}`} className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus size={16} />
        </button>
        <span className="w-6 text-center text-lg font-bold tabular-nums">{value}</span>
        <button type="button" aria-label={`Mais ${label}`} className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
