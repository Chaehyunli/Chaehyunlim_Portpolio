import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { HeroCard } from "@/components/sections/HeroCard";
import { TimelineCard } from "@/components/sections/TimelineCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <div className="min-h-screen">
        <section className="px-5 pt-14 pb-10 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[var(--page-width)] space-y-5">
            <HeroCard profile={profile} />
            <TimelineCard profile={profile} />
          </div>
        </section>

        <div className="border-t border-border" />

        <section className="px-5 py-10 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[var(--page-width)]">
            <div className="reveal mb-5 flex items-center gap-3">
              <span className="font-[family-name:var(--font-mono)] text-xs font-bold tracking-[var(--tracking-wide)] text-blue uppercase">
                Projects
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
                {projects.length}개 프로젝트
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index * 60} />
              ))}
            </div>
          </div>
        </section>

        <footer className="px-5 pt-2 pb-12 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[var(--page-width)]">
            <div className="border-t border-border" />
            <div className="flex flex-col items-start justify-between gap-3 pt-6 md:flex-row md:items-center">
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted">
                © 2026 {profile.name} · {profile.title}
              </p>
              <div className="flex gap-4">
                {profile.links.map((link) => (
                  <a key={link.label} href={link.href} className="btn">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
