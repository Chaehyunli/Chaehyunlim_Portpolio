import type { SolutionPoint } from "@/content/types";

/** 판단의 Action 본문 — 박스 카드 톤으로 통일. stack: 단일 열 (이미지 옆에 놓일 때). */
export function SolutionPoints({
  points,
  stack = false,
}: {
  points: SolutionPoint[];
  stack?: boolean;
}) {
  return (
    <ul className={stack ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
      {points.map((point) => (
        <li
          key={point.label}
          className="flex flex-col justify-center rounded-md border border-border bg-card p-4"
        >
          <p className="text-sm font-bold text-text">{point.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-sub">{point.detail}</p>
        </li>
      ))}
    </ul>
  );
}
