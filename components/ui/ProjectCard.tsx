import Link from "next/link";
import type { Project } from "@/content/types";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const cover = project.cardImage ?? project.introScreen ?? project.screens[0];

  return (
    <Link
      href={`/${project.id}`}
      className="reveal group block overflow-hidden rounded-card bg-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex h-56 items-center justify-center overflow-hidden bg-blue-bg">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element -- 카드 썸네일은 크기가 제각각인 콘텐츠 스크린샷이라 next/image 불필요
          <img
            src={cover.src}
            alt={cover.caption}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-5xl transition-transform duration-300 group-hover:scale-105">{project.icon}</div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-text">{project.title}</h3>
          <Chip color={project.status.color}>{project.status.label}</Chip>
        </div>
        <p className="mb-3 line-clamp-2 text-[13px] leading-relaxed text-sub">{project.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
          {project.stack.slice(0, 4).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
