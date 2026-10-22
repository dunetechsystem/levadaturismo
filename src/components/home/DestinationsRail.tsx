import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import type { TourCard } from "@/lib/dunastour/types";
import { displayTitle } from "@/lib/format";
import { Heading } from "@/components/ui/Heading";

/** Destinos da região em trilho horizontal; cada um lista os passeios do DunasTour que passam por lá. */
export function DestinationsRail({ tours }: { tours: TourCard[] }) {
  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Heading
          kicker="Destinos"
          title={
            <>
              Cinco lugares, <em>cinco jeitos</em> de ver os Lençóis
            </>
          }
          lead="Dunas e lagoas, vilas de pescadores, farol, rio e comunidade tradicional. Escolha por onde começar."
        />
      </div>
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 xl:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {site.destinations.map((d, i) => {
          const related = tours.filter((t) => d.match.test(t.title)).slice(0, 3);
          return (
            <article key={d.id} className="group relative flex h-[30rem] w-[19rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[2rem] bg-ocean-900 sm:w-[22rem]">
              <Image src={d.image} alt={d.name} fill sizes="352px" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/40 to-transparent" />
              <span className="absolute right-5 top-5 font-display text-5xl font-semibold text-white/30">0{i + 1}</span>
              <div className="relative p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-300">{d.kicker}</p>
                <h3 className="mt-1 font-display text-3xl font-semibold">{d.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{d.text}</p>
                {related.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {related.map((t) => (
                      <Link key={t.id} href={`/passeios/${t.id}`} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white hover:text-ocean-900">
                        {displayTitle(t.title)} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
