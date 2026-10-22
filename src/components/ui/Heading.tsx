import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FadeIn } from "./FadeIn";

/** Título de seção: numeração náutica + kicker, título em Fraunces e um parágrafo opcional. */
export function Heading({
  kicker,
  title,
  lead,
  center = false,
  dark = false,
  className,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <FadeIn className={cn("max-w-2xl", center && "mx-auto text-center", dark && "on-dark", className)}>
      <p className={cn("flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]", center && "justify-center", dark ? "text-ocean-300" : "text-ocean-600")}>
        <span className={cn("h-px w-8", dark ? "bg-ocean-300/60" : "bg-ocean-500/50")} />
        {kicker}
      </p>
      <h2 className={cn("mt-4 text-balance font-display text-4xl leading-[1.05] font-semibold sm:text-5xl", dark ? "text-white" : "text-ocean-950")}>{title}</h2>
      {lead && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-ocean-950/65")}>{lead}</p>}
    </FadeIn>
  );
}
