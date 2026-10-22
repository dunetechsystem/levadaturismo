import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, CarFront, Check } from "lucide-react";
import { site } from "@/config/site";
import { Heading } from "@/components/ui/Heading";
import { FadeIn } from "@/components/ui/FadeIn";

/** Transfer e hospedagem — o que vai além dos passeios. Os formulários ficam nas páginas de cada um. */
export function ServicesDuo() {
  const route = site.transfer.routes[0];
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Heading
        center
        kicker="Além dos passeios"
        title={
          <>
            Do avião até a <em>rede da pousada</em>
          </>
        }
        lead="Junte transfer e hospedagem aos passeios na sua viagem e mande tudo de uma vez pra gente."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <FadeIn>
          <Link href="/transfer" className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-ocean-900 p-7 text-white">
            <Image src={site.transfer.images[0]} alt="Carro do transfer da Levada" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/50 to-transparent" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
                <CarFront size={14} /> Transfer
              </span>
              <div className="mt-5 flex items-center gap-3 font-display text-2xl font-semibold sm:text-3xl">
                <span>{route.from}</span>
                <span className="relative h-px flex-1 bg-white/40">
                  <span className="absolute -top-1 right-0 size-2 rounded-full bg-sun-400" />
                </span>
                <span>{route.to}</span>
              </div>
              <p className="mt-1 text-sm text-white/60">
                {route.km} km · {route.time} de estrada asfaltada
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-white/85">
                {site.transfer.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={14} className="text-ocean-300" /> {f}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-ocean-200 group-hover:text-white">
                Pedir transfer <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-1">
            <span className="grid size-10 place-items-center rounded-full bg-ocean-100 text-ocean-700">
              <BedDouble size={18} />
            </span>
            <p className="font-display text-2xl font-semibold">Hospedagem com quem conhece</p>
          </div>
          {site.lodging.map((l) => (
            <Link key={l.id} href={`/hospedagem#${l.id}`} className="group flex items-center gap-4 rounded-[1.5rem] bg-white p-3 ring-1 ring-ocean-900/10 transition hover:ring-ocean-500">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
                <Image src={l.image} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold">{l.name}</p>
                <p className="line-clamp-2 text-sm text-ocean-950/60">{l.text}</p>
              </div>
              <ArrowRight size={18} className="mr-2 shrink-0 text-ocean-400 transition group-hover:translate-x-1 group-hover:text-ocean-600" />
            </Link>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
