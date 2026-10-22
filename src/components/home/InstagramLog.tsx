import Image from "next/image";
import { Heart } from "lucide-react";
import { site } from "@/config/site";
import { InstagramIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";
import { InstagramProfileEmbed } from "./InstagramProfileEmbed";

/** "https://www.instagram.com/reel/ABC123/?igsh=…" → URL do embed oficial. */
function embedUrl(url: string) {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/i);
  if (!m) return null;
  return `https://www.instagram.com/${m[1].toLowerCase() === "p" ? "p" : "reel"}/${m[2]}/embed`;
}

/**
 * "Diário de bordo": cartão de perfil do Instagram ao lado do embed oficial do perfil (os posts reais mais recentes)
 * ou de uma grade 3×3 com as fotos dos passeios; embaixo, a faixa "Quem já viajou com a Levada" com os posts/reels
 * escolhidos no config (de clientes, guias ou da própria Levada).
 */
export function InstagramLog({ instagram, photos, tourCount }: { instagram: string; photos: string[]; tourCount: number }) {
  const profile = `https://instagram.com/${instagram}`;
  const reels = site.instagramReels.map(embedUrl).filter((u): u is string => !!u);
  const grid = photos.slice(0, 9);
  if (!reels.length && !site.instagramProfileEmbed && grid.length < 3) return null;
  // Coluna da direita: o perfil (embed oficial) ou a grade de fotos; os posts/reels do config vão numa faixa embaixo.

  return (
    <section id="instagram" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid items-start gap-10 lg:grid-cols-[22rem_1fr]">
        <FadeIn className="rounded-[2rem] bg-white p-7 ring-1 ring-ocean-900/10 lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-ocean-600">Diário de bordo</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="rounded-full bg-gradient-to-tr from-sun-400 via-[#e1306c] to-ocean-500 p-[3px]">
              <Image src="/brand/levada-selo.png" alt="" width={80} height={80} className="size-20 rounded-full bg-white p-1" />
            </span>
            <div className="grid flex-1 grid-cols-2 text-center">
              <span>
                <strong className="block font-display text-xl">{site.since}</strong>
                <span className="text-xs text-ocean-950/50">desde</span>
              </span>
              <span>
                <strong className="block font-display text-xl">{tourCount}</strong>
                <span className="text-xs text-ocean-950/50">passeios</span>
              </span>
            </div>
          </div>
          <p className="mt-4 font-bold">@{instagram}</p>
          <p className="mt-1 text-sm leading-relaxed text-ocean-950/65">
            🌊 {site.name} · Barreirinhas, MA
            <br />
            Passeios, transfer e hospedagem nos Lençóis Maranhenses.
            <br />
            Bastidores, lagoas do dia e o pôr do sol de cada passeio.
          </p>
          <a
            href={profile}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e1306c] to-[#f77737] py-3 font-bold text-white transition hover:brightness-110"
          >
            <InstagramIcon size={18} /> Seguir no Instagram
          </a>
        </FadeIn>

        {site.instagramProfileEmbed ? (
          <FadeIn>
            <InstagramProfileEmbed handle={instagram} />
          </FadeIn>
        ) : (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
            {grid.map((src, i) => (
              <FadeIn key={src} delay={(i % 3) * 0.05}>
                <a href={profile} target="_blank" rel="noreferrer" className="group relative block aspect-square overflow-hidden rounded-lg bg-ocean-100 sm:rounded-2xl">
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 22vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 grid place-items-center bg-ocean-950/45 text-white opacity-0 transition group-hover:opacity-100">
                    <Heart size={26} fill="currentColor" />
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {reels.length > 0 && (
        <div className="mt-16">
          <h3 className="font-display text-3xl font-semibold">
            Quem já viajou <em>com a Levada</em>
          </h3>
          <p className="mt-2 text-ocean-950/60">Posts e reels de quem passou por aqui. Arraste pro lado.</p>
          <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
            {reels.map((src) => (
              <iframe
                key={src}
                src={src}
                title="Post do Instagram"
                loading="lazy"
                scrolling="no"
                allow="encrypted-media; picture-in-picture"
                className="h-[37.5rem] w-[19rem] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border-0 bg-white ring-1 ring-ocean-900/10"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
