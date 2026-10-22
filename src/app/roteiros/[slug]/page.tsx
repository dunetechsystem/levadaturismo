import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { roteiros } from "@/config/roteiros";
import { getAgency } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { PageTop } from "@/components/layout/PageTop";
import { FadeIn } from "@/components/ui/FadeIn";
import { QuoteBox } from "@/components/trip/QuoteBox";

export function generateStaticParams() {
  return roteiros.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/roteiros/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = roteiros.find((x) => x.slug === slug);
  return r ? { title: r.name, description: r.summary, openGraph: { images: [r.image] } } : { title: "Roteiro não encontrado" };
}

export default async function RoteiroPage({ params }: PageProps<"/roteiros/[slug]">) {
  const { slug } = await params;
  const r = roteiros.find((x) => x.slug === slug);
  if (!r) notFound();
  const phone = agencyInfo(await getAgency()).phone;
  return (
    <>
      <PageTop image={r.image} kicker={`${r.days.length} dias`} title={r.name} crumbs={[{ href: "/", label: "Início" }, { href: "/roteiros", label: "Roteiros" }]}>
        <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold">
          {r.stops.map((s, n) => (
            <li key={s} className="flex items-center gap-2">
              {n > 0 && <span className="h-px w-5 bg-white/40" />}
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                <MapPin size={13} /> {s}
              </span>
            </li>
          ))}
        </ol>
      </PageTop>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-xl leading-relaxed text-ocean-950/75">{r.summary}</p>
          <ol className="relative mt-12 space-y-10 border-l-2 border-ocean-200 pl-8 sm:pl-10">
            {r.days.map((d, n) => (
              <FadeIn key={n} className="relative">
                <li className="list-none">
                  <span className="absolute -left-[3.05rem] top-0 grid size-11 place-items-center rounded-full bg-ocean-600 font-display text-lg font-semibold text-white ring-8 ring-sand-50 sm:-left-[3.55rem]">
                    {n + 1}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Dia {n + 1}</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">{d.title}</h2>
                  {d.text.trim() && <p className="mt-3 leading-relaxed text-ocean-950/70">{d.text}</p>}
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuoteBox phone={phone} name={r.name} days={r.days.length} />
        </aside>
      </div>
    </>
  );
}
