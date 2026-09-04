import { Fragment } from "react";
import type { Project } from "@/content/types";
import { FramedImage } from "@/components/ui/FramedImage";
import { ImagePointsGrid } from "@/components/ui/ImagePointsGrid";
import { SolutionPoints } from "@/components/ui/SolutionPoints";
import { BlockHeading } from "@/components/ui/BlockHeading";
import { Divider } from "@/components/ui/Divider";
import { DecisionBlock } from "@/components/sections/DecisionBlock";

/**
 * 프로젝트 상세 본문 — 제목·정의 → 배경 → 사용 흐름 → 설계 → 판단 → 화면·결과.
 * `ProjectDetail`(사이드바 레이아웃)과 `PortfolioPrint`(전체 PDF)가 공유한다.
 * 2단 레이아웃은 전부 `md:` 프리픽스라 좁은 폭(인쇄)에서는 자동으로 세로 스택된다.
 */
export function ProjectBody({ project }: { project: Project }) {
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
    <>
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
                      className="block w-full min-w-[680px] print:min-w-0"
                    />
                  </div>
                </figure>
              ))}
            </div>
            {hasCaptions && (
              <ImagePointsGrid image={project.heroScreen!} points={project.diagramCaptions!} />
            )}
          </div>
        )}

        {hasCaptions && diagrams.length === 0 && (
          <div className="reveal">
            <ImagePointsGrid image={project.heroScreen!} points={project.diagramCaptions!} />
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
        <div className="reveal flex flex-col gap-2 rounded-md border border-green/25 border-l-[3px] border-l-green bg-green-bg px-5 py-4">
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[var(--tracking-wide)] text-green">
            결과
          </p>
          <p className="text-sm leading-relaxed text-text">{project.result}</p>
        </div>
      </section>
    </>
  );
}
