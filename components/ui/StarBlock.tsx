import type { ReactNode } from "react";

/** STAR 단락 1개 — 좌측 색 보더 + 같은 색 모노 라벨. 색은 팔레트(border/blue/green) 안에서만. */
const TONE: Record<"situation" | "action" | "result", { border: string; text: string }> = {
  situation: { border: "border-sub", text: "text-sub" },
  action: { border: "border-blue", text: "text-blue" },
  result: { border: "border-green", text: "text-green" },
};

export function StarBlock({
  tone,
  label,
  children,
  className = "",
}: {
  tone: keyof typeof TONE;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const { border, text } = TONE[tone];
  return (
    <div className={`flex flex-col gap-2.5 border-l-[3px] pl-4 ${border} ${className}`}>
      <p
        className={`font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-[var(--tracking-wide)] uppercase ${text}`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
