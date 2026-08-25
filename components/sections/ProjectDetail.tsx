import Link from "next/link";
import type { Project } from "@/content/types";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FramedImage } from "@/components/ui/FramedImage";
import { ImagePointsGrid } from "@/components/ui/ImagePointsGrid";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen">
      {/* 상단 바 */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-[rgb(242_244_246_/_88%)] px-5 backdrop-blur-md md:px-12 lg:px-20">
        <Link href="/" className="btn">
          ← 목록
        </Link>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm font-bold text-text">
          {project.icon} {project.title}
        </span>
        <div className="flex-1" />
        <Chip color={project.status.color}>{project.status.label}</Chip>
      </div>

      <div className="px-5 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-[var(--page-width)] flex-col items-start gap-8 md:flex-row">
          {/* 사이드바 */}
          <aside className="w-full shrink-0 space-y-4 md:sticky md:top-20 md:w-52 md:self-start">
            <div className="card space-y-4 p-5">
              <div>
                <p className="mb-2 font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase">
                  기간·형태
                </p>
                <p className="text-sm text-sub">{project.meta}</p>
              </div>
              <div className="border-t border-border pt-3.5">
                <p className="mb-2 font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase">
                  맡은 역할
                </p>
                <p className="text-sm text-text">{project.scope}</p>
              </div>
              {project.badges.length > 0 && (
                <div className="border-t border-border pt-3.5">
                  <p className="mb-2 font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase">
                    Highlights
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {project.badges.map((badge) => (
                      <Chip key={badge} color="blue">
                        {badge}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
              <div className="border-t border-border pt-3.5">
                <p className="mb-2 font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
              {project.links.length > 0 && (
                <div className="border-t border-border pt-3.5">
                  <p className="mb-2 font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase">
                    Links
                  </p>
                  <div className="flex flex-col gap-2">
                    {project.links.map((link) => (
                      <LinkButton key={link.label} href={link.href}>
                        {link.label}
                      </LinkButton>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* 본문 */}
          <main className="min-w-0 flex-1 space-y-12">
            <div className="reveal">
              <h2>
                {project.icon} {project.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-sub">{project.oneLiner}</p>
            </div>

            {project.introScreen && project.why.length > 0 && (
              <div className="reveal">
                <ImagePointsGrid image={project.introScreen} points={project.why} />
              </div>
            )}

            {project.diagramSrc && (
              <div className="reveal space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG 다이어그램은 next/image 최적화 대상이 아님 */}
                <img src={project.diagramSrc} alt={`${project.title} 파이프라인 다이어그램`} className="w-full rounded-md" />
                {project.heroScreen && project.diagramCaptions && project.diagramCaptions.length > 0 && (
                  <ImagePointsGrid image={project.heroScreen} points={project.diagramCaptions} />
                )}
              </div>
            )}

            {project.decisions.map((decision) => (
              <div key={decision.title} className="reveal space-y-4">
                <h3 className="text-[15px] font-bold text-text">{decision.title}</h3>
                <p className="text-sm leading-relaxed text-sub">{decision.problem}</p>
                {decision.image ? (
                  <ImagePointsGrid image={decision.image} points={decision.solution} imageFirst={false} />
                ) : (
                  <ul className="space-y-0">
                    {decision.solution.map((point) => (
                      <li key={point.label} className="flex gap-3 border-b border-border py-3.5 last:border-0">
                        <span className="w-44 shrink-0 font-[family-name:var(--font-mono)] text-[11px] font-bold text-blue">
                          {point.label}
                        </span>
                        <span className="text-sm leading-relaxed text-sub">{point.detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {project.screens.length > 0 && (
              <div className="reveal grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.screens.map((screen) => (
                  <FramedImage key={screen.src} {...screen} />
                ))}
              </div>
            )}

            <p className="reveal font-[family-name:var(--font-mono)] text-[11px] text-muted">{project.result}</p>
          </main>
        </div>
      </div>
    </div>
  );
}
