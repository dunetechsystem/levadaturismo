import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { mapsDirections, mapsEmbed, site } from "@/config/site";
import type { AgencyInfo } from "@/lib/agency-info";
import { whatsappUrl } from "@/lib/format";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";

/** Onde fica a agência em Barreirinhas: mapa + cartão com contato e horários. */
export function ContactDock({ info }: { info: AgencyInfo }) {
  const row = "flex gap-4";
  const icon = "grid size-11 shrink-0 place-items-center rounded-2xl bg-ocean-100 text-ocean-700";
  return (
    <section id="contato" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ocean-100 lg:min-h-[34rem]">
        <iframe
          src={mapsEmbed}
          title="Mapa da Levada Turismo em Barreirinhas"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 lg:absolute lg:inset-0 lg:h-full"
        />
        <FadeIn className="relative m-3 rounded-[2rem] bg-white p-7 shadow-2xl lg:absolute lg:left-6 lg:top-6 lg:m-0 lg:w-[26rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Passe aqui</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Nossa casa em Barreirinhas</h2>
          <ul className="mt-6 space-y-5 text-sm">
            <li className={row}>
              <span className={icon}><MapPin size={18} /></span>
              <span>{site.address.street}<br />{site.address.city}</span>
            </li>
            <li className={row}>
              <span className={icon}><Clock size={18} /></span>
              <span>{site.hours.map((h) => (<span key={h.days} className="block"><strong>{h.days}:</strong> {h.time}</span>))}</span>
            </li>
            <li className={row}>
              <span className={icon}><Phone size={18} /></span>
              <span className="self-center">{info.phone}</span>
            </li>
            <li className={row}>
              <span className={icon}><Mail size={18} /></span>
              <a href={`mailto:${info.email}`} className="self-center break-all hover:text-ocean-600">{info.email}</a>
            </li>
          </ul>
          <div className="mt-7 grid grid-cols-[1fr_auto_auto] gap-2">
            <a href={mapsDirections} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-ocean-600 py-3 text-sm font-bold text-white hover:bg-ocean-700">
              <Navigation size={16} /> Como chegar
            </a>
            <a href={whatsappUrl(info.phone)} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon />
            </a>
            <a href={`https://instagram.com/${info.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-12 place-items-center rounded-full bg-ocean-950 text-white">
              <InstagramIcon />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
