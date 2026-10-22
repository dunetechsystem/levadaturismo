import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/config/site";
import { getAgency } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { PageTop } from "@/components/layout/PageTop";
import { LodgingForm } from "@/components/trip/LodgingForm";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = { title: "Hospedagem", description: "Pousadas, hostels e hotéis parceiros em Barreirinhas e Atins, indicados pela Levada Turismo." };

export default async function LodgingPage() {
  const phone = agencyInfo(await getAgency()).phone;
  return (
    <>
      <PageTop
        image="/fotos/BarreirinhasPortal.jpg"
        kicker="Hospedagem"
        title={
          <>
            O lugar certo pra <em>descansar</em>
          </>
        }
        crumbs={[{ href: "/", label: "Início" }]}
      >
        <p className="mt-4 max-w-xl text-lg text-white/75">Conhecemos cada pousada da cidade. Diga as datas e o estilo e a gente indica e reserva a melhor opção pra você.</p>
      </PageTop>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          {site.lodging.map((l, i) => (
            <FadeIn key={l.id} delay={i * 0.05}>
              <article id={l.id} className="grid scroll-mt-28 overflow-hidden rounded-[2rem] bg-white ring-1 ring-ocean-900/10 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-60">
                  <Image src={l.image} alt={l.name} fill sizes="(min-width: 640px) 35vw, 100vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <h2 className="font-display text-3xl font-semibold">{l.name}</h2>
                  <p className="mt-2 text-ocean-950/65">{l.text}</p>
                  <ul className="mt-5 grid gap-2 text-sm">
                    {l.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check size={16} className="text-ocean-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-40px_rgba(6,27,53,.5)] ring-1 ring-ocean-900/10">
            <h2 className="mb-5 font-display text-2xl font-semibold">Pedir indicação</h2>
            <LodgingForm phone={phone} />
          </div>
        </aside>
      </div>
    </>
  );
}
