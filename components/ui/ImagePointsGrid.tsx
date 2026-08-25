import type { ProjectImage, SolutionPoint } from "@/content/types";
import { FramedImage } from "@/components/ui/FramedImage";

export function ImagePointsGrid({
  image,
  points,
  imageFirst = true,
}: {
  image: ProjectImage;
  points: SolutionPoint[];
  imageFirst?: boolean;
}) {
  return (
    <div className="grid items-stretch gap-[var(--space-4)] md:grid-cols-2">
      {imageFirst && <FramedImage {...image} />}
      <ul className="flex h-full flex-col justify-between gap-3">
        {points.map((point) => (
          <li
            key={point.label}
            className="flex h-full flex-1 flex-col justify-center rounded-md border border-border bg-card p-4"
          >
            <p className="text-sm font-bold text-text">{point.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-sub">{point.detail}</p>
          </li>
        ))}
      </ul>
      {!imageFirst && <FramedImage {...image} />}
    </div>
  );
}
