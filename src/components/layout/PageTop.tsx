import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Waves } from "@/components/ui/Waves";

/** Topo das páginas internas: foto atrás do título, migalhas e as ondas fechando em areia. */
export function PageTop({
  image,
  kicker,
  title,
  crumbs,
  children,
}: {
  image?: string | null;
  kicker?: string;
  title: ReactNode;
  crumbs: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-ocean-900 pt-32 text-white">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/70 via-ocean-950/30 to-ocean-950/60" />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1 text-sm text-white/65">
          {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-1">
              <Link href={c.href} className="hover:text-white">
                {c.label}
              </Link>
              <ChevronRight size={14} />
            </span>
          ))}
        </nav>
        {kicker && <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-ocean-300">{kicker}</p>}
        <h1 className="mt-3 max-w-4xl text-balance font-display text-5xl leading-[1.02] font-semibold sm:text-6xl">{title}</h1>
        {children}
      </div>
      <Waves fill="var(--color-sand-50)" className="relative" />
    </section>
  );
}
