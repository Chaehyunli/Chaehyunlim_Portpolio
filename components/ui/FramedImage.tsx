import type { ProjectImage } from "@/content/types";

export function FramedImage({ src, caption, narrow }: ProjectImage) {
  return (
    <figure className={narrow ? "mx-auto max-w-[340px]" : undefined}>
      <div className="overflow-hidden rounded-md shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element -- 콘텐츠 스크린샷은 크기가 제각각이라 next/image의 고정 width/height 대신 원본 비율 그대로 표시 */}
        <img src={src} alt={caption} className="block w-full" />
      </div>
      <figcaption className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-xs text-sub">
        {caption}
      </figcaption>
    </figure>
  );
}
