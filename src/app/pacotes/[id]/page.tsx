import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { findBySlug, getAgency, getPackage, getPackages, getTours } from "@/lib/dunastour/server";
import { packageBase } from "@/lib/booking-base";
import { agencyInfo } from "@/lib/agency-info";
import { displayTitle, money } from "@/lib/format";
import { PageTop } from "@/components/layout/PageTop";
import { PhotoStrip } from "@/components/tour/PhotoStrip";
import { ReservePanel } from "@/components/tour/ReservePanel";
import { Prose } from "@/components/tour/TextBlocks";
import { MobileReserveBar } from "@/components/tour/MobileReserveBar";

export const revalidate = 300;

/** O parâmetro da URL é o slug; o id antigo ainda funciona e redireciona. */
async function resolvePackage(param: string) {
  const card = findBySlug(await getPackages(), param);
  return { card, pkg: await getPackage(card?.id ?? param) };
}

export async function generateMetadata({ params }: PageProps<"/pacotes/[id]">): Promise<Metadata> {
  const { pkg, card } = await resolvePackage((await params).id);
  if (!pkg) return { title: "Pacote não encontrado" };
  return {
    title: displayTitle(pkg.title),
    description: pkg.description.replace(/\s+/g, " ").slice(0, 160) || `Combo de ${pkg.tours.length} passeios nos Lençóis Maranhenses com a Levada Turismo.`,
    alternates: card?.slug ? { canonical: `/pacotes/${card.slug}` } : undefined,
  };
}

/** Combo de passeios cadastrado no DunasTour (diferente dos roteiros de vários dias do config). */
export default async function PackagePage({ params }: PageProps<"/pacotes/[id]">) {
  const { id } = await params;
  const [{ pkg, card }, agency, tours] = await Promise.all([resolvePackage(id), getAgency(), getTours()]);
  if (!pkg) notFound();
  if (card?.slug && card.slug !== decodeURIComponent(id)) permanentRedirect(`/pacotes/${card.slug}`);
  const title = displayTitle(pkg.title);
  const cover = pkg.mediaUrls[0] ?? pkg.tours[0]?.coverImageUrl ?? null;
  return (
    <>
      <PageTop image={cover} kicker={`Combo · ${pkg.tours.length} passeios`} title={title} crumbs={[{ href: "/", label: "Início" }, { href: "/passeios", label: "Passeios" }]} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1fr_400px]">
        <div className="min-w-0 space-y-10">
          <PhotoStrip urls={pkg.mediaUrls} title={title} />
          {pkg.description.trim() && <Prose text={pkg.description} />}
          <div>
            <h2 className="mb-5 font-display text-3xl font-semibold">O que entra no combo</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {pkg.tours.map((t) => (
                <li key={t.id}>
                  <Link href={`/passeios/${tours.find((c) => c.id === t.id)?.slug ?? t.id}`} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ocean-900/10 hover:ring-ocean-500">
                    {t.coverImageUrl && <Image src={t.coverImageUrl} alt="" width={64} height={64} className="size-14 rounded-xl object-cover" />}
                    <span className="flex-1 font-semibold">{displayTitle(t.title)}</span>
                    <span className="text-sm text-ocean-950/45 line-through">{money(t.basePrice)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ReservePanel base={packageBase(pkg, cover)} phone={agencyInfo(agency).phone} />
        </aside>
      </div>
      <MobileReserveBar price={pkg.finalPrice} unit="por pessoa" />
    </>
  );
}
