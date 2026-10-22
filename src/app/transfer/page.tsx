import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/config/site";
import { getAgency } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { PageTop } from "@/components/layout/PageTop";
import { TransferForm } from "@/components/trip/TransferForm";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = { title: "Transfer", description: "Transfer privativo do Aeroporto de São Luís até Barreirinhas, Atins, Santo Amaro e Jericoacoara." };

export default async function TransferPage() {
  const phone = agencyInfo(await getAgency()).phone;
  const [main, ...rest] = site.transfer.images;
  return (
    <>
      <PageTop
        image={main}
        kicker="Transfer privativo"
        title={
          <>
            Chegou em São Luís? <em>A gente leva</em>
          </>
        }
        crumbs={[{ href: "/", label: "Início" }]}
      >
        <p className="mt-4 max-w-xl text-lg text-white/75">{site.transfer.text}</p>
      </PageTop>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1fr_440px]">
        <div className="min-w-0 space-y-12">
          <div>
            <h2 className="font-display text-3xl font-semibold">Trechos mais pedidos</h2>
            <ul className="mt-6 divide-y divide-ocean-900/10 rounded-[2rem] bg-white ring-1 ring-ocean-900/10">
              {site.transfer.routes.map((r) => (
                <li key={r.from + r.to} className="flex items-center gap-4 px-6 py-5">
                  <span className="font-semibold">{r.from}</span>
                  <span className="relative h-px flex-1 border-t-2 border-dashed border-ocean-300">
                    <span className="absolute -top-[5px] right-0 size-2 rounded-full bg-ocean-500" />
                  </span>
                  <span className="font-semibold">{r.to}</span>
                  <span className="hidden w-36 text-right text-sm text-ocean-950/55 sm:block">
                    {r.km} km · {r.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {site.transfer.features.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-2xl bg-ocean-100/60 px-4 py-3 font-semibold text-ocean-900">
                <Check size={18} className="text-ocean-600" /> {f}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {rest.map((src, i) => (
              <FadeIn key={src} delay={i * 0.05} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={src} alt="Frota de transfer da Levada" fill sizes="(min-width: 640px) 20vw, 50vw" className="object-cover" />
              </FadeIn>
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-40px_rgba(6,27,53,.5)] ring-1 ring-ocean-900/10">
            <h2 className="mb-5 font-display text-2xl font-semibold">Monte seu transfer</h2>
            <TransferForm phone={phone} />
          </div>
        </aside>
      </div>
    </>
  );
}
