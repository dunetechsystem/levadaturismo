import Image from "next/image";
import { site } from "@/config/site";
import { Heading } from "@/components/ui/Heading";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * A história do nome: o desenho mostra a "levada" — a vala que leva a água do rio até a roça — e o
 * texto conta a família. Os números vêm do config.
 */
export function StoryLevada() {
  return (
    <section id="sobre" className="bg-sand-100 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <FadeIn x={-30} y={0} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
            <Image src="/fotos/lagoa-azul-por-do-sol.jpeg" alt="Pôr do sol na Lagoa Azul" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <figure className="absolute -bottom-8 -right-2 w-64 rounded-[1.5rem] bg-white p-4 shadow-2xl sm:-right-8">
            <svg viewBox="0 0 240 110" className="w-full" aria-hidden>
              <path d="M0 22 C 60 6 120 38 240 18 V0 H0Z" fill="var(--color-ocean-500)" />
              <text x="8" y="14" fontSize="9" fontWeight="700" fill="#fff">RIO PREGUIÇAS</text>
              <path d="M70 26 C 74 50 66 70 80 96" stroke="var(--color-ocean-400)" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="2 10">
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
              </path>
              <path d="M150 24 C 146 52 160 70 150 96" stroke="var(--color-ocean-400)" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="2 10">
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
              </path>
              {[60, 84, 140, 164].map((x) => (
                <g key={x} transform={`translate(${x} 92)`}>
                  <path d="M0 10 V0 M0 4 L-5 -2 M0 4 L5 -2" stroke="#3f8f4f" strokeWidth="2" strokeLinecap="round" />
                </g>
              ))}
            </svg>
            <figcaption className="mt-2 text-xs leading-snug text-ocean-950/60">
              <strong className="text-ocean-900">Levada:</strong> a vala que leva a água do rio até a plantação.
            </figcaption>
          </figure>
        </FadeIn>

        <div>
          <Heading
            kicker="Nossa história"
            title={
              <>
                Onde há água, <em>há vida</em>
              </>
            }
          />
          <FadeIn delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-ocean-950/70">
            {site.story.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </FadeIn>
          <dl className="mt-10 grid grid-cols-3 gap-4">
            {site.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-ocean-500 pl-4">
                <dt className="text-sm text-ocean-950/55">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold text-ocean-800">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
