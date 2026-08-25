import Image from "next/image";
import type { Profile } from "@/content/types";
import { LinkButton } from "@/components/ui/LinkButton";

const TIMELINE_STAGGER_MS = 80;

export function ProfileSection({ profile }: { profile: Profile }) {
  const groups = [
    { title: "학력", entries: profile.education },
    { title: "경력", entries: profile.experience },
    { title: "프로젝트", entries: profile.projects },
    { title: "교육", entries: profile.training },
  ];

  return (
    <section id="profile" className="flex min-h-screen items-center py-[var(--space-6)]">
      <div className="page-shell grid justify-center gap-[var(--space-7)] md:grid-cols-[280px_560px]">
        <div className="reveal">
          <div className="w-full max-w-[280px] border border-[var(--color-hairline)]">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={280}
              height={370}
              className="h-auto w-full"
              priority
            />
          </div>
          <h1 className="mt-[var(--space-4)]">{profile.name}</h1>
          <p className="text-muted">{profile.title}</p>
          <p className="mt-[var(--space-3)]">{profile.oneLiner}</p>
          <p className="mt-[var(--space-3)] text-sm text-muted">{profile.email}</p>
          <div className="mt-[var(--space-3)] flex gap-4">
            {profile.links.map((link) => (
              <LinkButton key={link.label} href={link.href}>
                {link.label}
              </LinkButton>
            ))}
          </div>
        </div>
        <div className="w-full max-w-[560px] space-y-[var(--space-3)]">
          {groups.map((group, index) => (
            <TimelineGroup key={group.title} delayIndex={index} {...group} />
          ))}
          <div className="reveal" style={{ transitionDelay: `${groups.length * TIMELINE_STAGGER_MS}ms` }}>
            <h3>자격</h3>
            <p className="mt-[var(--space-2)] text-muted">{profile.certifications.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineGroup({
  title,
  entries,
  delayIndex,
}: {
  title: string;
  entries: { period: string; desc: string }[];
  delayIndex: number;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="reveal" style={{ transitionDelay: `${delayIndex * TIMELINE_STAGGER_MS}ms` }}>
      <h3>{title}</h3>
      <ul className="mt-[var(--space-2)] space-y-3">
        {entries.map((entry) => (
          <li key={entry.desc} className="text-sm leading-normal text-pretty">
            <span className="text-muted">{entry.period}</span> — {entry.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
