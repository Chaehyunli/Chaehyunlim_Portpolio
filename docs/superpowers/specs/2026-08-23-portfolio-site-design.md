# 포트폴리오 웹사이트 설계

날짜: 2026-08-23
상태: 승인됨 — 구현 계획 대기

## 배경

노션 `HERMES → Portfolio → 포트폴리오 웹 사이트` 하위에 6개 프로젝트(모두약속, Masil, Searchive, PETNER, 동아리모아·노소공)와 프로필 화면의 콘텐츠 구성안, 그리고 이를 실제 화면으로 옮길 때의 공통 작성 가이드(00-1)가 문서화되어 있다. 이 스펙은 그 콘텐츠를 Next.js + Vercel 기반 실제 웹사이트로 옮기기 위한 기술 스택과 프로젝트 구조를 정의한다.

리포 초기 상태: `design-tokens.css`(무채색 3색, 라이트 테마 고정, 절제된 페이드 모션, 8px 기준 확장 스페이싱 스케일 — "Next.js 사용 시 app/globals.css로 그대로 옮겨서 쓰면 됩니다"라는 주석 포함)와 `.claude/settings.json`(Notion MCP 권한)만 존재. 코드베이스는 없음.

## 사이트 구조

**단일 스크롤 페이지.** 채용담당자가 클릭 없이 위→아래 스크롤만으로 전체 내용(프로필 → 모두약속 → Masil → Searchive → PETNER → 동아리모아·노소공)을 볼 수 있어야 한다는 게 핵심 요구사항. 별도 라우트로 프로젝트를 분리하지 않는다.

**오른쪽 고정 목차 내비게이션**을 얹는다:
- 점(dot) + 점들을 잇는 얇은 세로 헤어라인(`--color-hairline` 토큰 재사용) — 흩어진 점이 아니라 "하나의 트랙 위 정거장들"로 인지되게 함
- 활성 섹션의 점만 라벨을 상시 노출(예: `Masil`), 나머지는 점만 — 스크롤 내내 라벨 하나가 떠 있어야 "이건 눌리는 목차다"가 증명됨
- 호버 시 전체 라벨 노출
- 클릭 시 해당 섹션으로 `scrollIntoView({ behavior: 'smooth' })`
- 모바일에서는 숨기고 상단 얇은 스크롤 진행률 바로 대체

목차 항목은 프로필 + 6개 프로젝트 id 기준(개요/판단 세부 단위까지 목차에 넣지 않음 — 섹션 단위로 충분).

## 기술 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js 15 (App Router) + TypeScript | Vercel 배포가 이미 정해져 있어 가장 마찰 없는 조합 |
| 스타일 | Tailwind CSS v4 | v4의 `@theme` 블록은 CSS 커스텀 프로퍼티를 그대로 유틸리티 클래스로 승격시킨다. `design-tokens.css`의 `--color-*`, `--text-*`, `--ease-*` 네이밍이 Tailwind v4 네임스페이스와 대부분 일치해 토큰을 이중 정의하지 않고 기존 파일을 `@theme`로 감싸는 정도로 통합 가능 (v3였다면 별도 JS config에 토큰을 복제해야 했음) |
| 콘텐츠 | `content/projects.ts` (TS 데이터 배열) | 6개 프로젝트 고정 콘텐츠, 타입 안전, 빌드 타임 외부 의존성 없음 (MDX·Notion API 연동보다 가벼움) |
| 목차 내비 | 커스텀 컴포넌트 + `IntersectionObserver` 훅 | 외부 라이브러리 불필요, 30줄 내외로 충분 |
| 배포 | Vercel | Next.js 네이티브 지원, 별도 설정 불필요 |

### 스타일 통합 메모

- `--space-1..9`는 시맨틱 이름(숫자가 아니라 용도 기준 계단)이라 Tailwind v4의 기본 숫자 스페이싱 스케일과 이름이 충돌한다. 별도 `--spacing-*` 네임스페이스로 옮기지 않고, 컴포넌트에서 `p-[var(--space-4)]` 같은 임의값 클래스로 참조한다.
- `--color-*`, `--text-*`(폰트 사이즈), `--ease-*`, `--radius`는 네임스페이스가 그대로 맞으므로 `@theme` 블록에 그대로 선언해 `bg-bg`, `text-lg` 같은 표준 유틸리티로 즉시 사용 가능.
- 라이트 테마 고정이므로 다크모드 대응(`prefers-color-scheme` 분기, `dark:` variant)은 만들지 않는다.

## 폴더 구조

```
app/
  layout.tsx
  page.tsx                 # 프로필→6프로젝트 순서로 섹션 조립
  globals.css               # design-tokens.css를 이 위치로 이동 + @theme 블록 추가
components/
  sections/
    ProfileSection.tsx
    ProjectSection.tsx      # 프로젝트 1개를 렌더하는 재사용 컴포넌트
  nav/
    SectionNav.tsx           # 오른쪽 고정 도트+헤어라인 목차
  ui/                        # Badge, LinkButton 등 원자 컴포넌트
content/
  projects.ts                # 프로젝트 데이터 + 타입 정의
lib/
  useScrollSpy.ts             # IntersectionObserver 훅
public/
  images/                     # 프로젝트 스크린샷
docs/
  superpowers/specs/          # 브레인스토밍 스펙 문서 (본 문서)
.claude/
  settings.json               # 커밋 — MCP 권한 등 공유 설정
  settings.local.json         # gitignore — 로컬 전용 오버라이드
.gitignore
README.md
CLAUDE.md
next.config.ts
tsconfig.json
package.json
```

루트의 `design-tokens.css`는 구현 단계에서 `app/globals.css`로 이동하고 원본은 삭제한다.

## 콘텐츠 데이터 모델

노션 6개 페이지의 공통 구조(화면 1: 왜 만들었나·다이어그램 / 화면 2: 무엇에 부딪혔나(판단들) / 화면 3: 서비스 화면)를 타입으로 옮긴다.

```ts
interface Project {
  id: string;               // "masil"
  icon: string;              // "🧭"
  title: string;
  oneLiner: string;
  meta: string;               // "2026.03 ~ · 4인 팀"
  scope: string;               // 헤더의 "맡은 범위" 한 줄
  badges: string[];
  links: { label: string; href: string }[];
  stack: string[];
  why: string[];                // 왜 만들었나 bullets
  diagram?: { imageSrc?: string; caption: { label: string; reason: string }[] };
  decisions: { title: string; problem: string; solution: string[] }[];
  screens: { src: string; caption: string }[];
  result: string;                // 마무리 띠
}
```

00-1 공통 작성 가이드의 원칙에 따라 **문서용 표(나의 역할 표, 문서 상태 표, "꼭 보여야 할 것" 표, 의도적으로 뺀 것)는 데이터 모델에 포함하지 않는다** — 노션에만 남기고 화면·데이터에는 요약된 한 줄(scope)만 반영한다.

## .gitignore

표준 Next.js 무시 목록 + 프로젝트 특화 항목:

```
/node_modules
/.next/
/out/
/build
.env*.local
.vercel
*.tsbuildinfo

.DS_Store
*.log

# claude — settings.json은 커밋, 로컬 오버라이드만 무시
.claude/settings.local.json
```

## MD 파일

- **README.md** — 프로젝트 개요, 로컬 실행(`npm run dev`), Vercel 배포 안내, 폴더 구조 요약
- **CLAUDE.md** — 이후 세션이 반복 설명 없이 이어받을 규칙: 무채색 3색·라이트 테마 고정, 절제된 모션(`.reveal`), 노션 00-1 공통 가이드 요약(구성안 표 vs 실제 화면 구분, 문장 규칙), Tailwind↔CSS 변수 통합 방식
- **docs/superpowers/specs/2026-08-23-portfolio-site-design.md** — 본 문서

## 범위에서 제외한 것

- 다크모드 — 디자인 톤이 라이트 테마로 고정되어 있어 구현하지 않음
- 프로젝트별 개별 라우트 — 단일 스크롤 페이지 요구사항과 충돌
- MDX/Notion API 콘텐츠 연동 — 6개 프로젝트로 콘텐츠 규모가 고정적이라 TS 데이터 파일로 충분
- 애니메이션 라이브러리(Framer Motion 등) — `design-tokens.css`에 이미 정의된 `.reveal` CSS 트랜지션 + `IntersectionObserver`만으로 충분
