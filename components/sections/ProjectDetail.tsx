import Link from "next/link";
import type { Project } from "@/content/types";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProjectBody } from "@/components/sections/ProjectBody";

const LABEL_CLASS =
  "text-center font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[var(--tracking-wide)] text-muted uppercase";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen">
      {/* 상단 바 */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border-strong bg-[rgb(242_244_246_/_88%)] px-5 backdrop-blur-md md:px-12 lg:px-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-pill bg-blue-bg px-3 py-1 text-xs font-semibold text-blue transition-colors hover:bg-blue hover:text-white"
        >
          ← 목록
        </Link>
        <div className="h-4 w-px bg-border-strong" />
        <span className="text-sm font-bold text-text">
          {project.icon} {project.title}
        </span>
        <div className="flex-1" />
        <Chip color={project.status.color}>{project.status.label}</Chip>
      </div>

      <div className="px-5 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-[var(--page-width)] flex-col items-start gap-8 md:flex-row">
          {/* 사이드바 — 모바일에서는 본문(제목·한 줄 정의) 뒤로 보낸다 */}
          <aside className="order-2 w-full shrink-0 space-y-4 md:order-1 md:sticky md:top-20 md:w-52 md:self-start">
            <div className="card space-y-4 p-5">
              <div>
                <p className={`mb-2 ${LABEL_CLASS}`}>기간·형태</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {project.meta.split(" · ").map((part) => (
                    <Chip key={part} color="gray">
                      {part}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-3.5">
                <p className={`mb-2 ${LABEL_CLASS}`}>맡은 역할</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {project.scope.map((role) => (
                    <Chip key={role} color="gray">
                      {role}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-3.5">
                <p className={`mb-2 ${LABEL_CLASS}`}>Tech Stack</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
              {project.links.length > 0 && (
                <div className="border-t border-border pt-3.5">
                  <p className={`mb-2 ${LABEL_CLASS}`}>Links</p>
                  <div className="flex flex-col items-center gap-2">
                    {project.links.map((link) => (
                      <LinkButton key={link.label} href={link.href}>
                        {link.label}
                      </LinkButton>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* 본문 */}
          <main className="order-1 flex min-w-0 flex-1 flex-col md:order-2">
            <ProjectBody project={project} />
          </main>
        </div>
      </div>
    </div>
  );
}
