import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgency, getPackage } from "@/lib/dunastour/server";
import { packageBase } from "@/lib/booking-base";
import { agencyInfo } from "@/lib/agency-info";
import { displayTitle, money } from "@/lib/format";
import { PageTop } from "@/components/layout/PageTop";
import { PhotoStrip } from "@/components/tour/PhotoStrip";
import { ReservePanel } from "@/components/tour/ReservePanel";
import { Prose } from "@/components/tour/TextBlocks";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/pacotes/[id]">): Promise<Metadata> {
  const pkg = await getPackage((await params).id);
  return pkg ? { title: displayTitle(pkg.title) } : { title: "Pacote não encontrado" };
}

/** Combo de passeios cadastrado no DunasTour (diferente dos roteiros de vários dias do config). */
export default async function PackagePage({ params }: PageProps<"/pacotes/[id]">) {
  const { id } = await params;
  const [pkg, agency] = await Promise.all([getPackage(id), getAgency()]);
  if (!pkg) notFound();
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
                  <Link href={`/passeios/${t.id}`} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ocean-900/10 hover:ring-ocean-500">
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
    </>
  );
}
