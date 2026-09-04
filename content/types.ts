export interface LinkItem {
  label: string;
  href: string;
}

export interface TimelineEntry {
  period: string;
  desc: string;
}

export interface CareerEntry {
  period: string;
  org: string;
  role: string;
  /** 1~2문장, 무엇을 어느 규모에서 맡았는지 */
  context: string;
  /** 핵심 기여 2~3불릿 (STAR 내용을 압축) */
  contributions: string[];
  stack: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectImage {
  src: string;
  caption: string;
  /** 세로 폰 목업처럼 폭이 좁은 이미지 — 프레임을 좁게(max-w) 잡고 가운데 정렬한다. */
  narrow?: boolean;
  /** 판단의 Action 카드와 나란히 둘 때, 이미지 열을 넓히고 카드 시작선에 맞춘다. */
  prominent?: boolean;
}

export interface ProjectDiagram {
  src: string;
}

export interface SolutionPoint {
  label: string;
  detail: string;
}

export interface ProjectDecision {
  /** 흐름 순서가 데이터 배열 순서와 다를 때만 지정한다. */
  order?: number;
  title: string;
  /** Situation & Task — 마주한 문제 상황 (서술형 문단) */
  problem: string;
  /** 나의 고민 — 기각한 대안·판단 기준 (불릿). problem과 함께 S&T 단락을 이룬다. */
  considerations?: string[];
  /** Action — 판단과 행동 (굵은 키워드 — 짧은 결과 캡션형) */
  solution: SolutionPoint[];
  /** Result — 행동으로 만든 결과 (서술형 문단) */
  outcome?: string;
  /** 이 판단이 담당하는 설계 구간. S&T와 Action 사이 전체 폭으로 표시한다. */
  diagram?: ProjectDiagram;
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
  /** 사이드바 "맡은 역할" — 짧은 역할·모듈 단위 칩으로 렌더된다. */
  scope: string[];
  status: ProjectStatus;
  links: LinkItem[];
  stack: string[];
  why: SolutionPoint[];
  /** 홈 카드 그리드 전용 썸네일. 없으면 introScreen, 그다음 screens[0]을 쓴다. */
  cardImage?: ProjectImage;
  introScreen?: ProjectImage;
  /** 개요에서 서비스가 사용자에게 보이는 최종 경험을 소개하는 화면. */
  showcaseScreen?: ProjectImage;
  /** showcaseScreen과 나란히 보여줄 사용자 흐름 설명. */
  showcasePoints?: SolutionPoint[];
  /** 프로젝트 성격에 맞게 사용 흐름 섹션의 짧은 라벨을 바꿀 때 사용한다. */
  showcaseEyebrow?: string;
  /** 프로젝트 성격에 맞게 사용 흐름 섹션 제목을 바꿀 때 사용한다. */
  showcaseTitle?: string;
  diagramSrc?: string;
  /** 여러 단계로 나눈 설계 다이어그램. 값이 있으면 diagramSrc보다 우선한다. */
  diagrams?: ProjectDiagram[];
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
  /** 홈 About 카드 — 일하는 방식·다음 관심사 불릿 2~3개. */
  about: string[];
  /** 이력서(/resume) 기술 요약 — 카테고리별 큐레이션. */
  skills: SkillGroup[];
  email: string;
  links: LinkItem[];
  education: TimelineEntry[];
  training: TimelineEntry[];
  certifications: string[];
}
