import { Plus } from "lucide-react";
import { Heading } from "@/components/ui/Heading";

/** Dúvidas em <details> nativo — abre sem JavaScript. */
export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <section id="duvidas" className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Heading
        kicker="Dúvidas"
        title={
          <>
            Antes de <em>arrumar a mala</em>
          </>
        }
        lead="Não achou o que procura? Chama no WhatsApp que a gente responde rapidinho."
      />
      <div className="divide-y divide-ocean-900/10 border-y border-ocean-900/10">
        {items.map((f) => (
          <details key={f.question} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-semibold transition hover:text-ocean-600 [&::-webkit-details-marker]:hidden">
              {f.question}
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ocean-100 text-ocean-700 transition group-open:rotate-45 group-open:bg-ocean-600 group-open:text-white">
                <Plus size={18} />
              </span>
            </summary>
            <p className="pb-6 pr-12 leading-relaxed text-ocean-950/70">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
