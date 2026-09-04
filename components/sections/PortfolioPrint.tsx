import type { CareerEntry, Profile, Project } from "@/content/types";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";
import { ProjectBody } from "@/components/sections/ProjectBody";

const EYEBROW =
  "font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[var(--tracking-wide)] text-blue uppercase";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((line) => (
        <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-sub">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

/** 포트폴리오 전체(프로필·경력·6개 프로젝트 상세)를 한 문서로 — /print에서 인쇄해 PDF로 저장한다. */
export function PortfolioPrint({
  profile,
  career,
  projects,
}: {
  profile: Profile;
  career: CareerEntry[];
  projects: Project[];
}) {
  return (
    <div className="pf-print mx-auto max-w-[var(--page-width)] px-6 py-10">
      {/* 표지 */}
      <section className="pf-cover space-y-8">
        <div>
          <h1 className="text-2xl">{profile.name}</h1>
          <p className={`mt-1.5 ${EYEBROW}`}>{profile.title}</p>
          <p className="mt-3 text-lg font-bold text-text">{profile.oneLiner}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {profile.focus.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
          <p className="mt-3 text-sm text-sub">
            {profile.email}
            {profile.links.map((link) => (
              <span key={link.href}> · {link.href.replace(/^https?:\/\//, "")}</span>
            ))}
          </p>
        </div>

        <div className="border-t border-border pt-5">
          <p className={`mb-3 ${EYEBROW}`}>About</p>
          <Bullets items={profile.about} />
        </div>

        <div className="border-t border-border pt-5">
          <p className={`mb-3 ${EYEBROW}`}>Skills</p>
          <dl className="space-y-2">
            {profile.skills.map((group) => (
              <div key={group.category} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <dt className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-wide text-muted sm:w-32 sm:shrink-0 sm:pt-0.5">
                  {group.category}
                </dt>
                <dd className="text-sm text-sub">{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-border pt-5">
          <p className={`mb-3 ${EYEBROW}`}>Career</p>
          {career.map((entry) => (
            <div key={entry.org} className="pf-item space-y-2">
              <p className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-muted">
                {entry.period}
              </p>
              <p className="text-sm font-bold text-text">
                {entry.org} <span className="font-medium text-sub">· {entry.role}</span>
              </p>
              <p className="text-sm leading-relaxed text-sub">{entry.context}</p>
              <ul className="space-y-1.5">
                {entry.contributions.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-sub">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {entry.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-5">
          <p className={`mb-3 ${EYEBROW}`}>Education &amp; Training</p>
          <div className="space-y-1.5">
            {[...profile.education, ...profile.training].map((entry) => (
              <p key={entry.desc} className="text-sm text-sub">
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-muted">
                  {entry.period}
                </span>{" "}
                — {entry.desc}
              </p>
            ))}
            <p className="text-sm text-sub">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-muted">자격</span> —{" "}
              {profile.certifications.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* 프로젝트 */}
      {projects.map((project) => (
        <article
          key={project.id}
          className="pf-project mt-16 print:mt-0 print:break-before-page"
        >
          <header className="mb-10 border-b border-border-strong pb-5">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.meta.split(" · ").map((part) => (
                <Chip key={part} color="gray">
                  {part}
                </Chip>
              ))}
              <Chip color={project.status.color}>{project.status.label}</Chip>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="mr-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-wide text-muted">
                맡은 역할
              </span>
              {project.scope.map((role) => (
                <Chip key={role} color="gray">
                  {role}
                </Chip>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
            {project.links.length > 0 && (
              <p className="mt-3 text-xs text-sub">
                {project.links.map((link, i) => (
                  <span key={link.href}>
                    {i > 0 && " · "}
                    {link.label}: {link.href.replace(/^https?:\/\//, "")}
                  </span>
                ))}
              </p>
            )}
          </header>
          <ProjectBody project={project} />
        </article>
      ))}
    </div>
  );
}
