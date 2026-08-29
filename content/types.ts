export interface LinkItem {
  label: string;
  href: string;
}

export interface TimelineEntry {
  period: string;
  desc: string;
}

export interface ProjectImage {
  src: string;
  caption: string;
}

export interface SolutionPoint {
  label: string;
  detail: string;
}

export interface ProjectDecision {
  title: string;
  /** Situation & Task — 마주한 문제 상황 (서술형 문단) */
  problem: string;
  /** 나의 고민 — 기각한 대안·판단 기준 (불릿). problem과 함께 S&T 단락을 이룬다. */
  considerations?: string[];
  /** Action — 판단과 행동 (굵은 키워드 — 짧은 결과 캡션형) */
  solution: SolutionPoint[];
  /** Result — 행동으로 만든 결과 (서술형 문단) */
  outcome?: string;
  image?: ProjectImage;
}

export type StatusColor = "blue" | "green" | "purple" | "orange" | "gray";

export interface ProjectStatus {
  label: string;
  color: StatusColor;
}

export interface Project {
  id: string;
  icon: string;
  title: string;
  oneLiner: string;
  meta: string;
  scope: string;
  status: ProjectStatus;
  badges: string[];
  links: LinkItem[];
  stack: string[];
  why: SolutionPoint[];
  /** 홈 카드 그리드 전용 썸네일. 없으면 introScreen, 그다음 screens[0]을 쓴다. */
  cardImage?: ProjectImage;
  introScreen?: ProjectImage;
  diagramSrc?: string;
  diagramCaptions?: SolutionPoint[];
  heroScreen?: ProjectImage;
  decisions: ProjectDecision[];
  screens: ProjectImage[];
  result: string;
}

export interface Profile {
  photo: string;
  name: string;
  title: string;
  oneLiner: string;
  email: string;
  links: LinkItem[];
  education: TimelineEntry[];
  experience: TimelineEntry[];
  projects: TimelineEntry[];
  training: TimelineEntry[];
  certifications: string[];
}
