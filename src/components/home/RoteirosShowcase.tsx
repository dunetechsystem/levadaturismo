import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roteiros } from "@/config/roteiros";
import { Heading } from "@/components/ui/Heading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Waves } from "@/components/ui/Waves";

/** Roteiros de vários dias em fundo marinho: cada um mostra a rota como uma linha de paradas. */
export function RoteirosShowcase() {
  return (
    <section className="relative bg-ocean-950 text-white">
      <Waves fill="var(--color-ocean-950)" flip className="absolute -top-px left-0 [&_path:last-child]:fill-sand-50" />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            dark
            kicker="Roteiros completos"
            title={
              <>
                Da chegada em São Luís <em>à última lagoa</em>
              </>
            }
            lead="Pacotes de 6 a 9 dias com hospedagem, transfer e passeios encaixados na ordem certa. A gente monta o orçamento pra sua data."
          />
          <Link href="/roteiros" className="group flex shrink-0 items-center gap-2 font-bold text-ocean-300 hover:text-white">
            Todos os roteiros <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {roteiros.map((r, i) => (
            <FadeIn key={r.slug} delay={(i % 2) * 0.08}>
              <Link href={`/roteiros/${r.slug}`} className="group flex h-full gap-5 rounded-[2rem] bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="relative w-32 shrink-0 overflow-hidden rounded-[1.4rem] sm:w-40">
                  <Image src={r.image} alt="" fill sizes="160px" className="object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute left-2 top-2 rounded-full bg-sun-400 px-2.5 py-1 text-xs font-extrabold text-ocean-950">{r.days.length} dias</span>
                </div>
                <div className="min-w-0 py-2 pr-2">
                  <h3 className="font-display text-2xl font-semibold leading-tight">{r.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{r.summary}</p>
                  <ol className="mt-4 flex flex-wrap items-center gap-y-2 text-xs font-semibold text-ocean-200">
                    {r.stops.map((s, n) => (
                      <li key={s} className="flex items-center">
                        {n > 0 && <span className="mx-1.5 h-px w-4 bg-ocean-300/40" />}
                        <span className="rounded-full bg-ocean-500/20 px-2.5 py-1">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
      <Waves fill="var(--color-sand-50)" />
    </section>
  );
}
