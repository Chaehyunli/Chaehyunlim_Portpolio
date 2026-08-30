import type { SolutionPoint } from "@/content/types";

/**
 * 판단의 Action 본문 — 박스 카드 톤으로 통일.
 * - stack: 단일 열 (이미지 옆에 놓일 때)
 * - fill: 부모 높이를 채우고 카드를 세로로 균등 분배 (폰 목업 옆 빈 공간 메우기)
 */
export function SolutionPoints({
  points,
  stack = false,
  fill = false,
}: {
  points: SolutionPoint[];
  stack?: boolean;
  fill?: boolean;
}) {
  const listClass = fill
    ? "flex flex-1 flex-col gap-3"
    : stack
      ? "space-y-3"
      : "grid gap-3 md:grid-cols-2";

  return (
    <ul className={listClass}>
      {points.map((point) => (
        <li
          key={point.label}
          className={`flex flex-col justify-center rounded-md border border-border bg-card p-4 ${
            fill ? "flex-1" : ""
          }`}
        >
          <p className="text-sm font-bold text-text">{point.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-sub">{point.detail}</p>
        </li>
      ))}
    </ul>
  );
}
