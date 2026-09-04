import Image from "next/image";
import type { Profile } from "@/content/types";
import { LinkButton } from "@/components/ui/LinkButton";

export function HeroCard({ profile }: { profile: Profile }) {
  return (
    <div className="reveal card flex flex-col items-start gap-6 p-6 md:flex-row md:p-8">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md shadow-card">
        <Image src={profile.photo} alt={profile.name} width={160} height={160} className="h-full w-full object-cover" priority />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="text-2xl">{profile.name}</h1>
        <p className="mt-1.5 font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase">
          {profile.title}
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-sub">{profile.oneLiner}</p>

        <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-5">
          <LinkButton href={`mailto:${profile.email}`}>{profile.email}</LinkButton>
          {profile.links.map((link) => (
            <LinkButton key={link.label} href={link.href}>
              {link.label}
            </LinkButton>
          ))}
          <LinkButton href="/resume">이력서</LinkButton>
        </div>
      </div>
    </div>
  );
}
