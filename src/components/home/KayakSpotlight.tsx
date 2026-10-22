import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { site } from "@/config/site";
import type { TourDetail } from "@/lib/dunastour/types";
import { duration, money, tourUnitPrice, whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";
import { Waves } from "@/components/ui/Waves";

/** Linhas "08:30 - Saída do hotel" da descrição do DunasTour viram a linha do tempo. */
function timeline(description: string) {
  return description
    .split("\n")
    .map((l) => l.trim().match(/^(\d{1,2}[:h]\d{2})\s*[-–—]\s*(.+)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => ({ time: m[1].replace("h", ":"), text: m[2].replace(/descanço/i, "descanso") }));
}

/**
 * Destaque do caiaque: o Shorts do YouTube num quadro vertical e, ao lado, o roteiro por horário,
 * fotos e o preço que vêm do passeio no DunasTour.
 */
export function KayakSpotlight({ tour, phone }: { tour: TourDetail | null; phone: string }) {
  const k = site.kayak;
  const steps = tour ? timeline(tour.description) : [];
  return (
    <section id="caiaque" className="relative mt-16 bg-gradient-to-br from-ocean-800 via-ocean-900 to-ocean-950 text-white">
      <Waves fill="var(--color-ocean-800)" flip className="absolute -top-px left-0 [&_path:last-child]:fill-sand-50" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-16">
        <FadeIn x={-30} y={0} className="mx-auto">
          <div className="relative rounded-[2.6rem] bg-ocean-950 p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/15">
            {k.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${k.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                title="Descida de caiaque pelo Rio Preguiças"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-[9/16] w-[17rem] rounded-[2rem] border-0 bg-black sm:w-[19rem]"
              />
            ) : (
              <div className="relative aspect-[9/16] w-[17rem] overflow-hidden rounded-[2rem] sm:w-[19rem]">
                <Image src={k.poster} alt="Descida de caiaque pelo Rio Preguiças" fill sizes="304px" className="object-cover" />
              </div>
            )}
            <span className="absolute -right-4 -top-4 rotate-6 rounded-full bg-sun-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-ocean-950 shadow-lg">
              Destaque da casa
            </span>
          </div>
        </FadeIn>

        <div className="on-dark">
          <FadeIn>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-ocean-300">
              <span className="h-px w-8 bg-ocean-300/60" /> Rio Preguiças
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[1.02] font-semibold sm:text-6xl">
              Descer o rio <em>de caiaque</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{k.text}</p>
          </FadeIn>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {steps.length > 0 && (
              <FadeIn delay={0.05}>
                <ol className="space-y-3 border-l border-white/15 pl-5">
                  {steps.map((s, i) => (
                    <li key={i} className="relative text-sm">
                      <span className="absolute -left-[25px] top-1.5 size-2 rounded-full bg-ocean-300" />
                      <span className="mr-2 font-bold tabular-nums text-ocean-200">{s.time}</span>
                      <span className="text-white/80">{s.text}</span>
                    </li>
                  ))}
                </ol>
              </FadeIn>
            )}
            <FadeIn delay={0.1}>
              <ul className="space-y-2.5 text-sm">
                {k.facts.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/85">
                    <Check size={16} className="text-ocean-300" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {k.photos.map((src) => (
                  <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image src={src} alt="Caiaque no Rio Preguiças" fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
            {tour && (
              <div className="mr-2">
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">A partir de</p>
                <p className="font-display text-3xl font-semibold text-sun-400">
                  {money(tourUnitPrice(tour))} <span className="text-base font-normal text-white/60">por pessoa</span>
                </p>
                {tour.durationMinutes > 0 && (
                  <p className="flex items-center gap-1.5 text-xs text-white/55">
                    <Clock size={12} /> {duration(tour.durationMinutes)}
                  </p>
                )}
              </div>
            )}
            {tour ? (
              <Link href={`/passeios/${tour.id}#reservar`} className="group flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-ocean-900 transition hover:bg-ocean-100">
                Escolher a data <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
            ) : null}
            <a
              href={whatsappUrl(phone, "Olá, Levada Turismo! Quero fazer a descida de caiaque pelo Rio Preguiças 🛶")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-white/25 px-6 py-3.5 font-bold transition hover:border-[#25D366] hover:bg-[#25D366]"
            >
              <WhatsAppIcon size={18} /> Tirar dúvidas
            </a>
          </FadeIn>
        </div>
      </div>
      <Waves fill="var(--color-sand-50)" />
    </section>
  );
}
