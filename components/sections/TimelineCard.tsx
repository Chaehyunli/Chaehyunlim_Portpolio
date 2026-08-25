import type { Profile } from "@/content/types";

export function TimelineCard({ profile }: { profile: Profile }) {
  const groups = [
    { title: "학력", entries: profile.education },
    { title: "경력", entries: profile.experience },
    { title: "교육", entries: profile.training },
  ];

  return (
    <div className="reveal card p-6 md:p-7" style={{ transitionDelay: "60ms" }}>
      <p className="mb-4 font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase">
        Education & Experience
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.flatMap((group) =>
          group.entries.map((entry) => (
            <div key={entry.desc}>
              <p className="mb-1 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-wide text-muted uppercase">
                {entry.period}
              </p>
              <p className="text-sm font-bold text-text">{group.title}</p>
              <p className="mt-0.5 text-xs text-sub">{entry.desc}</p>
            </div>
          ))
        )}
        <div>
          <p className="mb-1 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-wide text-muted uppercase">
            자격
          </p>
          <p className="text-sm font-bold text-text">{profile.certifications.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}
