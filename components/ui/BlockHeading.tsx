/** 슬라이드·판단 공통 소제목 — 모노 블루 eyebrow + 굵은 제목. eyebrow는 짧은 라벨, title이 내용. */
export function BlockHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="mb-1 font-[family-name:var(--font-mono)] text-[11px] font-bold text-blue">
        {eyebrow}
      </p>
      <h3 className="text-[15px] font-bold text-text">{title}</h3>
    </div>
  );
}
