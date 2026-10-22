import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { formatCnpj, type AgencyInfo } from "@/lib/agency-info";
import { whatsappUrl } from "@/lib/format";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Waves } from "@/components/ui/Waves";

export function SiteFooter({ info }: { info: AgencyInfo }) {
  const col = "text-sm font-bold uppercase tracking-[0.2em] text-ocean-300";
  return (
    <footer className="relative mt-24 bg-ocean-950 text-white/75">
      <Waves fill="var(--color-ocean-950)" className="absolute -top-16 sm:-top-24" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/levada-logo-branca.png" alt="Levada Turismo" width={1488} height={808} className="h-20 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Agência receptiva de Barreirinhas. Passeios, transfer, hospedagem e roteiros pelos Lençóis Maranhenses desde {site.since}.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={whatsappUrl(info.phone)} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-[#25D366]">
              <WhatsAppIcon />
            </a>
            <a href={`https://instagram.com/${info.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-ocean-500">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div>
          <p className={col}>Viagem</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["/passeios", "Passeios"],
              ["/roteiros", "Roteiros de vários dias"],
              ["/transfer", "Transfer"],
              ["/hospedagem", "Hospedagem"],
              ["/galeria", "Galeria"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>Atendimento</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className="block text-white">{h.days}</span>
                {h.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-ocean-300" /> {info.phone}
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-ocean-300" /> <a href={`mailto:${info.email}`} className="break-all hover:text-white">{info.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-ocean-300" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/45 sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}
            {info.legalName && ` · ${info.legalName}`}
            {info.cnpj && ` · CNPJ ${formatCnpj(info.cnpj)}`}
          </p>
          <p>
            Reservas pelo <a href="https://dunastour.com.br" target="_blank" rel="noreferrer" className="underline hover:text-white">DunasTour</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
