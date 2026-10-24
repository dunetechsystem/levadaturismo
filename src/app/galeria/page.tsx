import type { Metadata } from "next";
import { getGallery } from "@/lib/dunastour/gallery";
import { PageTop } from "@/components/layout/PageTop";
import { PhotoWall } from "@/components/tour/PhotoWall";
import { mixGallery } from "@/lib/local-photos";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos e vídeos dos passeios da Levada Turismo: Lagoa Azul, Lagoa Bonita, Atins, Pequenos Lençóis e Rio Preguiças.",
};


export default async function GalleryPage() {
  const photos = mixGallery(await getGallery());
  return (
    <>
      <PageTop image="/fotos/lagoa-azul-por-do-sol.jpeg" kicker="Galeria" title={<>Cartões-postais <em>de verdade</em></>} crumbs={[{ href: "/", label: "Início" }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <PhotoWall items={photos} />
      </div>
    </>
  );
}
