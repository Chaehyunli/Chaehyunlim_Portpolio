import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { RevealObserver } from "@/components/RevealObserver";

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = projects.find((item) => item.id === projectId);
  if (!project) notFound();

  return (
    <>
      <RevealObserver />
      <ProjectDetail project={project} />
    </>
  );
}
