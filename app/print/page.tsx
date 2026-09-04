import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { career } from "@/content/career";
import { projects } from "@/content/projects";
import { PortfolioPrint } from "@/components/sections/PortfolioPrint";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: `${profile.name} — 포트폴리오`,
  robots: { index: false },
};

export default function PrintPage() {
  return (
    <div className="bg-card">
      <div className="print:hidden sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card/90 px-6 py-3 backdrop-blur">
        <Link href="/" className="btn">
          ← 포트폴리오
        </Link>
        <PrintButton />
      </div>
      <PortfolioPrint profile={profile} career={career} projects={projects} />
    </div>
  );
}
