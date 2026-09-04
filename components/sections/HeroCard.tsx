import Image from "next/image";
import type { Profile } from "@/content/types";
import { LinkButton } from "@/components/ui/LinkButton";
import { Tag } from "@/components/ui/Tag";

export function HeroCard({ profile }: { profile: Profile }) {
  return (
    <div className="reveal card p-6 md:p-8">
      <div className="flex flex-col gap-7 md:flex-row md:gap-10">
        {/* 신원 */}
        <div className="flex items-center gap-5 md:w-56 md:shrink-0 md:flex-col md:items-start md:gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md shadow-card">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl">{profile.name}</h1>
            <p className="mt-1.5 font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase">
              {profile.title}
            </p>
          </div>
        </div>

        {/* 선언 */}
        <div className="min-w-0 flex-1 md:self-center md:border-l md:border-border md:pl-10">
          <p className="text-lg font-bold leading-snug text-text md:text-xl">
            {profile.oneLiner}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {profile.focus.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <LinkButton href={`mailto:${profile.email}`}>{profile.email}</LinkButton>
          {profile.links.map((link) => (
            <LinkButton key={link.label} href={link.href}>
              {link.label}
            </LinkButton>
          ))}
        </div>
        <a
          href="/portfolio.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-pill bg-blue px-3.5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 sm:self-auto"
        >
          포트폴리오 PDF ↓
        </a>
      </div>
    </div>
  );
}
