"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Luggage, Menu, X } from "lucide-react";
import { cartEnabled } from "@/config/site";
import { useCart, useCartItems, useHydrated } from "@/lib/cart";
import { useTrip } from "@/lib/trip";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/passeios", label: "Passeios" },
  { href: "/roteiros", label: "Roteiros" },
  { href: "/transfer", label: "Transfer" },
  { href: "/hospedagem", label: "Hospedagem" },
  { href: "/#quando-ir", label: "Quando ir" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

/** Barra branca translúcida que encolhe ao rolar; no celular, menu em tela cheia com as ondas no rodapé. */
export function SiteHeader({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const items = useCartItems();
  const hydrated = useHydrated();
  const extras = useTrip((s) => Number(!!s.transfer) + Number(!!s.lodging));
  const count = items.length + (hydrated ? extras : 0);
  const openTrip = useCart((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled ? "bg-white/85 py-2 shadow-[0_8px_30px_-12px_rgba(6,27,53,.25)] backdrop-blur-xl" : "bg-gradient-to-b from-white/90 to-white/0 py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="Levada Turismo — início" className="shrink-0">
            <Image src="/brand/levada-logo.png" alt="Levada Turismo" width={1488} height={808} priority className={cn("w-auto transition-all", scrolled ? "h-11" : "h-14")} />
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold text-ocean-900/80 transition hover:bg-ocean-100 hover:text-ocean-800",
                  pathname.startsWith(l.href) && l.href !== "/" && "bg-ocean-100 text-ocean-800"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            {cartEnabled && (
              <button
                type="button"
                onClick={() => openTrip(true)}
                className="relative flex items-center gap-2 rounded-full bg-ocean-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition hover:bg-ocean-700"
              >
                <Luggage size={18} />
                <span className="hidden sm:inline">Minha viagem</span>
                {count > 0 && <span className="grid size-5 place-items-center rounded-full bg-sun-400 text-[11px] font-extrabold text-ocean-950">{count}</span>}
              </button>
            )}
            <button type="button" onClick={() => setMenu(true)} aria-label="Abrir menu" className="grid size-11 place-items-center rounded-full bg-white text-ocean-900 ring-1 ring-ocean-900/10 lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ocean-950 text-white lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <Image src="/brand/levada-logo-branca.png" alt="Levada Turismo" width={1488} height={808} className="h-12 w-auto" />
              <button type="button" onClick={() => setMenu(false)} aria-label="Fechar menu" className="grid size-11 place-items-center rounded-full bg-white/10">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {[{ href: "/", label: "Início" }, ...LINKS].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="block py-2 font-display text-4xl font-medium">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a href={whatsappUrl(phone, "Olá, Levada Turismo! Quero planejar minha viagem.")} target="_blank" rel="noreferrer" className="m-6 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-bold">
              <WhatsAppIcon /> Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
