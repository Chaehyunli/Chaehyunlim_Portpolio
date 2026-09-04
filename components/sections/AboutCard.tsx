import type { Profile } from "@/content/types";

export function AboutCard({ profile }: { profile: Profile }) {
  return (
    <div className="reveal card p-6 md:p-7" style={{ transitionDelay: "40ms" }}>
      <p className="mb-4 font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase">
        About
      </p>
      <ul className="space-y-2.5">
        {profile.about.map((line) => (
          <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-sub">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
