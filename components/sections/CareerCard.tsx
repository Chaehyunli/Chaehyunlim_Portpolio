import type { CareerEntry } from "@/content/types";
import { Tag } from "@/components/ui/Tag";

export function CareerCard({ career }: { career: CareerEntry[] }) {
  return (
    <div className="reveal card p-6 md:p-7" style={{ transitionDelay: "50ms" }}>
      <p className="mb-4 font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase">
        Career
      </p>
      <div className="space-y-6">
        {career.map((entry) => (
          <div key={entry.org}>
            <p className="mb-1 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-wide text-muted uppercase">
              {entry.period}
            </p>
            <p className="text-sm font-bold text-text">
              {entry.org} <span className="font-medium text-sub">· {entry.role}</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sub">{entry.context}</p>
            <ul className="mt-3 space-y-2">
              {entry.contributions.map((line) => (
                <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-sub">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
