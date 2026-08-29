import type { ProjectImage, SolutionPoint } from "@/content/types";

/**
 * 이미지 옆에 텍스트 카드 리스트를 세워, 리스트를 '이미지 높이'에 맞춰 균등 분배한다.
 * 이미지는 row 1, 캡션은 row 2로 분리 — 텍스트 ul(row 1)은 캡션 높이를 빼고
 * 이미지 높이에만 stretch 된다. 모바일은 order로 이미지→캡션→텍스트 순서를 유지.
 */
export function ImagePointsGrid({
  image,
  points,
  imageFirst = true,
}: {
  image: ProjectImage;
  points: SolutionPoint[];
  imageFirst?: boolean;
}) {
  const imgCol = imageFirst ? "md:col-start-1" : "md:col-start-2";
  const listCol = imageFirst ? "md:col-start-2" : "md:col-start-1";

  return (
    <div className="grid gap-x-[var(--space-4)] gap-y-[var(--space-1)] md:grid-cols-2 md:grid-rows-[1fr_auto]">
      <div className={`order-1 overflow-hidden rounded-md shadow-card md:row-start-1 ${imgCol}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- 콘텐츠 스크린샷은 크기가 제각각이라 원본 비율 그대로 표시 */}
        <img src={image.src} alt={image.caption} className="block w-full" />
      </div>
      <p
        className={`order-2 font-[family-name:var(--font-mono)] text-xs text-sub md:row-start-2 ${imgCol}`}
      >
        {image.caption}
      </p>
      <ul
        className={`order-3 mt-[var(--space-2)] flex flex-col justify-between gap-3 md:row-start-1 md:mt-0 ${listCol}`}
      >
        {points.map((point) => (
          <li
            key={point.label}
            className="flex flex-1 flex-col justify-center rounded-md border border-border bg-card p-4"
          >
            <p className="text-sm font-bold text-text">{point.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-sub">{point.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
