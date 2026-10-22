import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Backpack, BadgeCheck, CarFront, Check, Clock, ShieldAlert, Sunrise, Users } from "lucide-react";
import { site } from "@/config/site";
import { getAgency, getTour, getTours } from "@/lib/dunastour/server";
import { tourBase } from "@/lib/booking-base";
import { agencyInfo } from "@/lib/agency-info";
import { displayTitle, duration, unitLabel } from "@/lib/format";
import { PageTop } from "@/components/layout/PageTop";
import { PhotoStrip } from "@/components/tour/PhotoStrip";
import { ReservePanel } from "@/components/tour/ReservePanel";
import { Checklist, Prose } from "@/components/tour/TextBlocks";
import { TicketCard } from "@/components/tour/TicketCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getTours()).map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/passeios/[id]">): Promise<Metadata> {
  const tour = await getTour((await params).id);
  if (!tour) return { title: "Passeio não encontrado" };
  const title = displayTitle(tour.title);
  return { title, description: tour.description.replace(/\s+/g, " ").slice(0, 160), openGraph: { title, images: tour.mediaUrls.slice(0, 1) } };
}

export default async function TourPage({ params }: PageProps<"/passeios/[id]">) {
  const { id } = await params;
  const [tour, tours, agency] = await Promise.all([getTour(id), getTours(), getAgency()]);
  if (!tour) notFound();
  const title = displayTitle(tour.title);
  const cover = tour.mediaUrls[0] ?? tours.find((t) => t.id === id)?.coverImageUrl ?? null;
  const media = tour.mediaUrls.length ? tour.mediaUrls : cover ? [cover] : [];
  const others = tours.filter((t) => t.id !== id).slice(0, 3);
  const vehicle = tour.saleUnit && tour.saleUnit !== "PESSOA";
  const destination = site.destinations.find((d) => d.match.test(tour.title));

  const facts = [
    tour.durationMinutes > 0 && { icon: Clock, label: "Duração", value: duration(tour.durationMinutes) },
    tour.defaultPickupTime && { icon: Sunrise, label: "Saída", value: tour.defaultPickupTime.slice(0, 5).replace(":", "h") },
    { icon: CarFront, label: "Embarque", value: "Na sua hospedagem" },
    vehicle
      ? { icon: Users, label: "Vendido por", value: `${unitLabel(tour.saleUnit, 1)}${tour.vehicleMaxOccupancy ? ` · até ${tour.vehicleMaxOccupancy} pessoas` : ""}` }
      : { icon: Users, label: "Preço", value: "Por pessoa" },
    tour.instantConfirmation && { icon: BadgeCheck, label: "Confirmação", value: "Imediata" },
  ].filter(Boolean) as { icon: typeof Clock; label: string; value: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: tour.description.slice(0, 500),
    image: tour.mediaUrls.slice(0, 3),
    provider: { "@type": "TravelAgency", name: site.name },
    offers: { "@type": "Offer", price: tour.basePrice, priceCurrency: "BRL", availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageTop
        image={cover}
        kicker={destination ? `${destination.name} · ${destination.kicker}` : "Lençóis Maranhenses"}
        title={title}
        crumbs={[
          { href: "/", label: "Início" },
          { href: "/passeios", label: "Passeios" },
        ]}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1fr_400px]">
        <div className="min-w-0">
          <PhotoStrip urls={media} title={title} />

          <FadeIn className="mt-10 flex flex-wrap gap-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 ring-1 ring-ocean-900/10">
                <span className="grid size-10 place-items-center rounded-xl bg-ocean-100 text-ocean-700">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-ocean-950/45">{label}</span>
                  <span className="font-semibold first-letter:uppercase">{value}</span>
                </span>
              </div>
            ))}
          </FadeIn>

          {tour.description.trim() && (
            <FadeIn className="mt-12">
              <h2 className="mb-5 font-display text-3xl font-semibold">Como é o passeio</h2>
              <Prose text={tour.description} />
            </FadeIn>
          )}

          {(tour.included || tour.whatToBring) && (
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {tour.included && (
                <FadeIn className="rounded-[2rem] bg-white p-6 ring-1 ring-ocean-900/10">
                  <h3 className="mb-4 font-display text-2xl font-semibold">Está incluído</h3>
                  <Checklist text={tour.included} icon={<Check size={18} className="text-ocean-500" />} />
                </FadeIn>
              )}
              {tour.whatToBring && (
                <FadeIn className="rounded-[2rem] bg-sand-100 p-6">
                  <h3 className="mb-4 font-display text-2xl font-semibold">Leve na mochila</h3>
                  <Checklist text={tour.whatToBring} icon={<Backpack size={18} className="text-sail-500" />} />
                </FadeIn>
              )}
            </div>
          )}

          {tour.riskType && (
            <div className="mt-8 flex gap-3 rounded-2xl bg-sun-400/15 p-5 text-sm text-ocean-950/80">
              <ShieldAlert className="shrink-0 text-sun-500" />
              <p>
                Atividade de aventura: antes do passeio você lê e assina o <strong>Termo de Responsabilidade e Ciência de Riscos</strong>. Não leva crianças de colo.
              </p>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ReservePanel base={tourBase(tour, cover)} phone={agencyInfo(agency).phone} />
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <h2 className="mb-8 font-display text-4xl font-semibold">
            Combina com <em>esses aqui</em>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((t) => (
              <TicketCard key={t.id} tour={t} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
