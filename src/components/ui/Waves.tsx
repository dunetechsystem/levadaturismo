import { cn } from "@/lib/cn";

/**
 * As três ondas da logo, empilhadas, como divisória entre seções. `fill` é a cor da seção de baixo,
 * pra onda "virar" o fundo dela; as duas de trás são versões translúcidas do azul.
 */
export function Waves({ fill = "var(--color-sand-50)", className, flip = false }: { fill?: string; className?: string; flip?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative h-16 w-full overflow-hidden sm:h-24", flip && "rotate-180", className)}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-[115%] animate-drift">
        <path d="M0 60 C 180 10 300 10 480 55 S 780 105 960 55 S 1260 5 1440 50 V120 H0Z" fill="var(--color-ocean-300)" opacity=".35" />
      </svg>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full animate-tide">
        <path d="M0 80 C 200 40 340 40 520 78 S 860 115 1040 75 S 1300 40 1440 70 V120 H0Z" fill="var(--color-ocean-500)" opacity=".35" />
      </svg>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0 96 C 240 70 420 72 640 94 S 1040 118 1240 96 S 1380 84 1440 90 V120 H0Z" fill={fill} />
      </svg>
    </div>
  );
}
