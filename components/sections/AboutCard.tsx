import type { Profile } from "@/content/types";

const EYEBROW =
  "font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase";

export function AboutCard({ profile }: { profile: Profile }) {
  return (
    <div className="reveal card p-6 md:p-7" style={{ transitionDelay: "40ms" }}>
      <p className={`mb-4 ${EYEBROW}`}>About</p>
      <ul className="space-y-2.5">
        {profile.about.map((line) => (
          <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-sub">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-5">
        <p className={`mb-4 ${EYEBROW}`}>Skills</p>
        <dl className="space-y-2.5">
          {profile.skills.map((group) => (
            <div key={group.category} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <dt className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-wide text-muted sm:w-32 sm:shrink-0 sm:pt-0.5">
                {group.category}
              </dt>
              <dd className="text-sm text-sub">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
