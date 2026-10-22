import Link from "next/link";
import { Waves } from "@/components/ui/Waves";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-ocean-100 to-sand-50 px-4 pt-28 text-center">
      <p className="font-display text-8xl font-semibold text-ocean-300">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Essa duna o vento levou</h1>
      <p className="mt-3 text-ocean-950/60">A página que você procura não existe mais.</p>
      <Link href="/" className="mt-8 rounded-full bg-ocean-600 px-7 py-3.5 font-bold text-white">
        Voltar ao início
      </Link>
      <Waves className="mt-16" />
    </section>
  );
}
