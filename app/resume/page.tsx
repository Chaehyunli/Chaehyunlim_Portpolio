import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { career } from "@/content/career";
import { projects } from "@/content/projects";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: `${profile.name} — 이력서`,
  robots: { index: false },
};

export default function ResumePage() {
  return (
    <div className="resume">
      <div className="print:hidden mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="btn">
          ← 포트폴리오
        </Link>
        <PrintButton />
      </div>

      <header>
        <h1>{profile.name}</h1>
        <p className="r-meta mt-1">{profile.title}</p>
        <p className="mt-2">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.links.map((link) => (
            <span key={link.href}>
              {" · "}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <ul className="list-disc space-y-1 pl-4">
          {profile.about.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        {profile.skills.map((group) => (
          <p key={group.category} className="mt-1">
            <span className="font-bold">{group.category}</span> — {group.items.join(" · ")}
          </p>
        ))}
      </section>

      <section>
        <h2>Experience</h2>
        {career.map((entry) => (
          <div key={entry.org} className="r-item">
            <h3>
              {entry.org} <span className="font-normal">· {entry.role}</span>
            </h3>
            <p className="r-meta">{entry.period}</p>
            <p className="mt-1">{entry.context}</p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {entry.contributions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="r-meta mt-1">{entry.stack.join(" · ")}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="r-item">
            <h3>
              {project.title}
              <span className="r-meta font-normal"> — {project.meta}</span>
            </h3>
            <p className="mt-1">{project.oneLiner}</p>
            <p className="mt-1">
              <span className="font-bold">맡은 역할</span> · {project.scope.join(" · ")}
            </p>
            <p className="r-meta mt-1">{project.stack.slice(0, 7).join(" · ")}</p>
            <p className="mt-1">
              {project.links.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && " · "}
                  <a href={link.href}>{link.label}</a>
                </span>
              ))}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education & Training</h2>
        {[...profile.education, ...profile.training].map((entry) => (
          <p key={entry.desc} className="mt-1">
            <span className="r-meta">{entry.period}</span> — {entry.desc}
          </p>
        ))}
        <p className="mt-1">
          <span className="r-meta">자격</span> — {profile.certifications.join(" · ")}
        </p>
      </section>
    </div>
  );
}
