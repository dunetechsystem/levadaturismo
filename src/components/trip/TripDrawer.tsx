"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, CarFront, Compass, Trash2 } from "lucide-react";
import { itemKey, useCart, useCartItems, useHydrated } from "@/lib/cart";
import { lodgingLines, transferLines, tripMessage, useTrip } from "@/lib/trip";
import { longDate, money, unitCount, whatsappUrl } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** "Minha viagem": passeios do DunasTour + transfer + hospedagem, finalizados numa mensagem só. */
export function TripDrawer({ phone }: { phone: string }) {
  const { open, setOpen, remove, clear } = useCart();
  const items = useCartItems();
  const hydrated = useHydrated();
  const trip = useTrip();
  const transfer = hydrated ? trip.transfer : null;
  const lodging = hydrated ? trip.lodging : null;
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const total = sorted.reduce((s, i) => s + i.unitPrice * i.seats, 0);
  const empty = !sorted.length && !transfer && !lodging;
  const close = () => setOpen(false);

  return (
    <Drawer
      open={open}
      onClose={close}
      title="Minha viagem"
      footer={
        !empty && (
          <div className="space-y-3">
            {sorted.length > 0 && (
              <div className="flex items-end justify-between">
                <span className="text-sm text-ocean-950/60">Passeios</span>
                <span className="font-display text-3xl font-semibold">{money(total)}</span>
              </div>
            )}
            <a
              href={whatsappUrl(phone, tripMessage(sorted, transfer, lodging))}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-bold text-white shadow-lg shadow-[#25D366]/30 transition hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon /> Enviar pelo WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                clear();
                trip.clear();
              }}
              className="w-full text-center text-xs font-semibold text-ocean-950/45 hover:text-red-600"
            >
              Esvaziar viagem
            </button>
          </div>
        )
      }
    >
      {empty ? (
        <div className="py-10 text-center">
          <Compass size={44} className="mx-auto text-ocean-300" />
          <p className="mt-4 font-display text-2xl font-semibold">Sua viagem começa aqui</p>
          <p className="mx-auto mt-2 max-w-xs text-sm text-ocean-950/60">Junte passeios, transfer e hospedagem. No fim, mande tudo pra gente de uma vez pelo WhatsApp.</p>
          <Link href="/passeios" onClick={close} className="mt-6 inline-block rounded-full bg-ocean-600 px-6 py-3 text-sm font-bold text-white">
            Ver passeios
          </Link>
        </div>
      ) : (
        <ol className="relative space-y-4 border-l-2 border-dashed border-ocean-200 pl-5">
          {lodging && (
            <Extra icon={<BedDouble size={16} />} lines={lodgingLines(lodging)} onRemove={() => trip.setLodging(null)} />
          )}
          {transfer && (
            <Extra icon={<CarFront size={16} />} lines={transferLines(transfer)} onRemove={() => trip.setTransfer(null)} />
          )}
          {sorted.map((i) => (
            <li key={itemKey(i)} className="relative">
              <span className="absolute -left-[29px] top-4 size-3 rounded-full bg-ocean-500 ring-4 ring-sand-50" />
              <div className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-ocean-900/10">
                {i.image && <Image src={i.image} alt="" width={80} height={80} className="size-16 shrink-0 rounded-xl object-cover" />}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-ocean-600">{longDate(i.date)}</p>
                  <Link href={`/${i.kind === "tour" ? "passeios" : "pacotes"}/${i.id}`} onClick={close} className="block truncate font-semibold hover:text-ocean-600">
                    {i.title}
                  </Link>
                  <p className="text-sm text-ocean-950/60">
                    {unitCount(i.saleUnit, i.seats)}
                    {i.infants ? ` + ${i.infants} de colo` : ""} · <strong className="text-ocean-950">{money(i.unitPrice * i.seats)}</strong>
                  </p>
                </div>
                <button type="button" onClick={() => remove(itemKey(i))} aria-label="Remover" className="self-start p-1 text-ocean-950/35 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      {!empty && (!transfer || !lodging) && (
        <div className="mt-6 grid gap-2">
          {!transfer && (
            <Link href="/transfer" onClick={close} className="flex items-center gap-3 rounded-2xl border border-dashed border-ocean-300 p-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-100">
              <CarFront size={18} /> Incluir transfer do aeroporto
            </Link>
          )}
          {!lodging && (
            <Link href="/hospedagem" onClick={close} className="flex items-center gap-3 rounded-2xl border border-dashed border-ocean-300 p-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-100">
              <BedDouble size={18} /> Incluir hospedagem
            </Link>
          )}
        </div>
      )}
    </Drawer>
  );
}

function Extra({ icon, lines, onRemove }: { icon: React.ReactNode; lines: string[]; onRemove: () => void }) {
  const [head, sub] = lines.map((l) => l.replace(/\*/g, "").replace(/^[^\p{L}]+/u, "").trim());
  return (
    <li className="relative">
      <span className="absolute -left-[29px] top-4 size-3 rounded-full bg-sail-500 ring-4 ring-sand-50" />
      <div className="flex items-start gap-3 rounded-2xl bg-ocean-100/60 p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-ocean-700">{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{head}</p>
          <p className="text-sm text-ocean-950/60">{sub}</p>
        </div>
        <button type="button" onClick={onRemove} aria-label="Remover" className="p-1 text-ocean-950/35 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}
