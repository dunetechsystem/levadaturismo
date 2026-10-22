import Image from "next/image";
import { site } from "@/config/site";
import type { LagoonStatus } from "@/lib/dunastour/types";
import { Heading } from "@/components/ui/Heading";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/cn";
import { LevelCount, WaterLevel } from "./WaterLevel";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/**
 * "Quando ir": a régua dos 12 meses com o nível das lagoas (DunasTour, quando disponível) e as três
 * estações do site antigo, cada uma com a "maré" enchendo o cartão até o nível típico.
 */
export function SeasonsTide({ lagoons }: { lagoons: LagoonStatus | null }) {
  const levels = lagoons?.monthLevels?.length === 12 ? lagoons.monthLevels : null;
  const now = new Date().getMonth();
  return (
    <section id="quando-ir" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <Heading
          kicker="Quando ir"
          title={
            <>
              Os Lençóis valem <em>o ano inteiro</em>
            </>
          }
          lead="Com média de 33 °C, o parque muda de cara a cada estação. Veja como as lagoas costumam estar em cada mês."
        />
        {levels && (
          <FadeIn className="rounded-[2rem] bg-white p-6 ring-1 ring-ocean-900/10">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Nível das lagoas</p>
              {lagoons && <p className="text-sm text-ocean-950/60">Hoje: <strong className="text-ocean-800">{lagoons.level}%</strong></p>}
            </div>
            <div className="mt-5 flex h-40 items-end gap-1.5 sm:gap-2" role="img" aria-label="Nível médio das lagoas por mês">
              {levels.map((lv, m) => (
                <div key={m} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className={cn("text-[10px] font-bold tabular-nums", m === now ? "text-ocean-700" : "text-ocean-950/35")}>{Math.round(lv)}</span>
                  <div
                    className={cn("w-full rounded-t-lg transition-all", m === now ? "bg-ocean-600" : "bg-gradient-to-t from-ocean-300 to-ocean-200")}
                    style={{ height: `${Math.max(4, lv)}%` }}
                  />
                  <span className={cn("text-xs font-bold", m === now ? "text-ocean-700" : "text-ocean-950/40")}>{MONTHS[m]}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {site.seasons.map((s, i) => {
          const current = s.months.includes(now + 1);
          return (
            <FadeIn key={s.id} delay={i * 0.08}>
              <article className={cn("relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1", current ? "ring-2 ring-ocean-500" : "ring-ocean-900/10")}>
                <div className="relative h-48 shrink-0">
                  <Image src={s.image} alt={s.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  {current && <span className="absolute left-4 top-4 rounded-full bg-ocean-600 px-3 py-1 text-xs font-bold text-white">Estamos aqui</span>}
                </div>
                <div className="relative flex-1 p-6">
                  {/* maré: a água sobe até o nível típico da estação */}
                  <WaterLevel level={s.level} delay={i * 0.25} />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">{s.period}</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold">{s.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ocean-950/70">{s.text}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-ocean-900/10 pt-4 text-sm">
                      <span className="font-semibold text-ocean-800">{s.tip}</span>
                      <span className="font-display text-2xl font-semibold text-ocean-700">
                        <LevelCount level={s.level} delay={i * 0.25} />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
