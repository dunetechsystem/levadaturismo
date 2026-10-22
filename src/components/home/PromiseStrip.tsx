import { Anchor, CarFront, Route, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";

const ICONS = { anchor: Anchor, shield: ShieldCheck, car: CarFront, route: Route } as const;

export function PromiseStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-px overflow-hidden rounded-[2rem] bg-ocean-900/10 ring-1 ring-ocean-900/10 sm:grid-cols-2 lg:grid-cols-4">
        {site.promises.map((p, i) => {
          const Icon = ICONS[p.icon as keyof typeof ICONS];
          return (
            <FadeIn key={p.title} delay={i * 0.06} className="flex gap-4 bg-white p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ocean-100 text-ocean-700">
                <Icon size={22} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{p.title}</p>
                <p className="text-sm text-ocean-950/60">{p.text}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
