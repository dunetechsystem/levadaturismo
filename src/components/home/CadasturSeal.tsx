import QRCode from "qrcode";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { formatCnpj } from "@/lib/agency-info";
import { FadeIn } from "@/components/ui/FadeIn";

/** Selo do Cadastur com QR (gerado no servidor) que abre o registro no site do Ministério do Turismo. */
export async function CadasturSeal({ url, cnpj, legalName }: { url: string; cnpj: string | null; legalName: string | null }) {
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, color: { dark: "#0a2d55", light: "#ffffff00" } });
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <FadeIn className="flex flex-col items-center gap-8 rounded-[2.5rem] bg-white p-8 text-center ring-1 ring-ocean-900/10 sm:flex-row sm:p-10 sm:text-left">
        <div className="relative shrink-0 rounded-[1.5rem] bg-ocean-100 p-5">
          <div className="size-36" dangerouslySetInnerHTML={{ __html: svg }} />
          <BadgeCheck className="absolute -right-3 -top-3 size-9 rounded-full bg-white text-ocean-600" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Agência credenciada</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Registrada no Cadastur</h2>
          <p className="mt-3 text-ocean-950/65">
            O Cadastur é o cadastro oficial do Ministério do Turismo para quem trabalha com turismo no Brasil. Aponte a câmera para o QR ou confira o
            registro direto no site do governo.
          </p>
          {cnpj && (
            <p className="mt-3 text-sm text-ocean-950/50">
              {legalName && `${legalName} · `}CNPJ {formatCnpj(cnpj)}
            </p>
          )}
          <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ocean-600 px-6 py-3 text-sm font-bold text-white hover:bg-ocean-700">
            Verificar credenciamento <ExternalLink size={15} />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
