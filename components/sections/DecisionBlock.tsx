import type { ProjectDecision } from "@/content/types";
import { BlockHeading } from "@/components/ui/BlockHeading";
import { StarBlock } from "@/components/ui/StarBlock";
import { SolutionPoints } from "@/components/ui/SolutionPoints";

/** problem 문단 + considerations 불릿 — S&T 단락 본문. */
function SituationBody({ decision }: { decision: ProjectDecision }) {
  return (
    <>
      <p className="max-w-none text-sm leading-relaxed text-text">{decision.problem}</p>
      {decision.considerations && (
        <ul className="space-y-1.5">
          {decision.considerations.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-text">
              <span className="mt-[2px] shrink-0 text-muted">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * 판단 하나를 렌더한다. 레이아웃은 데이터로 갈린다:
 * - considerations 또는 outcome 있으면 STAR 3단락, 없으면 compact(문단 + 카드)
 * - image 있으면 3행 그리드(S&T 헤더 전체 폭 / Action·이미지 좌우 / Result 푸터 전체 폭),
 *   이미지는 Action 높이 안에서 세로 가운데(self-center)
 */
export function DecisionBlock({
  decision,
  index,
}: {
  decision: ProjectDecision;
  index: number;
}) {
  const isStar = Boolean(decision.considerations || decision.outcome);

  const heading = (
    <BlockHeading
      eyebrow={`판단 ${String(index + 1).padStart(2, "0")}`}
      title={decision.title}
    />
  );

  // 이미지 없는 판단: 세로 스택
  if (!decision.image) {
    return (
      <div className="reveal space-y-5">
        {heading}
        {isStar ? (
          <>
            <StarBlock tone="situation" label="Situation & Task · 마주한 문제와 고민">
              <SituationBody decision={decision} />
            </StarBlock>
            <StarBlock tone="action" label="Action · 나의 판단과 행동">
              <SolutionPoints points={decision.solution} />
            </StarBlock>
            {decision.outcome && (
              <StarBlock tone="result" label="Result · 결과">
                <p className="max-w-none text-sm leading-relaxed text-text">
                  {decision.outcome}
                </p>
              </StarBlock>
            )}
          </>
        ) : (
          <>
            <p className="max-w-none text-sm leading-relaxed text-text">{decision.problem}</p>
            <SolutionPoints points={decision.solution} />
          </>
        )}
      </div>
    );
  }

  // 이미지 있는 판단: 3행 그리드
  return (
    <div className="reveal space-y-5">
      {heading}
      <div className="space-y-5 md:grid md:grid-cols-[3fr_2fr] md:gap-x-[var(--space-4)] md:gap-y-0 md:space-y-0">
        {/* 행 1 — S&T (전체 폭) */}
        <div className="md:col-span-2 md:row-start-1 md:mb-5">
          {isStar ? (
            <StarBlock tone="situation" label="Situation & Task · 마주한 문제와 고민">
              <SituationBody decision={decision} />
            </StarBlock>
          ) : (
            <p className="max-w-none text-sm leading-relaxed text-text">{decision.problem}</p>
          )}
        </div>

        {/* 행 2 좌 — Action */}
        <div className="md:col-start-1 md:row-start-2 md:self-start">
          {isStar ? (
            <StarBlock tone="action" label="Action · 나의 판단과 행동">
              <SolutionPoints points={decision.solution} stack />
            </StarBlock>
          ) : (
            <SolutionPoints points={decision.solution} stack />
          )}
        </div>

        {/* 행 2 우 — 이미지 + 캡션, Action 높이 안에서 세로 가운데 정렬 */}
        <figure className="md:col-start-2 md:row-start-2 md:self-center">
          <div className="overflow-hidden rounded-md shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element -- 스크린샷은 크기가 제각각이라 원본 비율 그대로 */}
            <img
              src={decision.image.src}
              alt={decision.image.caption}
              className="block w-full"
            />
          </div>
          <figcaption className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-xs text-sub">
            {decision.image.caption}
          </figcaption>
        </figure>

        {/* 행 3 — Result (전체 폭, 이미지 아래에서 시작) */}
        {decision.outcome && (
          <div className="md:col-span-2 md:row-start-3 md:mt-5">
            <StarBlock tone="result" label="Result · 결과">
              <p className="max-w-none text-sm leading-relaxed text-text">{decision.outcome}</p>
            </StarBlock>
          </div>
        )}
      </div>
    </div>
  );
}
