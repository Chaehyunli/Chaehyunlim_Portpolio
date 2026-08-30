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

function Screenshot({ decision }: { decision: ProjectDecision }) {
  const image = decision.image!;
  return (
    <>
      <div className="overflow-hidden rounded-md shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element -- 스크린샷은 크기가 제각각이라 원본 비율 그대로 */}
        <img src={image.src} alt={image.caption} className="block w-full" />
      </div>
      <figcaption className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-xs text-sub">
        {image.caption}
      </figcaption>
    </>
  );
}

/**
 * 판단 하나를 렌더한다. 레이아웃은 데이터로 갈린다:
 * - considerations 또는 outcome 있으면 STAR 3단락, 없으면 compact(문단 + 카드)
 * - image 없으면 세로 스택
 * - image.narrow(세로 폰 목업): 텍스트 전체를 한 컬럼에, 폰을 옆에 (좌우 2단)
 * - image 와이드(데스크톱 목업): S&T 헤더 / Action·이미지 좌우 / Result 푸터 3행 그리드
 */
export function DecisionBlock({
  decision,
  index,
}: {
  decision: ProjectDecision;
  index: number;
}) {
  const isStar = Boolean(decision.considerations || decision.outcome);
  const wideImage = Boolean(decision.image && !decision.image.narrow);

  const heading = (
    <BlockHeading
      eyebrow={`판단 ${String(index + 1).padStart(2, "0")}`}
      title={decision.title}
    />
  );

  const situation = isStar ? (
    <StarBlock tone="situation" label="Situation & Task · 마주한 문제와 고민">
      <SituationBody decision={decision} />
    </StarBlock>
  ) : (
    <p className="max-w-none text-sm leading-relaxed text-text">{decision.problem}</p>
  );
  const action = isStar ? (
    <StarBlock tone="action" label="Action · 나의 판단과 행동">
      <SolutionPoints points={decision.solution} stack={wideImage} />
    </StarBlock>
  ) : (
    <SolutionPoints points={decision.solution} stack={wideImage} />
  );
  const result = decision.outcome ? (
    <StarBlock tone="result" label="Result · 결과">
      <p className="max-w-none text-sm leading-relaxed text-text">{decision.outcome}</p>
    </StarBlock>
  ) : null;

  // 이미지 없음 — 세로 스택
  if (!decision.image) {
    return (
      <div className="reveal space-y-5">
        {heading}
        {situation}
        {action}
        {result}
      </div>
    );
  }

  // 세로 폰 목업 — 텍스트 전체를 왼쪽 한 컬럼에, 폰을 오른쪽에 (헤더/푸터 X)
  if (decision.image.narrow) {
    return (
      <div className="reveal space-y-5">
        {heading}
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_340px] md:items-start md:gap-x-[var(--space-4)]">
          <div className="space-y-5">
            {situation}
            {action}
            {result}
          </div>
          <figure className="mt-5 md:mt-0">
            <Screenshot decision={decision} />
          </figure>
        </div>
      </div>
    );
  }

  // 와이드 데스크톱 목업 — S&T(헤더, 전체 폭) / Action·이미지 좌우 / Result(푸터, 전체 폭)
  return (
    <div className="reveal space-y-5">
      {heading}
      <div className="space-y-5 md:grid md:grid-cols-[3fr_2fr] md:gap-x-[var(--space-4)] md:gap-y-0 md:space-y-0">
        <div className="md:col-span-2 md:row-start-1 md:mb-5">{situation}</div>
        <div className="md:col-start-1 md:row-start-2 md:self-start">{action}</div>
        <figure className="md:col-start-2 md:row-start-2 md:self-center">
          <Screenshot decision={decision} />
        </figure>
        {result && (
          <div className="md:col-span-2 md:row-start-3 md:mt-5">{result}</div>
        )}
      </div>
    </div>
  );
}
