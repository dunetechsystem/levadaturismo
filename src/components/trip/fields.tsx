import type { ReactNode } from "react";

/** Campo rotulado dos formulários de transfer e hospedagem. */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ocean-950/50">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-ocean-900/15 bg-white px-4 py-3 text-ocean-950 outline-none transition focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/15";
