import type { GalleryItem } from "./media";

/**
 * Fotos do site antigo da Levada (public/fotos) — completam a galeria do DunasTour. Atins e Cardosa ficam
 * de fora porque já são as capas desses passeios no DunasTour (sairiam repetidas).
 */
export const LOCAL_PHOTOS: GalleryItem[] = [
  ["caiaque/caiaque1.jpeg", "Caiaque no Rio Preguiças"],
  ["lagoa-azul-vista-aerea.jpeg", "Lagoa Azul"],
  ["caiaque/caiaque4.jpeg", "Caiaque no Rio Preguiças"],
  ["mandacaru.webp", "Mandacaru"],
  ["lagoabonita1.webp", "Lagoa Bonita"],
  ["pequenos-lencois.jpg", "Pequenos Lençóis"],
  ["caiaque/caiaque6.jpeg", "Caiaque no Rio Preguiças"],
  ["lencois-maranhenses.jpg", "Lençóis Maranhenses"],
  ["caiaque/caiaque2.jpeg", "Caiaque no Rio Preguiças"],
  ["lagoabonita4.webp", "Lagoa Bonita"],
  ["foto1.jpeg", "Pequenos Lençóis"],
  ["caiaque/caiaque3.jpeg", "Caiaque no Rio Preguiças"],
  ["Lencois-1.jpg", "Lençóis Maranhenses"],
  ["foto3.jpeg", "Pequenos Lençóis"],
  ["caiaque/caiaque5.jpeg", "Caiaque no Rio Preguiças"],
  ["lagoa-azul-por-do-sol.jpeg", "Lagoa Azul"],
].map(([file, place]) => ({ url: `/fotos/${file}`, place, video: false }));

/** Intercala as fotos do DunasTour com as locais (uma de cada), sem repetir. */
export function mixGallery(remote: GalleryItem[]) {
  const out: GalleryItem[] = [];
  const max = Math.max(remote.length, LOCAL_PHOTOS.length);
  for (let i = 0; i < max; i++) {
    if (remote[i]) out.push(remote[i]);
    if (LOCAL_PHOTOS[i]) out.push(LOCAL_PHOTOS[i]);
  }
  return out;
}
