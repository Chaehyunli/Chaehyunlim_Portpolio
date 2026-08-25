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
  problem: string;
  solution: SolutionPoint[];
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
