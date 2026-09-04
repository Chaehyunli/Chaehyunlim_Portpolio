import { Fragment } from "react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/LinkButton";
import { FramedImage } from "@/components/ui/FramedImage";
import { ImagePointsGrid } from "@/components/ui/ImagePointsGrid";
import { SolutionPoints } from "@/components/ui/SolutionPoints";
import { BlockHeading } from "@/components/ui/BlockHeading";
import { Divider } from "@/components/ui/Divider";
import { DecisionBlock } from "@/components/sections/DecisionBlock";

const LABEL_CLASS =
  "text-center font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase";

export function ProjectDetail({ project }: { project: Project }) {
  const hasCaptions = Boolean(
    project.heroScreen && project.diagramCaptions && project.diagramCaptions.length > 0,
  );
  const hasWhy = project.why.length > 0;
  const diagrams = project.diagrams?.length
    ? project.diagrams
    : project.diagramSrc
      ? [{ src: project.diagramSrc }]
      : [];
  const decisions = [...project.decisions].sort(
    (left, right) => (left.order ?? 0) - (right.order ?? 0),
  );

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
            {/* 사이드바 — 모바일에서는 본문(제목·한 줄 정의) 뒤로 보낸다 */}
            <aside className="order-2 w-full shrink-0 space-y-4 md:order-1 md:sticky md:top-20 md:w-52 md:self-start">
              <div className="card space-y-4 p-5">
                <div>
                  <p className={`mb-2 ${LABEL_CLASS}`}>기간·형태</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {project.meta.split(" · ").map((part) => (
                      <Chip key={part} color="gray">
                        {part}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-3.5">
                  <p className={`mb-2 ${LABEL_CLASS}`}>맡은 역할</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {project.scope.map((role) => (
                      <Chip key={role} color="gray">
                        {role}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-3.5">
                  <p className={`mb-2 ${LABEL_CLASS}`}>Tech Stack</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>
                {project.links.length > 0 && (
                  <div className="border-t border-border pt-3.5">
                    <p className={`mb-2 ${LABEL_CLASS}`}>Links</p>
                    <div className="flex flex-col items-center gap-2">
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
            <main className="order-1 flex min-w-0 flex-1 flex-col md:order-2">
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
                    {project.introScreen ? (
                      <ImagePointsGrid image={project.introScreen} points={project.why} />
                    ) : (
                      <SolutionPoints points={project.why} />
                    )}
                  </div>
                )}

                {project.showcaseScreen && (
                  <div className="reveal space-y-4">
                    <BlockHeading
                      eyebrow={project.showcaseEyebrow ?? "사용 흐름"}
                      title={project.showcaseTitle ?? "검색 결과를 근거로 답을 받는다"}
                    />
                    {project.showcasePoints && project.showcasePoints.length > 0 ? (
                      <ImagePointsGrid
                        image={project.showcaseScreen}
                        points={project.showcasePoints}
                        imageFirst={false}
                      />
                    ) : (
                      <div className="max-w-[880px]">
                        <FramedImage {...project.showcaseScreen} />
                      </div>
                    )}
                  </div>
                )}

                {diagrams.length > 0 && (
                  <div className="reveal space-y-4">
                    <BlockHeading eyebrow="설계" title="어떻게 동작하나" />
                    <div className="space-y-4">
                      {diagrams.map((diagram, index) => (
                        <figure key={diagram.src}>
                          {/* 좁은 화면에서만 원본 크기로 가로 스크롤한다. */}
                          <div className="overflow-x-auto rounded-md border border-border shadow-card">
                            {/* eslint-disable-next-line @next/next/no-img-element -- SVG 다이어그램은 next/image 최적화 대상이 아님 */}
                            <img
                              src={diagram.src}
                              alt={
                                project.diagramCaptions?.length
                                  ? `${project.title} 설계 다이어그램${diagrams.length > 1 ? ` ${index + 1}` : ""}: ${project.diagramCaptions
                                      .map((c) => c.label)
                                      .join(" → ")}`
                                  : `${project.title} 설계 다이어그램${diagrams.length > 1 ? ` ${index + 1}` : ""}`
                              }
                              className="block w-full min-w-[680px]"
                            />
                          </div>
                        </figure>
                      ))}
                    </div>
                    {hasCaptions && (
                      <ImagePointsGrid
                        image={project.heroScreen!}
                        points={project.diagramCaptions!}
                      />
                    )}
                  </div>
                )}

                {hasCaptions && diagrams.length === 0 && (
                  <div className="reveal">
                    <ImagePointsGrid
                      image={project.heroScreen!}
                      points={project.diagramCaptions!}
                    />
                  </div>
                )}
              </section>

              {decisions.length > 0 && (
                <>
                  <Divider />
                  <section>
                    {decisions.map((decision, index) => (
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
