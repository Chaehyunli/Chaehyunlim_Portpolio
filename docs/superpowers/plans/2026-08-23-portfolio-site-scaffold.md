# 포트폴리오 사이트 스캐폴딩 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프로필 + 6개 프로젝트를 단일 스크롤 페이지로 보여주는 Next.js 포트폴리오 사이트의 기술 골격(스캐폴딩)을 완성한다 — 프로젝트 초기화, Tailwind v4 통합, 콘텐츠 데이터, 목차 내비게이션, 섹션 컴포넌트, 빌드 검증까지.

**Architecture:** Next.js 15 App Router 단일 페이지(`app/page.tsx`)가 `content/`의 TS 데이터를 `ProfileSection`/`ProjectSection` 컴포넌트로 렌더링한다. 오른쪽 고정 `SectionNav`가 `IntersectionObserver` 기반 스크롤 스파이로 현재 섹션을 추적해 활성 표시한다. 스타일은 기존 `design-tokens.css`를 `app/globals.css`로 옮기고 Tailwind v4 `@theme` 블록으로 감싸 유틸리티 클래스와 기존 커스텀 클래스(`.btn`, `.section`, `.reveal`)를 함께 쓴다.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Node.js 24 내장 테스트 러너(`node --test`)

**Spec:** `docs/superpowers/specs/2026-08-23-portfolio-site-design.md`

## Global Constraints

- 무채색 3색 고정: `#ffffff`(bg) · `#000000`(text) · `#9ca3af`(muted). 4번째 색을 추가하지 않는다.
- 라이트 테마 단일 고정. 다크모드 분기를 만들지 않는다.
- radius는 `0` 고정 — 각진 모서리로 통일.
- 모션은 `.reveal`의 페이드+translateY 하나만 쓴다. 새 애니메이션 라이브러리를 추가하지 않는다.
- 단일 스크롤 페이지다. 프로젝트별 별도 라우트를 만들지 않는다.
- 콘텐츠 텍스트를 컴포넌트에 하드코딩하지 않는다 — `content/*.ts`에서만 관리한다.
- `--space-1..9`는 시맨틱 이름이라 Tailwind 숫자 스페이싱 스케일과 이름이 충돌한다 — 리네이밍하지 않고 `p-[var(--space-4)]` 형태의 임의값 클래스로 참조한다.
- Node.js 24.19.0 / npm 11.17.0 기준.

---

### Task 1: Next.js 프로젝트 스캐폴딩

리포에 이미 커밋된 파일(`.claude/`, `CLAUDE.md`, `design-tokens.css`)이 `create-next-app`의 빈 디렉터리 검사와 충돌하므로, 잠시 옮겼다가 스캐폴딩 후 되돌린다.

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `public/*` (create-next-app 생성)
- Modify: `.gitignore` (create-next-app이 자체 생성 시도할 경우 병합)

**Interfaces:**
- Produces: 동작하는 기본 Next.js 앱 (`npm run build` 통과), 이후 모든 태스크가 이 위에서 파일을 추가/수정함

- [ ] **Step 1: 충돌 파일 임시 대피**

```bash
cd "c:\Users\chaeh\Documents\Chaehyunlim_Portpolio"
mkdir -p ../portfolio-staging-tmp
mv .claude CLAUDE.md design-tokens.css ../portfolio-staging-tmp/
```

- [ ] **Step 2: create-next-app 실행**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

- [ ] **Step 3: 대피시킨 파일 복원**

```bash
mv ../portfolio-staging-tmp/.claude ../portfolio-staging-tmp/CLAUDE.md ../portfolio-staging-tmp/design-tokens.css .
rmdir ../portfolio-staging-tmp
```

- [ ] **Step 4: .gitignore에 .claude 규칙이 남아있는지 확인**

`.gitignore`를 열어 아래 줄이 있는지 확인한다. create-next-app이 파일을 덮어썼다면 파일 끝에 추가한다.

```
# claude — settings.json은 커밋, 로컬 오버라이드만 무시
.claude/settings.local.json
```

- [ ] **Step 5: 빌드로 스캐폴딩 검증**

Run: `npm run build`
Expected: `Compiled successfully` — 에러 없이 종료 코드 0

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: Next.js 15 App Router 프로젝트 스캐폴딩"
```

---

### Task 2: Tailwind v4 ↔ design-tokens.css 통합

**Files:**
- Modify: `app/globals.css` (create-next-app이 생성한 `@import "tailwindcss";` 뒤에 기존 `design-tokens.css` 내용을 병합)
- Delete: `design-tokens.css` (루트, 이동 완료 후 삭제)

**Interfaces:**
- Produces: `bg-bg`, `text-text`, `text-muted`, `text-lg`~`text-3xl`, `ease-standard`, `rounded-none` 등 Tailwind 유틸리티 + `.page-shell`, `.section`, `.section-title`, `.btn`, `.reveal` 커스텀 클래스. 이후 모든 컴포넌트 태스크가 이 클래스들을 사용함.

- [ ] **Step 1: app/globals.css 작성**

`app/globals.css`를 아래 내용으로 전체 교체한다 (Tailwind import + `@theme`로 색상·타이포·이징·radius 매핑 + 나머지는 시맨틱 커스텀 프로퍼티 + 기존 리셋/컴포넌트 클래스 그대로 유지).

```css
@import "tailwindcss";

@theme {
  /* ---- Color (무채색 3색 고정) ---- */
  --color-bg: #ffffff;
  --color-text: #000000;
  --color-muted: #9ca3af;
  --color-hairline: rgb(156 163 175 / 35%);

  /* ---- Typography scale ---- */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.75rem;
  --text-2xl: 2.5rem;
  --text-3xl: 3.5rem;

  /* ---- Motion / shape ---- */
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
  --radius-none: 0px;
}

:root {
  /* ---- Spacing scale (시맨틱 이름 — Tailwind 숫자 스케일과 충돌해 @theme에 넣지 않음) ---- */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4rem;
  --space-7: 6rem;
  --space-8: 8rem;
  --space-9: 12rem;

  --font-sans: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;

  --leading-tight: 1.15;
  --leading-normal: 1.6;
  --tracking-wide: 0.08em;

  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;

  --duration-fast: 200ms;
  --duration-base: 400ms;

  --content-width: 720px;
  --page-width: 1120px;
  --radius: 0;
}

/* ---- Reset ---- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { color-scheme: light; }

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
}

img, svg { display: block; max-width: 100%; }

/* ---- Typography scale ---- */
h1, h2, h3 {
  font-weight: var(--weight-light);
  line-height: var(--leading-tight);
  letter-spacing: -0.01em;
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }

p { max-width: 65ch; color: var(--color-text); }

.text-muted { color: var(--color-muted); }

/* ---- Layout primitives ---- */
.page-shell {
  max-width: var(--page-width);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

.section {
  padding-block: var(--space-8);
}

.section-title {
  text-align: center;
  max-width: var(--content-width);
  margin-inline: auto;
}

.section-title::before,
.section-title::after {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  margin-inline: auto;
  background: var(--color-hairline);
}

.section-title::before { margin-bottom: var(--space-3); }
.section-title::after { margin-top: var(--space-3); }

/* ---- Ghost button ---- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: color var(--duration-fast) var(--ease-standard),
              border-color var(--duration-fast) var(--ease-standard);
}

.btn:hover, .btn:focus-visible {
  color: var(--color-muted);
  border-color: var(--color-muted);
}

/* ---- Scroll reveal ---- */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--duration-base) var(--ease-standard),
              transform var(--duration-base) var(--ease-standard);
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media (max-width: 768px) {
  .section { padding-block: var(--space-6); }
  h1 { font-size: var(--text-2xl); }
  h2 { font-size: var(--text-xl); }
}
```

- [ ] **Step 2: 루트 design-tokens.css 삭제**

```bash
rm design-tokens.css
```

- [ ] **Step 3: 빌드로 검증**

Run: `npm run build`
Expected: `Compiled successfully`, 에러 없음 (Tailwind가 `@theme` 블록을 정상 파싱)

- [ ] **Step 4: Commit**

```bash
git add app/globals.css design-tokens.css
git commit -m "style: design-tokens.css를 Tailwind v4 @theme로 통합"
```

---

### Task 3: 콘텐츠 타입 및 데이터

**Files:**
- Create: `content/types.ts`
- Create: `content/profile.ts`
- Create: `content/projects.ts`

**Interfaces:**
- Produces: `Project`, `Profile`, `LinkItem`, `ProjectDecision`, `ProjectScreen`, `TimelineEntry` 타입, `profile: Profile`, `projects: Project[]` — Task 6, 7, 8이 이 타입과 데이터를 소비함

- [ ] **Step 1: content/types.ts 작성**

```ts
export interface LinkItem {
  label: string;
  href: string;
}

export interface ProjectDecision {
  title: string;
  problem: string;
  solution: string[];
}

export interface ProjectScreen {
  src: string;
  caption: string;
}

export interface ProjectDiagram {
  imageSrc?: string;
  caption: { label: string; reason: string }[];
}

export interface Project {
  id: string;
  icon: string;
  title: string;
  oneLiner: string;
  meta: string;
  scope: string;
  badges: string[];
  links: LinkItem[];
  stack: string[];
  why: string[];
  diagram?: ProjectDiagram;
  decisions: ProjectDecision[];
  screens: ProjectScreen[];
  result: string;
}

export interface TimelineEntry {
  period: string;
  desc: string;
}

export interface Profile {
  name: string;
  title: string;
  oneLiner: string;
  email: string;
  links: LinkItem[];
  education: TimelineEntry[];
  experience: TimelineEntry[];
  training: TimelineEntry[];
  awards: TimelineEntry[];
  certifications: string[];
}
```

- [ ] **Step 2: content/profile.ts 작성**

```ts
import type { Profile } from "./types";

export const profile: Profile = {
  name: "임채현",
  title: "Backend Developer",
  oneLiner: "문제를 정확하게 정의하고, 설계로 풀어내는 백엔드 개발자",
  email: "chaehyun010104@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/Chaehyunli" },
    { label: "기술 블로그", href: "https://ch010104.tistory.com/" },
  ],
  education: [
    { period: "2021.03 ~ 2026.08", desc: "명지대학교 컴퓨터공학부 컴퓨터공학과 졸업" },
  ],
  experience: [
    {
      period: "2026.01 ~ 2026.02",
      desc: "프람트테크놀로지 · 개발팀 인턴 — 약 20만 LOC 전략물자 관리 시스템 레거시 → MSA 전환 검증, 8,000개 테스트 케이스 설계·수행, 단위 테스트 에러 수정 해결률 100%",
    },
  ],
  training: [
    {
      period: "2025.07 ~ 2025.08",
      desc: "SK AI Dream Camp 중급 — 추천 시스템 · 이상치 탐지 · 회귀 예측",
    },
    { period: "2026 ~ 현재", desc: "SKALA 4기 이수 중" },
  ],
  awards: [
    { period: "2026.06", desc: "명지대학교 Capstone 디자인 전시회 은상 (Masil)" },
    { period: "2025.10", desc: "VIBE CODING 실전활용 경진대회 장려상 (PETNER)" },
  ],
  certifications: ["정보처리기사", "SQLD"],
};
```

- [ ] **Step 3: content/projects.ts 작성**

```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "moduyaksok",
    icon: "🤝",
    title: "모두약속",
    oneLiner:
      "목적·시간·지역·예산·선호를 입력하면 실제 장소 검색 결과로 약속 일정을 만들어주는 AI 서비스",
    meta: "2026.08 ~ · 개인 프로젝트 · 배포 운영 중",
    scope: "기획·설계·구현·배포 전 과정 단독",
    badges: ["배포 운영 중", "클라이언트 암호화 BYOK", "LLM·알고리즘 경계 설계"],
    links: [
      { label: "배포", href: "https://moduyaksok.vercel.app" },
      { label: "GitHub", href: "https://github.com/Chaehyunli/moduyaksok" },
      { label: "API 문서", href: "https://moduyaksok.onrender.com/docs" },
    ],
    stack: [
      "FastAPI", "SQLModel", "PostgreSQL", "Redis", "Alembic",
      "Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "Web Crypto API",
      "DeepEval", "Vercel", "Render",
    ],
    why: [
      "약속을 잡을 때 장소를 고르고 동선을 맞추는 과정이 매번 반복되고 번거롭다",
      "일반적인 AI 추천은 존재하지 않는 장소를 만들어내거나 실제 이동 거리를 고려하지 않아 그대로 쓰기 어렵다",
      "그래서 실제 검색된 장소 안에서만 일정을 구성하고, 실제 경로로 동선을 검증하는 서비스를 직접 만들었다",
    ],
    decisions: [
      {
        title: "내 서버가 사용자 키를 볼 수 있다는 것 자체가 문제였다",
        problem:
          "LLM 호출 비용을 사용자가 직접 부담하는 BYOK 구조를 선택했는데, 서버가 사용자의 API 키를 복호화할 수 있는 구조 자체가 위험이었다.",
        solution: [
          "사용자 패스프레이즈로 PBKDF2-SHA256 600,000회 반복해 키를 유도하고 AES-GCM 256bit으로 브라우저에서 암호화해 서버에는 암호문·salt·iv만 전송하도록 설계했다",
          "provider 호출 시점에만 서버가 평문을 쓰고 버리도록 해 DB·캐시 어디에도 평문을 남기지 않았다",
          "패스프레이즈를 잃으면 저장된 키도 복구 불가능하다는 트레이드오프를 감수했다 — 서버가 대신 복호화해줄 방법이 없다는 게 이 설계의 의도다",
        ],
      },
      {
        title: "LLM이 해야 할 일과 코드가 해야 할 일을 나눴다",
        problem:
          "프롬프트로 시간 겹침·예산 초과 같은 규칙을 명시해도 지켜지지 않는 사례가 반복됐다.",
        solution: [
          "시간 겹침, 예산 초과, 이동거리, 식사 슬롯, 태그 중복처럼 결정론적으로 계산 가능한 건 규칙 기반 하드 필터로 코드에 옮겼다",
          "의미적 판단만 남겨 살아남은 후보에만 LLM을 1회 호출하도록 파이프라인을 재구성했다",
          "각 단계에 DeepEval 골든 데이터셋 회귀 테스트를 붙여 프롬프트·모델 변경 시 품질 저하를 수치로 확인할 수 있게 했다",
        ],
      },
    ],
    screens: [],
    result: "배포 운영 중 · https://moduyaksok.vercel.app",
  },
  {
    id: "masil",
    icon: "🧭",
    title: "Masil",
    oneLiner: "대화로 일정을 짜고 예약까지 이어지는 AI agent 여행 플래너",
    meta: "2026.03 ~ 2026.08 · 4인 팀",
    scope:
      "AI 파이프라인 설계 단독 · AI 서버 구현 80% / 백엔드 API 전체 설계 · 일정 도메인 구현",
    badges: ["Capstone 은상", "Android 앱 배포", "구간별 LLM 검증"],
    links: [{ label: "GitHub", href: "https://github.com/orgs/Masil2026/repositories" }],
    stack: [
      "React Native", "Expo", "Spring WebFlux", "FastAPI", "PydanticAI",
      "PostgreSQL", "Redis", "SSE", "Docker Compose",
    ],
    why: [
      "기존 여행 일정 추천 서비스는 머신러닝 기반이라 학습된 여행지·일정 범위 안에서만 결과를 만든다",
      "학습 데이터에 없는 지역이나 실시간으로 바뀌는 정보는 반영되지 않는다",
      "그래서 AI agent가 실시간 정보를 직접 조회해 일정을 구성하고 예약까지 수행하는 구조로 기획했다",
    ],
    decisions: [
      {
        title: "요청 분류 단계를 파이프라인 진입 전에 설계해 넣었다",
        problem:
          "사용자 요청이 애매할 때 의도와 다른 동작으로 흘러 엉뚱한 예약·수정이 실행되는 문제가 있었다.",
        solution: [
          "chat·itinerary·reservation·change·cancel 5종 중 어느 타입인지 먼저 판단하는 분류 단계를 설계해 넣었다",
          "분류가 확정되지 않으면 실행하지 않고 확인 단계로 분기하도록 흐름을 바꿨다",
          "구간별 골든 데이터셋 테스트 덕분에 결과가 엉뚱할 때 요청 해석 단계의 문제임을 특정할 수 있었다",
        ],
      },
    ],
    screens: [],
    result: "Android 앱 배포 · 명지대학교 Capstone 디자인 전시회 은상",
  },
  {
    id: "searchive",
    icon: "🔎",
    title: "Searchive",
    oneLiner: "문서를 업로드하면 자동 태깅·검색·RAG 질의응답으로 이어지는 개인 지식 베이스",
    meta: "2025.10 ~ 2025.12 · 개인 프로젝트",
    scope: "기획·설계·구현 전 과정 단독",
    badges: ["개인 프로젝트", "벡터 기반 태그 재사용", "Elasticsearch 배치 검색"],
    links: [
      { label: "GitHub", href: "https://github.com/orgs/Searchive-Project/repositories" },
    ],
    stack: [
      "FastAPI", "PostgreSQL", "Elasticsearch", "pgvector", "Redis",
      "MinIO", "KeyBERT", "React", "TypeScript", "Docker Compose",
    ],
    why: [
      "개인 문서를 폴더로 쌓아두면 나중에 어디에 뭐가 있는지 찾기 어렵다",
      "외부 서비스에 의존하지 않고 문서를 자동으로 분류·태깅해 검색·질의응답으로 연결하는 구조가 필요했다",
      "그래서 업로드부터 태깅·검색·RAG 응답까지 한 파이프라인으로 이어지는 지식 베이스를 직접 만들었다",
    ],
    decisions: [
      {
        title: "계산과 통신이 함께 N배로 늘어나는 구조를 배치 검색으로 풀었다",
        problem:
          "태그 후보 N개를 Elasticsearch에 개별 요청하면 각 요청이 KNN 연산을 수행해 연산과 통신이 동시에 N배로 늘었다.",
        solution: [
          "N개의 KNN 벡터 쿼리를 Elasticsearch _msearch 요청 하나로 묶도록 설계를 바꿨다",
          "순차 처리와 배치 처리의 요청 단위를 분리해 병목 원인을 특정할 수 있게 측정 구간을 나눴다",
          "키워드 5개 기준 네트워크 왕복을 5회 → 1회, 지연을 250ms 수준 → 10ms 수준으로 낮췄다",
        ],
      },
      {
        title: "AI가 뽑은 후보를 그대로 저장하지 않고 과추출+필터+대표 태그 수렴으로 정제했다",
        problem:
          "추출기가 넘긴 키워드에 불용어·숫자·한 글자짜리가 섞이고, 표기가 다른 같은 의미의 태그가 별개로 생성됐다.",
        solution: [
          "목표 개수의 3배를 과추출한 뒤 품질 필터와 표기 정규화·중복 제거를 거쳐 상위 3개를 선택하도록 설계했다",
          "이름 완전 일치 → 벡터 유사도 0.8 이상 순으로 기존 태그를 먼저 찾고 둘 다 없을 때만 새 태그를 생성하도록 했다",
        ],
      },
    ],
    screens: [],
    result: "개인 지식 베이스 서비스 완성 · 2025.12",
  },
  {
    id: "petner",
    icon: "🐾",
    title: "PETNER",
    oneLiner: "유기견 탐색·입양 신청·커뮤니티·보호소 실시간 채팅을 연결한 팀 백엔드 서비스",
    meta: "2025.08 ~ 2025.10 · 팀 프로젝트 · 장려상",
    scope: "채팅·유기견·입양 신청·즐겨찾기 도메인 백엔드",
    badges: ["WebSocket/STOMP 세션 인증", "Soft Delete 설계", "장려상"],
    links: [
      { label: "GitHub", href: "https://github.com/orgs/Dangdaengdan/repositories" },
    ],
    stack: [
      "Java 17", "Spring Boot", "Spring Security", "JPA", "PostgreSQL",
      "Redis", "OpenSearch", "WebSocket/STOMP", "Flyway", "Docker Compose",
    ],
    why: [
      "유기견 탐색부터 입양 신청, 보호소와의 실시간 문의까지 한 서비스에서 이어지는 플랫폼이 필요했다",
      "팀 내에서 채팅·도메인 핵심 로직을 담당해 실시간 프로토콜과 데이터 생명주기 설계를 직접 다뤘다",
    ],
    decisions: [
      {
        title: "HTTP 세션을 WebSocket 경계 너머까지 이어야 했다",
        problem:
          "REST와 WebSocket은 프로토콜 경계가 달라, HTTP 세션으로 관리되는 로그인 사용자를 WebSocket 핸드셰이크와 STOMP 메시지 처리 단계까지 일관되게 식별해야 했다.",
        solution: [
          "핸드셰이크 시점에 Redis 세션에서 사용자를 꺼내 WebSocket 세션 속성에 넣어두는 방식으로 연결부터 메시지 처리까지 동일한 사용자 컨텍스트를 유지했다",
          "단일 HTML 테스트 페이지로 연결·구독·발행을 단계별로 직접 재현해 검증했다",
        ],
      },
      {
        title: "\"나가기\"는 화면에서 사라지는 것과 데이터를 없애는 것을 분리해야 했다",
        problem:
          "Hard Delete로 채팅방 나가기를 처리하면 연관 메시지와의 FK 제약 오류와 이력 유실이 발생했다.",
        solution: [
          "삭제를 사용자 관점의 비활성화로 재정의해 Soft Delete로 전환하고 조회 시 활성 상태 기준으로 필터링하는 정책을 설계했다",
          "FK 무결성과 채팅 이력 보존을 함께 확보했다",
        ],
      },
    ],
    screens: [],
    result: "명지대학교 VIBE CODING 실전활용 경진대회 장려상",
  },
  {
    id: "club-moa",
    icon: "📎",
    title: "동아리모아",
    oneLiner: "동아리 탐색·지원·운영·권한 위임을 한 서비스에서 다룬 팀 백엔드 프로젝트",
    meta: "2025.01 ~ 2025.03 · 팀 프로젝트",
    scope: "핵심 도메인 설계 · 인증 방식 선택 · 동아리별 RBAC · 지원·승인 흐름 구현",
    badges: ["Redis 세션 인증", "리소스 단위 RBAC"],
    links: [], // GitHub 링크가 노션 원본에 미기재 — 확인 후 추가
    stack: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL", "Redis", "JWT"],
    why: [],
    decisions: [
      {
        title: "JWT 대신 Redis 세션을 선택한 이유",
        problem:
          "동아리 강제 탈퇴·계정 정지처럼 즉시 통제가 필요한 시나리오에서 JWT는 만료 전까지 토큰이 유효하다는 한계가 있었다.",
        solution: [
          "Redis 세션은 서버에서 즉시 무효화할 수 있어 운영 요구사항에 맞는 인증 방식으로 선택했다",
        ],
      },
      {
        title: "전역 RBAC가 아닌 동아리 리소스 단위 권한 설계",
        problem:
          "단순 ADMIN/USER 역할로는 \"특정 동아리의 회장만 권한을 위임할 수 있다\"는 요구사항을 표현할 수 없었다.",
        solution: [
          "사용자·동아리·역할을 리소스 단위로 묶어 동아리별로 독립적인 권한 체계가 동작하도록 설계했다",
        ],
      },
    ],
    screens: [],
    result: "2025.01 ~ 2025.03 완성",
  },
  {
    id: "nosogong",
    icon: "📎",
    title: "노소공",
    oneLiner:
      "행동 데이터로 펫 감정을 예측하고 미니게임 보상·성장 흐름을 연결한 ML 기반 동물 육성 게임",
    meta: "2025.03 ~ 2025.10 · 팀 프로젝트",
    scope: "백엔드 도메인 ERD · 감정 예측 모델 · 게임 결과 검증 흐름",
    badges: ["XGBoost 감정 예측", "합성 데이터 Cold Start"],
    links: [], // GitHub 링크가 노션 원본에 미기재 — 확인 후 추가
    stack: ["Python", "FastAPI", "XGBoost", "React", "PostgreSQL", "Docker"],
    why: [],
    decisions: [
      {
        title: "Cold Start: 실 데이터 없이 감정 예측 모델을 시작해야 했다",
        problem: "서비스 초기에는 실제 사용자 행동 로그가 없어 모델 학습이 불가능했다.",
        solution: [
          "행동 패턴 규칙을 정의해 10,000건의 합성 데이터를 생성하고 XGBoost 모델을 학습시켰다",
          "테스트셋 기준 R² 0.9964·RMSE 0.22를 확인했으며, 이 수치는 합성 데이터 기준임을 함께 명시한다",
        ],
      },
      {
        title: "Pygame 코드를 React 웹 환경으로 전환한 전략",
        problem: "초기 미니게임을 Pygame으로 구현했지만 웹 서비스와의 통합이 불가능했다.",
        solution: [
          "Pygame 코드를 설계도로 전환해 게임 로직·상태·이벤트를 React 컴포넌트 구조로 재구현하는 방식을 선택했다",
        ],
      },
    ],
    screens: [],
    result: "2025.03 ~ 2025.10 완성",
  },
];
```

- [ ] **Step 4: 타입 체크로 검증**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat: 프로필·프로젝트 콘텐츠 타입 및 데이터 추가"
```

---

### Task 4: UI 원자 컴포넌트

**Files:**
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/LinkButton.tsx`

**Interfaces:**
- Consumes: 없음 (순수 프레젠테이션 컴포넌트)
- Produces: `Badge({ children: string })`, `LinkButton({ href: string, children: string })` — Task 7이 이 컴포넌트를 씀

- [ ] **Step 1: components/ui/Badge.tsx 작성**

```tsx
export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center border border-[var(--color-hairline)] px-3 py-1 text-xs tracking-[var(--tracking-wide)] uppercase text-muted">
      {children}
    </span>
  );
}
```

- [ ] **Step 2: components/ui/LinkButton.tsx 작성**

```tsx
import Link from "next/link";

export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      className="btn"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: Badge, LinkButton 원자 컴포넌트 추가"
```

---

### Task 5: 스크롤 스파이 로직 + 훅

활성 섹션을 고르는 판단 로직(`pickActiveSection`)을 훅에서 분리해 DOM 없이 단위 테스트한다.

**Files:**
- Create: `lib/pickActiveSection.ts`
- Create: `lib/pickActiveSection.test.ts`
- Create: `lib/useScrollSpy.ts`

**Interfaces:**
- Produces: `pickActiveSection(entries: SectionVisibility[], previousId: string | null): string | null`, `useScrollSpy(sectionIds: string[]): string | null` — Task 6이 이 훅을 씀

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/pickActiveSection.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { pickActiveSection } from "./pickActiveSection.ts";

test("returns the id with the highest intersection ratio", () => {
  const result = pickActiveSection(
    [
      { id: "a", ratio: 0.2, isIntersecting: true },
      { id: "b", ratio: 0.8, isIntersecting: true },
    ],
    null
  );
  assert.equal(result, "b");
});

test("falls back to the previous id when nothing intersects", () => {
  const result = pickActiveSection(
    [{ id: "a", ratio: 0, isIntersecting: false }],
    "b"
  );
  assert.equal(result, "b");
});

test("returns null when nothing intersects and there is no previous id", () => {
  const result = pickActiveSection([], null);
  assert.equal(result, null);
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `node --experimental-strip-types --test lib/pickActiveSection.test.ts`
Expected: FAIL — `Cannot find module './pickActiveSection.ts'` 또는 `pickActiveSection is not a function`

- [ ] **Step 3: 최소 구현 작성**

`lib/pickActiveSection.ts`:

```ts
export interface SectionVisibility {
  id: string;
  ratio: number;
  isIntersecting: boolean;
}

export function pickActiveSection(
  entries: SectionVisibility[],
  previousId: string | null
): string | null {
  const visible = entries.filter((entry) => entry.isIntersecting);
  if (visible.length === 0) return previousId;
  return visible.reduce((best, entry) => (entry.ratio > best.ratio ? entry : best))
    .id;
}
```

- [ ] **Step 4: 테스트 실행 → 통과 확인**

Run: `node --experimental-strip-types --test lib/pickActiveSection.test.ts`
Expected: PASS — 3개 테스트 모두 통과

- [ ] **Step 5: useScrollSpy 훅 작성**

`lib/useScrollSpy.ts` (ponytail: 각 콜백 배치가 변경된 엔트리만 주므로, 관찰 중인 전체 섹션의 마지막 상태를 Map에 누적해 비교한다):

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import { pickActiveSection, type SectionVisibility } from "./pickActiveSection";

export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);
  const activeIdRef = useRef(activeId);
  const visibilityRef = useRef(new Map<string, SectionVisibility>());
  activeIdRef.current = activeId;

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (observerEntries) => {
        for (const entry of observerEntries) {
          visibilityRef.current.set(entry.target.id, {
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            isIntersecting: entry.isIntersecting,
          });
        }
        const next = pickActiveSection(
          Array.from(visibilityRef.current.values()),
          activeIdRef.current
        );
        setActiveId(next);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

- [ ] **Step 6: 타입 체크로 검증**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 7: Commit**

```bash
git add lib/
git commit -m "feat: 스크롤 스파이 로직(pickActiveSection) + useScrollSpy 훅 추가"
```

---

### Task 6: 목차 내비게이션 (SectionNav + 모바일 진행률 바)

**Files:**
- Create: `components/nav/SectionNav.tsx`
- Create: `components/nav/ScrollProgressBar.tsx`

**Interfaces:**
- Consumes: `useScrollSpy` (Task 5)
- Produces: `SectionNav({ items: { id: string; label: string }[] })`, `ScrollProgressBar()` — Task 8이 `app/page.tsx`에서 조립

- [ ] **Step 1: components/nav/SectionNav.tsx 작성**

오른쪽 고정, 점+헤어라인 트랙, 활성 섹션만 라벨 상시 노출, 호버 시 전체 라벨.

```tsx
"use client";

import { useScrollSpy } from "@/lib/useScrollSpy";

interface SectionNavItem {
  id: string;
  label: string;
}

export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const activeId = useScrollSpy(items.map((item) => item.id));

  return (
    <nav
      aria-label="목차"
      className="fixed top-1/2 right-6 z-10 hidden -translate-y-1/2 md:block"
    >
      <div className="relative flex flex-col items-end gap-6 pr-3">
        <div
          aria-hidden
          className="absolute top-0 right-[3px] bottom-0 w-px bg-[var(--color-hairline)]"
        />
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a key={item.id} href={`#${item.id}`} className="group flex items-center gap-2">
              <span
                className={
                  isActive
                    ? "text-xs tracking-[var(--tracking-wide)] text-text opacity-100 transition-opacity"
                    : "text-xs tracking-[var(--tracking-wide)] text-muted opacity-0 transition-opacity group-hover:opacity-100"
                }
              >
                {item.label}
              </span>
              <span
                className={
                  isActive
                    ? "h-2 w-2 rounded-full bg-[var(--color-text)]"
                    : "h-1.5 w-1.5 rounded-full bg-[var(--color-muted)]"
                }
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: components/nav/ScrollProgressBar.tsx 작성**

```tsx
"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-10 h-1 bg-[var(--color-hairline)] md:hidden">
      <div
        className="h-full bg-[var(--color-text)] transition-[width]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
git add components/nav/
git commit -m "feat: 오른쪽 목차 내비게이션 + 모바일 진행률 바 추가"
```

---

### Task 7: 프로필/프로젝트 섹션 컴포넌트

**Files:**
- Create: `components/sections/ProfileSection.tsx`
- Create: `components/sections/ProjectSection.tsx`

**Interfaces:**
- Consumes: `Profile`, `Project` 타입(Task 3), `Badge`, `LinkButton`(Task 4)
- Produces: `ProfileSection({ profile: Profile })`, `ProjectSection({ project: Project })` — Task 8이 `app/page.tsx`에서 조립

- [ ] **Step 1: components/sections/ProfileSection.tsx 작성**

```tsx
import type { Profile } from "@/content/types";
import { LinkButton } from "@/components/ui/LinkButton";

export function ProfileSection({ profile }: { profile: Profile }) {
  return (
    <section id="profile" className="section reveal">
      <div className="page-shell grid gap-[var(--space-6)] md:grid-cols-2">
        <div>
          <h1>{profile.name}</h1>
          <p className="text-muted">{profile.title}</p>
          <p className="mt-[var(--space-2)]">{profile.oneLiner}</p>
          <p className="mt-[var(--space-2)] text-sm text-muted">{profile.email}</p>
          <div className="mt-[var(--space-2)] flex gap-4">
            {profile.links.map((link) => (
              <LinkButton key={link.label} href={link.href}>
                {link.label}
              </LinkButton>
            ))}
          </div>
        </div>
        <div className="space-y-[var(--space-4)]">
          <TimelineGroup title="학력" entries={profile.education} />
          <TimelineGroup title="경력" entries={profile.experience} />
          <TimelineGroup title="교육" entries={profile.training} />
          <TimelineGroup title="수상" entries={profile.awards} />
          <div>
            <h3>자격</h3>
            <p className="text-muted">{profile.certifications.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineGroup({
  title,
  entries,
}: {
  title: string;
  entries: { period: string; desc: string }[];
}) {
  if (entries.length === 0) return null;
  return (
    <div>
      <h3>{title}</h3>
      <ul className="mt-[var(--space-1)] space-y-1">
        {entries.map((entry) => (
          <li key={entry.desc} className="text-sm">
            <span className="text-muted">{entry.period}</span> — {entry.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: components/sections/ProjectSection.tsx 작성**

```tsx
import type { Project } from "@/content/types";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";

export function ProjectSection({ project }: { project: Project }) {
  return (
    <section id={project.id} className="section reveal">
      <div className="page-shell">
        <header className="section-title">
          <p className="text-sm text-muted">{project.meta}</p>
          <h2>
            {project.icon} {project.title}
          </h2>
          <p>{project.oneLiner}</p>
          <p className="text-sm text-muted">{project.scope}</p>
          {project.badges.length > 0 && (
            <div className="mt-[var(--space-2)] flex flex-wrap justify-center gap-2">
              {project.badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          )}
          {project.links.length > 0 && (
            <div className="mt-[var(--space-2)] flex justify-center gap-4">
              {project.links.map((link) => (
                <LinkButton key={link.label} href={link.href}>
                  {link.label}
                </LinkButton>
              ))}
            </div>
          )}
        </header>

        <p className="mt-[var(--space-4)] text-center text-sm text-muted">
          {project.stack.join(" · ")}
        </p>

        {project.why.length > 0 && (
          <ul className="mx-auto mt-[var(--space-4)] max-w-[var(--content-width)] space-y-2">
            {project.why.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}

        {project.decisions.map((decision) => (
          <div
            key={decision.title}
            className="mx-auto mt-[var(--space-6)] max-w-[var(--content-width)]"
          >
            <h3>{decision.title}</h3>
            <p className="text-muted">{decision.problem}</p>
            <ul className="mt-[var(--space-2)] space-y-2">
              {decision.solution.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}

        <p className="mt-[var(--space-6)] text-center text-sm text-muted">
          {project.result}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
git add components/sections/
git commit -m "feat: ProfileSection, ProjectSection 컴포넌트 추가"
```

---

### Task 8: 페이지 조립 + reveal 스크롤 애니메이션

**Files:**
- Create: `components/RevealObserver.tsx`
- Modify: `app/page.tsx` (create-next-app 기본 보일러플레이트 전체 교체)
- Modify: `app/layout.tsx` (metadata를 프로필 정보로 교체)

**Interfaces:**
- Consumes: `profile`, `projects`(Task 3), `SectionNav`, `ScrollProgressBar`(Task 6), `ProfileSection`, `ProjectSection`(Task 7)
- Produces: 동작하는 홈페이지 — 이 태스크가 스캐폴딩의 최종 조립 지점

- [ ] **Step 1: components/RevealObserver.tsx 작성**

`design-tokens.css` 주석의 "JS에서 is-visible 토글" 요구사항 구현.

```tsx
"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
```

- [ ] **Step 2: app/page.tsx 전체 교체**

```tsx
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { SectionNav } from "@/components/nav/SectionNav";
import { ScrollProgressBar } from "@/components/nav/ScrollProgressBar";
import { RevealObserver } from "@/components/RevealObserver";

const navItems = [
  { id: "profile", label: "프로필" },
  ...projects.map((project) => ({ id: project.id, label: project.title })),
];

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <SectionNav items={navItems} />
      <RevealObserver />
      <main>
        <ProfileSection profile={profile} />
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </main>
    </>
  );
}
```

- [ ] **Step 3: app/layout.tsx의 metadata 교체**

`app/layout.tsx`에서 create-next-app이 생성한 `export const metadata` 블록을 찾아 아래로 바꾼다.

```tsx
export const metadata: Metadata = {
  title: "임채현 — Backend Developer",
  description: "문제를 정확하게 정의하고, 설계로 풀어내는 백엔드 개발자 포트폴리오",
};
```

- [ ] **Step 4: 빌드로 검증**

Run: `npm run build`
Expected: `Compiled successfully`, 에러 없음

- [ ] **Step 5: Commit**

```bash
git add app/ components/RevealObserver.tsx
git commit -m "feat: 홈페이지 조립 — 프로필+6프로젝트 스크롤 페이지 완성"
```

---

### Task 9: 최종 검증

**Files:** 없음 (검증만)

- [ ] **Step 1: 전체 테스트 실행**

Run: `node --experimental-strip-types --test lib/pickActiveSection.test.ts`
Expected: PASS

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: 에러 없음 (경고는 허용)

- [ ] **Step 4: 프로덕션 빌드**

Run: `npm run build`
Expected: `Compiled successfully`

- [ ] **Step 5: 개발 서버로 수동 확인**

Run: `npm run dev`
브라우저에서 http://localhost:3000 접속해 아래를 눈으로 확인:
- 프로필 → 6개 프로젝트가 위→아래 스크롤로 이어지는지
- 오른쪽 목차의 점+헤어라인이 보이고, 스크롤에 따라 활성 라벨이 바뀌는지
- 섹션이 스크롤에 따라 페이드인(`.reveal`)되는지
- 모바일 폭(< 768px)에서 목차가 숨고 상단 진행률 바가 보이는지

확인 후 서버 종료 (Ctrl+C).

- [ ] **Step 6: 커밋 히스토리 확인**

```bash
git log --oneline -10
git status
```

Expected: 워킹 트리 clean, Task 1~8의 커밋이 순서대로 남아있음

---

## 범위에서 제외한 것 (스펙과 동일)

- 프로젝트 스크린샷 — `screens: []`로 비워둠. 실제 화면 캡처 후 `public/images/`에 추가하고 데이터를 채우는 건 별도 콘텐츠 작업.
- 동아리모아·노소공의 GitHub 링크 — 노션 원본에 URL이 없어 빈 배열로 둠. 확인 후 추가.
- 다이어그램 이미지(`diagram` 필드) — 타입만 정의, 데이터에는 채우지 않음.
- 다크모드, 애니메이션 라이브러리, 프로젝트별 개별 라우트 — 스펙에서 이미 범위 밖으로 명시.
