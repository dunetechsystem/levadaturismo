import type { Metadata } from "next";
import { getAgency, getPackages, getTours } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { whatsappUrl } from "@/lib/format";
import { PageTop } from "@/components/layout/PageTop";
import { TourBoard } from "@/components/home/TourBoard";
import { ComboCard } from "@/components/tour/TicketCard";
import { WhatsAppIcon } from "@/components/ui/Icons";

export const revalidate = 300;
export const metadata: Metadata = { title: "Passeios", description: "Lagoa Azul, Lagoa Bonita, Atins, Pequenos Lençóis, Rio Preguiças e mais — com busca no hotel em Barreirinhas." };

export default async function ToursPage() {
  const [tours, packages, agency] = await Promise.all([getTours(), getPackages(), getAgency()]);
  const phone = agencyInfo(agency).phone;
  return (
    <>
      <PageTop
        image={tours[0]?.coverImageUrl ?? "/fotos/lencois-maranhenses.jpg"}
        kicker="Passeios Levada"
        title={
          <>
            Todos os <em>passeios</em>
          </>
        }
        crumbs={[{ href: "/", label: "Início" }]}
      >
        <p className="mt-4 max-w-xl text-lg text-white/75">Escolha um ou vários, cada um no seu dia. No fim você manda a viagem inteira pelo WhatsApp e só paga depois da confirmação.</p>
      </PageTop>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {packages.length > 0 && (
          <div className="mb-12 grid gap-5 md:grid-cols-2">
            {packages.map((p) => (
              <ComboCard key={p.id} pkg={p} />
            ))}
          </div>
        )}
        {tours.length > 0 ? (
          <TourBoard tours={tours} />
        ) : (
          <div className="rounded-[2rem] bg-white p-10 text-center ring-1 ring-ocean-900/10">
            <p className="font-display text-2xl font-semibold">Estamos atualizando os passeios</p>
            <a href={whatsappUrl(phone)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">
              <WhatsAppIcon size={18} /> Chamar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
