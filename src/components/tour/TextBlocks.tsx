import type { ReactNode } from "react";

/** Descrição do DunasTour: parágrafos separados por linha em branco; linhas com "-" ou "•" viram lista. */
export function Prose({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-4 text-lg leading-relaxed text-ocean-950/75">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length > 1 && lines.every((l) => /^[-•*✅✔️▪️]/u.test(l))) {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ocean-500" />
                  {l.replace(/^[-•*✅✔️▪️]+\s*/u, "")}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {block.trim()}
          </p>
        );
      })}
    </div>
  );
}

/** "Um item por linha" (incluído / o que levar). */
export function Checklist({ text, icon }: { text: string; icon: ReactNode }) {
  const lines = text.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
  return (
    <ul className="space-y-2.5">
      {lines.map((l, i) => (
        <li key={i} className="flex gap-3 text-ocean-950/80">
          <span className="mt-0.5 shrink-0">{icon}</span>
          {l}
        </li>
      ))}
    </ul>
  );
}
