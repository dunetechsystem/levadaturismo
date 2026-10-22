"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TourCard } from "@/lib/dunastour/types";
import { TOUR_KINDS, tourKind, type TourKind } from "@/lib/tour-kind";
import { TicketCard } from "@/components/tour/TicketCard";
import { cn } from "@/lib/cn";

/** Quadro de passeios com abas por tipo; o primeiro da aba aparece deitado, em destaque. */
export function TourBoard({ tours }: { tours: TourCard[] }) {
  const kinds = TOUR_KINDS.filter((k) => tours.some((t) => tourKind(t) === k.id));
  const [tab, setTab] = useState<TourKind | "todos">("todos");
  const list = tab === "todos" ? tours : tours.filter((t) => tourKind(t) === tab);
  const [first, ...rest] = list;

  return (
    <div>
      {kinds.length > 1 && (
        <div role="tablist" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4">
          {[{ id: "todos" as const, label: "Todos" }, ...kinds].map((k) => {
            const n = k.id === "todos" ? tours.length : tours.filter((t) => tourKind(t) === k.id).length;
            return (
              <button
                key={k.id}
                role="tab"
                aria-selected={tab === k.id}
                type="button"
                onClick={() => setTab(k.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ring-1 transition",
                  tab === k.id ? "bg-ocean-950 text-white ring-ocean-950" : "bg-white text-ocean-900 ring-ocean-900/15 hover:ring-ocean-500"
                )}
              >
                {k.label}
                <span className={cn("rounded-full px-2 text-xs", tab === k.id ? "bg-white/15" : "bg-ocean-100")}>{n}</span>
              </button>
            );
          })}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {first && (
            <div className="sm:col-span-2 lg:col-span-3">
              <TicketCard tour={first} wide priority />
            </div>
          )}
          {rest.map((t) => (
            <TicketCard key={t.id} tour={t} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
