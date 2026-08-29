import { Fragment } from "react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FramedImage } from "@/components/ui/FramedImage";
import { ImagePointsGrid } from "@/components/ui/ImagePointsGrid";
import { BlockHeading } from "@/components/ui/BlockHeading";
import { Divider } from "@/components/ui/Divider";
import { DecisionBlock } from "@/components/sections/DecisionBlock";

const LABEL_CLASS =
  "font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase";

export function ProjectDetail({ project }: { project: Project }) {
  const hasCaptions = Boolean(
    project.heroScreen && project.diagramCaptions && project.diagramCaptions.length > 0,
  );
  const hasWhy = Boolean(project.introScreen && project.why.length > 0);

  return (
    <div className="min-h-screen">
      {/* 상단 바 */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border-strong bg-[rgb(242_244_246_/_88%)] px-5 backdrop-blur-md md:px-12 lg:px-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-pill bg-blue-bg px-3 py-1 text-xs font-semibold text-blue transition-colors hover:bg-blue hover:text-white"
        >
          ← 목록
        </Link>
        <div className="h-4 w-px bg-border-strong" />
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
                  <p className={`mb-2 ${LABEL_CLASS}`}>기간·형태</p>
                  <p className="text-sm text-sub">{project.meta}</p>
                </div>
                <div className="border-t border-border pt-3.5">
                  <p className={`mb-2 ${LABEL_CLASS}`}>맡은 역할</p>
                  <p className="text-sm text-text">{project.scope}</p>
                </div>
                {project.badges.length > 0 && (
                  <div className="border-t border-border pt-3.5">
                    <p className={`mb-2 text-center ${LABEL_CLASS}`}>Highlights</p>
                    <div className="flex flex-col items-center gap-1.5">
                      {project.badges.map((badge) => (
                        <Chip key={badge} color="blue">
                          {badge}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
                <div className="border-t border-border pt-3.5">
                  <p className={`mb-2 text-center ${LABEL_CLASS}`}>Tech Stack</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>
                {project.links.length > 0 && (
                  <div className="border-t border-border pt-3.5">
                    <p className={`mb-2 ${LABEL_CLASS}`}>Links</p>
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

            {/* 본문 — 슬라이드 3장(개요·동작 / 판단 / 서비스 화면)을 Divider로 나눈다 */}
            <main className="flex min-w-0 flex-1 flex-col">
              <section className="space-y-12">
                <div className="reveal">
                  <h2>
                    {project.icon} {project.title}
                  </h2>
                  <p className="mt-2 max-w-none text-base leading-relaxed text-sub">
                    {project.oneLiner}
                  </p>
                </div>

                {hasWhy && (
                  <div className="reveal space-y-4">
                    <BlockHeading eyebrow="배경" title="왜 만들었나" />
                    <ImagePointsGrid image={project.introScreen!} points={project.why} />
                  </div>
                )}

                {project.diagramSrc && (
                  <div className="reveal space-y-4">
                    <BlockHeading eyebrow="설계" title="어떻게 동작하나" />
                    <figure>
                      {/* 3칸 × 2줄 파이프라인 — 좁은 화면만 가로 스크롤 */}
                      <div className="overflow-x-auto rounded-md border border-border shadow-card">
                        {/* eslint-disable-next-line @next/next/no-img-element -- SVG 다이어그램은 next/image 최적화 대상이 아님 */}
                        <img
                          src={project.diagramSrc}
                          alt={`${project.title} 파이프라인 다이어그램`}
                          className="block w-full min-w-[680px]"
                        />
                      </div>
                      <figcaption className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-xs text-sub">
                        실선 = 알고리즘·결정론적 처리 · 점선 = LLM 호출
                      </figcaption>
                    </figure>
                    {hasCaptions && (
                      <ImagePointsGrid
                        image={project.heroScreen!}
                        points={project.diagramCaptions!}
                      />
                    )}
                  </div>
                )}

                {hasCaptions && !project.diagramSrc && (
                  <div className="reveal">
                    <ImagePointsGrid
                      image={project.heroScreen!}
                      points={project.diagramCaptions!}
                    />
                  </div>
                )}
              </section>

              {project.decisions.length > 0 && (
                <>
                  <Divider />
                  <section>
                    {project.decisions.map((decision, index) => (
                      <Fragment key={decision.title}>
                        {index > 0 && <Divider />}
                        <DecisionBlock decision={decision} index={index} />
                      </Fragment>
                    ))}
                  </section>
                </>
              )}

              <Divider />
              <section className="space-y-8">
                {project.screens.length > 0 && (
                  <div className="reveal grid grid-cols-1 gap-4 md:grid-cols-2">
                    {project.screens.map((screen) => (
                      <FramedImage key={screen.src} {...screen} />
                    ))}
                  </div>
                )}
                <p className="reveal font-[family-name:var(--font-mono)] text-[11px] text-muted">
                  {project.result}
                </p>
              </section>
            </main>
        </div>
      </div>
    </div>
  );
}
