import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mountain } from "lucide-react";
import type { PackageCard, TourCard } from "@/lib/dunastour/types";
import { displayTitle, duration, money, perUnit, tourUnitPrice } from "@/lib/format";
import { tourKind, TOUR_KINDS } from "@/lib/tour-kind";
import { cn } from "@/lib/cn";

/**
 * Passeio como um bilhete de barco: foto em cima, picote no meio e o canhoto com o preço embaixo.
 * `wide` deita o bilhete (foto à esquerda) pro destaque do quadro.
 */
export function TicketCard({ tour, priority = false, wide = false }: { tour: TourCard; priority?: boolean; wide?: boolean }) {
  const price = tourUnitPrice(tour);
  const kind = TOUR_KINDS.find((k) => k.id === tourKind(tour))!;
  return (
    <Link
      href={`/passeios/${tour.slug ?? tour.id}`}
      className={cn(
        "group flex h-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_50px_-30px_rgba(6,27,53,.45)] ring-1 ring-ocean-900/8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(8,115,187,.55)]",
        wide ? "flex-col md:flex-row" : "flex-col"
      )}
    >
      <div className={cn("relative overflow-hidden bg-ocean-100", wide ? "aspect-[4/3] md:aspect-auto md:w-3/5" : "aspect-[4/3]")}>
        {tour.coverImageUrl ? (
          <Image
            src={tour.coverImageUrl}
            alt={displayTitle(tour.title)}
            fill
            priority={priority}
            sizes={wide ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-300 to-ocean-700" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ocean-800 backdrop-blur">{kind.label}</span>
        {!!tour.discountPercent && (
          <span className="absolute right-4 top-4 rounded-full bg-sun-400 px-3 py-1 text-xs font-extrabold text-ocean-950">-{tour.discountPercent}%</span>
        )}
      </div>

      <div className={cn("relative flex flex-1 flex-col", wide && "md:w-2/5")}>
        <div className="flex-1 p-5 sm:p-6">
          <h3 className={cn("font-display font-semibold leading-tight text-ocean-950 transition group-hover:text-ocean-600", wide ? "text-3xl sm:text-4xl" : "text-2xl")}>
            {displayTitle(tour.title)}
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ocean-950/55">
            {tour.durationMinutes > 0 && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {duration(tour.durationMinutes)}
              </span>
            )}
            {tour.riskType && (
              <span className="flex items-center gap-1.5">
                <Mountain size={14} /> Aventura
              </span>
            )}
          </div>
        </div>
        {/* picote */}
        <div className="relative mx-5 border-t-2 border-dashed border-ocean-900/10 sm:mx-6">
          <span className="absolute -left-9 -top-[11px] size-5 rounded-full bg-sand-50 sm:-left-10" />
          <span className="absolute -right-9 -top-[11px] size-5 rounded-full bg-sand-50 sm:-right-10" />
        </div>
        <div className="flex items-center justify-between gap-3 p-5 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ocean-950/40">A partir de</p>
            <p className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-ocean-700">{money(price)}</span>
              {price < tour.basePrice && <span className="text-sm text-ocean-950/35 line-through">{money(tour.basePrice)}</span>}
            </p>
            <p className="text-xs text-ocean-950/45">{perUnit(tour.saleUnit)}</p>
          </div>
          <span className="grid size-12 place-items-center rounded-full bg-ocean-100 text-ocean-700 transition group-hover:rotate-45 group-hover:bg-ocean-600 group-hover:text-white">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Pacote cadastrado no DunasTour (combo de passeios com desconto). */
export function ComboCard({ pkg }: { pkg: PackageCard }) {
  return (
    <Link href={`/pacotes/${pkg.slug ?? pkg.id}`} className="group relative flex min-h-72 overflow-hidden rounded-[1.75rem] bg-ocean-900 text-white">
      {pkg.coverImageUrl && (
        <Image src={pkg.coverImageUrl} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-60 transition duration-700 group-hover:scale-105" />
      )}
      <div className="relative mt-auto w-full bg-gradient-to-t from-ocean-950 via-ocean-950/70 to-transparent p-6 pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-300">Combo · {pkg.toursCount} passeios</p>
        <h3 className="mt-2 font-display text-3xl font-semibold">{displayTitle(pkg.title)}</h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-2xl text-sun-400">{money(pkg.finalPrice)}</span>
          {pkg.discountPercent > 0 && <span className="text-sm text-white/50 line-through">{money(pkg.originalPrice)}</span>}
        </p>
      </div>
    </Link>
  );
}
