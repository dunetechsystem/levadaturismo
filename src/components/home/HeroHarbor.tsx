import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, ShieldCheck, Sun } from "lucide-react";
import { site } from "@/config/site";
import { Waves } from "@/components/ui/Waves";
import { Porthole } from "./Porthole";

/**
 * Abertura: texto à esquerda e, à direita, uma escotilha redonda (o selo da marca) com as fotos dos
 * passeios passando. Cartões flutuantes trazem o nível das lagoas e a temperatura de hoje.
 */
export function HeroHarbor({
  images,
  tourCount,
  lagoonLevel,
  temperature,
  cadasturUrl,
}: {
  images: string[];
  tourCount: number;
  lagoonLevel: number | null;
  temperature: number | null;
  cadasturUrl: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ocean-100 via-sand-50 to-sand-100 pt-28 sm:pt-32">
      <div aria-hidden className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-ocean-200/50 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ocean-700 ring-1 ring-ocean-900/10 backdrop-blur">
            <span className="size-2 rounded-full bg-ocean-500" /> {site.city}
          </p>
          <h1 className="mt-6 text-balance font-display text-5xl leading-[0.98] font-semibold text-ocean-950 sm:text-6xl lg:text-7xl">
            Levando vidas aos <em className="text-ocean-500">Lençóis</em> desde {site.since}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ocean-950/65">
            Uma família de Barreirinhas cuidando da sua viagem inteira: os passeios pelas dunas e lagoas, o transfer desde São Luís e a pousada certa
            pra descansar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/passeios" className="group flex items-center gap-2 rounded-full bg-ocean-600 px-7 py-4 font-bold text-white shadow-xl shadow-ocean-600/30 transition hover:bg-ocean-700">
              Ver os {tourCount > 0 ? tourCount : ""} passeios <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="/roteiros" className="rounded-full bg-white px-7 py-4 font-bold text-ocean-800 ring-1 ring-ocean-900/15 transition hover:ring-ocean-500">
              Roteiros de vários dias
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-ocean-950/50">Na estrada desde</dt>
              <dd className="font-display text-2xl font-semibold text-ocean-800">{site.since}</dd>
            </div>
            <div>
              <dt className="text-ocean-950/50">Atendimento</dt>
              <dd className="font-display text-2xl font-semibold text-ocean-800">Família</dd>
            </div>
            {cadasturUrl && (
              <a href={cadasturUrl} target="_blank" rel="noreferrer" className="group">
                <dt className="text-ocean-950/50">Registro oficial</dt>
                <dd className="flex items-center gap-1.5 font-display text-2xl font-semibold text-ocean-800 group-hover:text-ocean-500">
                  <ShieldCheck size={20} /> Cadastur
                </dd>
              </a>
            )}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <Porthole images={images} />
          <Image
            src="/brand/levada-selo.png"
            alt=""
            width={160}
            height={160}
            className="absolute -left-2 top-4 size-24 animate-bob rounded-full bg-white p-1 shadow-xl sm:size-28"
          />
          {lagoonLevel != null && (
            <div className="absolute -bottom-2 left-0 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-xl ring-1 ring-ocean-900/10 backdrop-blur sm:left-4">
              <span className="relative grid size-12 place-items-center overflow-hidden rounded-xl bg-ocean-100 text-ocean-700">
                <span className="absolute inset-x-0 bottom-0 bg-ocean-400/50" style={{ height: `${lagoonLevel}%` }} />
                <Droplets size={20} className="relative" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-ocean-950/45">Lagoas hoje</span>
                <span className="font-display text-xl font-semibold">{lagoonLevel}% cheias</span>
              </span>
            </div>
          )}
          {temperature != null && (
            <div className="absolute right-0 top-1/2 flex items-center gap-2 rounded-2xl bg-ocean-950 px-4 py-3 text-white shadow-xl sm:-right-4">
              <Sun size={20} className="text-sun-400" />
              <span className="font-display text-xl font-semibold">{Math.round(temperature)}°C</span>
              <span className="text-xs text-white/60">em Barreirinhas</span>
            </div>
          )}
        </div>
      </div>
      <Waves fill="var(--color-sand-50)" />
    </section>
  );
}
