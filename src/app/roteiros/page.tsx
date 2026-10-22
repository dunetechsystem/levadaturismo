import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roteiros } from "@/config/roteiros";
import { PageTop } from "@/components/layout/PageTop";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = { title: "Roteiros de vários dias", description: "Rota das Emoções, Santo Amaro, Atins e Barreirinhas: pacotes de 6 a 9 dias com transfer, hospedagem e passeios." };

export default function RoteirosPage() {
  return (
    <>
      <PageTop
        image="/fotos/lagoa-azul-vista-aerea.jpeg"
        kicker="Pacotes de viagem"
        title={
          <>
            Roteiros de <em>vários dias</em>
          </>
        }
        crumbs={[{ href: "/", label: "Início" }]}
      >
        <p className="mt-4 max-w-xl text-lg text-white/75">A viagem inteira montada pela Levada, dia a dia. O valor depende da data, do número de pessoas e da hospedagem — peça o orçamento.</p>
      </PageTop>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6">
        {roteiros.map((r, i) => (
          <FadeIn key={r.slug}>
            <Link href={`/roteiros/${r.slug}`} className={`group grid overflow-hidden rounded-[2rem] bg-white ring-1 ring-ocean-900/10 transition hover:ring-ocean-500 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-last" : ""}`}>
              <div className="relative min-h-72">
                <Image src={r.image} alt={r.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full bg-sun-400 px-3 py-1.5 text-sm font-extrabold text-ocean-950">{r.days.length} dias</span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <h2 className="font-display text-3xl font-semibold sm:text-4xl">{r.name}</h2>
                <p className="mt-3 text-ocean-950/65">{r.summary}</p>
                <ol className="mt-6 space-y-2 border-l-2 border-dashed border-ocean-200 pl-5 text-sm">
                  {r.days.slice(0, 4).map((d, n) => (
                    <li key={n} className="relative">
                      <span className="absolute -left-[27px] top-1 size-3 rounded-full bg-ocean-500 ring-4 ring-white" />
                      <strong className="text-ocean-700">Dia {n + 1}</strong> · {d.title}
                    </li>
                  ))}
                  {r.days.length > 4 && <li className="text-ocean-950/45">+ {r.days.length - 4} dias</li>}
                </ol>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-ocean-600">
                  Ver dia a dia <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
