import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { getAgency, getLagoons, getPackages, getReviews, getTour, getTours } from "@/lib/dunastour/server";
import { mixGallery } from "@/lib/local-photos";
import { KayakSpotlight } from "@/components/home/KayakSpotlight";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { agencyInfo } from "@/lib/agency-info";
import { HeroHarbor } from "@/components/home/HeroHarbor";
import { PromiseStrip } from "@/components/home/PromiseStrip";
import { TourBoard } from "@/components/home/TourBoard";
import { DestinationsRail } from "@/components/home/DestinationsRail";
import { RoteirosShowcase } from "@/components/home/RoteirosShowcase";
import { ServicesDuo } from "@/components/home/ServicesDuo";
import { SeasonsTide } from "@/components/home/SeasonsTide";
import { StoryLevada } from "@/components/home/StoryLevada";
import { CadasturSeal } from "@/components/home/CadasturSeal";
import { ReviewsWall } from "@/components/home/ReviewsWall";
import { FaqList } from "@/components/home/FaqList";
import { ContactDock } from "@/components/home/ContactDock";
import { InstagramLog } from "@/components/home/InstagramLog";
import { getGallery } from "@/lib/dunastour/gallery";
import { ComboCard } from "@/components/tour/TicketCard";
import { Heading } from "@/components/ui/Heading";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { tourUnitPrice, whatsappUrl } from "@/lib/format";
import { reviewItems, reviewSummary } from "@/lib/reviews";

export const revalidate = 300;

export default async function Home() {
  const [agency, tours, packages, reviews, lagoons, gallery] = await Promise.all([getAgency(), getTours(), getPackages(), getReviews(), getLagoons(), getGallery()]);
  const info = agencyInfo(agency);
  const heroImages = [...new Set(tours.map((t) => t.coverImageUrl).filter((u): u is string => !!u))].slice(0, 6);
  const kayakCard = tours.find((t) => site.kayak.match.test(t.title));
  const kayak = kayakCard ? await getTour(kayakCard.id) : null;
  // A prévia da galeria usa as 8 primeiras; a grade do Instagram pega as seguintes pra não repetir.
  const photos = mixGallery(gallery).filter((g) => !g.video);
  const igPhotos = photos.slice(8).map((g) => g.url);
  // Preço de entrada do hero: o passeio por pessoa mais barato (veículo e transfer não comparam).
  const perPerson = tours
    .filter((t) => (!t.saleUnit || t.saleUnit === "PESSOA") && !(t.transferFrom && t.transferTo))
    .map(tourUnitPrice)
    .filter((p) => p > 0);
  const minPrice = perPerson.length ? Math.min(...perPerson) : null;
  const rating = reviewSummary(reviews, reviewItems(reviews, agency?.checkoutPage));
  const faqs = agency?.checkoutPage?.faqs.length ? [...agency.checkoutPage.faqs, ...site.faqs] : site.faqs;

  return (
    <>
      <HeroHarbor
        images={heroImages.length ? heroImages : ["/fotos/lencois-maranhenses.jpg", "/fotos/atins.webp"]}
        tourCount={tours.length}
        lagoonLevel={lagoons?.level ?? null}
        temperature={lagoons?.current?.temperature ?? null}
        cadasturUrl={info.cadasturUrl}
        minPrice={minPrice}
        rating={rating}
        phone={info.phone}
      />
      <PromiseStrip />

      <section id="passeios" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            kicker="Passeios"
            title={
              <>
                Escolha o dia, <em>a gente busca no hotel</em>
              </>
            }
            lead="Preços e vagas atualizados direto do nosso sistema de reservas. Junte quantos quiser na sua viagem."
          />
          <Link href="/passeios" className="group flex shrink-0 items-center gap-2 font-bold text-ocean-700 hover:text-ocean-500">
            Ver todos <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
        {tours.length > 0 ? (
          <TourBoard tours={tours} />
        ) : (
          <div className="rounded-[2rem] bg-white p-10 text-center ring-1 ring-ocean-900/10">
            <p className="font-display text-2xl font-semibold">Estamos atualizando os passeios</p>
            <p className="mt-2 text-ocean-950/60">Fale com a gente pelo WhatsApp pra saber datas e valores.</p>
            <a href={whatsappUrl(info.phone)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">
              <WhatsAppIcon size={18} /> Chamar no WhatsApp
            </a>
          </div>
        )}
        {packages.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {packages.map((p) => (
              <ComboCard key={p.id} pkg={p} />
            ))}
          </div>
        )}
      </section>

      <KayakSpotlight tour={kayak} slug={kayakCard?.slug} phone={info.phone} />
      <DestinationsRail tours={tours} />
      <RoteirosShowcase />
      <ServicesDuo />
      <SeasonsTide lagoons={lagoons} />
      <StoryLevada />
      {info.cadasturUrl && <CadasturSeal url={info.cadasturUrl} cnpj={info.cnpj} legalName={info.legalName} />}
      <GalleryPreview items={photos} />
      <InstagramLog instagram={info.instagram} photos={igPhotos} tourCount={tours.length} />
      <ReviewsWall reviews={reviews} page={agency?.checkoutPage} />
      <FaqList items={faqs} />
      <ContactDock info={info} />
    </>
  );
}
