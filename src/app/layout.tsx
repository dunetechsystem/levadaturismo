import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { cartEnabled, site } from "@/config/site";
import { getAgency } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { TripDrawer } from "@/components/trip/TripDrawer";

// Fraunces = títulos (serifada macia, com itálico que lembra a assinatura da logo); Manrope = texto.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["SOFT", "opsz"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Levada Turismo · Passeios, transfer e hospedagem nos Lençóis Maranhenses",
    template: "%s · Levada Turismo",
  },
  description:
    "Agência receptiva de Barreirinhas desde 1999. Passeios pela Lagoa Azul, Lagoa Bonita, Atins, Pequenos Lençóis e Rio Preguiças, transfer de São Luís, hospedagem e roteiros de vários dias.",
  keywords: ["Levada Turismo", "Lençóis Maranhenses", "Barreirinhas", "Lagoa Azul", "Lagoa Bonita", "Atins", "transfer São Luís Barreirinhas", "Rota das Emoções"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    // Imagem do compartilhamento (logo da Levada): app/opengraph-image.png e twitter-image.png.
  },
  verification: { google: "zXRSCMq1coLXxMh9blzdIbsiBQ1luRjxD_FSLmC4pAo" },
};

export const viewport: Viewport = { themeColor: "#0873bb" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const info = agencyInfo(await getAgency());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
    image: `${site.url}/brand/levada-logo.png`,
    telephone: info.phone,
    email: info.email,
    foundingDate: String(site.founded),
    address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: "Barreirinhas", addressRegion: "MA", postalCode: "65590-000", addressCountry: "BR" },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
  };
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader phone={info.phone} />
        <main>{children}</main>
        <SiteFooter info={info} />
        <WhatsAppBubble phone={info.phone} />
        {cartEnabled && <TripDrawer phone={info.phone} />}
      </body>
    </html>
  );
}
