# CLAUDE.md

이 리포에서 작업할 때 지켜야 할 규칙. 설계 배경 전체는 [docs/superpowers/specs/2026-08-23-portfolio-site-design.md](./docs/superpowers/specs/2026-08-23-portfolio-site-design.md).

> **2026-08-25 개정**: 디자인 톤을 무채색 3색 고정 → 토스(Toss) 스타일로 전면 전환. 사이트 구조도 단일 스크롤 → 홈(카드 그리드) + 프로젝트별 상세 페이지로 전환. 이전 버전(무채색·단일 스크롤)은 git 히스토리에서 확인 가능.

## 디자인 톤 (고정값, 바꾸지 않음)

- 컬러 팔레트는 `app/globals.css`의 `@theme`에 정의된 토스 스타일 토큰만 쓴다: 배경(`--color-bg` #f2f4f6) · 카드(`--color-card` #fff) · 텍스트(`--color-text` #191f28) · 보조 텍스트(`--color-sub`) · 흐린 텍스트(`--color-muted`) · 테두리(`--color-border`) · 액센트 블루(`--color-blue`/`--color-blue-bg`) · 상태색 4종(green/purple/orange/gray, 각각 `-bg` 페어). 이 팔레트 밖의 hex를 컴포넌트에 하드코딩하지 않는다.
- 라이트 테마 단일 고정. 다크모드 분기(`prefers-color-scheme`, `dark:` variant)를 만들지 않는다.
- 폰트: 본문은 Inter(`--font-sans`), 캡션·라벨·스택 태그·다이어그램은 JetBrains Mono(`--font-mono`)로 구분한다.
- 모션은 `.reveal` 클래스의 절제된 페이드/translateY 하나만 쓴다(항목마다 `transitionDelay`로 스태거 가능). 새 애니메이션 라이브러리(Framer Motion 등)를 들여오지 않는다.
- radius는 완전히 0이 아니라 카드형(`--radius-card` 20px) · 중간(`--radius-md` 16px) · 작음(`--radius-sm` 12px) · 알약(`--radius-pill`, 칩/태그) 스케일을 쓴다. 각진 모서리로 되돌리지 않는다.
- 카드에는 은은한 그림자(`--shadow-card`, hover 시 `--shadow-card-hover`)를 쓴다. 카드 배경은 흰색, 페이지 배경은 연한 회색.
- 여백을 넉넉히 쓴다(`--space-*` 스케일). 밀도를 높이는 방향으로 조정하지 않는다.

## 사이트 구조

- 홈(`app/page.tsx`)은 카드형 랜딩: 프로필 히어로 카드 + 학력·경력 카드 + 프로젝트 카드 그리드(`ProjectCard`, `content/projects.ts` 순서 그대로).
- 프로젝트마다 별도 라우트 `app/[projectId]/page.tsx` (동적 세그먼트, `generateStaticParams`로 6개 프로젝트 정적 생성). 카드를 클릭하면 해당 프로젝트 상세 페이지로 이동 — 단일 스크롤로 되돌리지 않는다.
- 상세 페이지는 상단 고정 바(← 목록 링크 + 상태 칩) + 왼쪽 sticky 사이드바(기간·역할·하이라이트·스택·링크) + 오른쪽 스크롤 본문(소개, 다이어그램, 판단, 서비스 화면) 2단 구조를 유지한다.
- 오른쪽 고정 목차 내비게이션은 다중 페이지 구조와 맞지 않아 제거했다 — 페이지 이동은 카드 클릭 + 상세 페이지 상단의 "← 목록" 링크로 처리한다.

## 콘텐츠 작성 규칙 (노션 00-1 공통 작성 가이드 요약)

노션의 각 프로젝트 구성안에는 "문서용" 표(나의 역할 표, 문서 상태 표, "꼭 보여야 할 것" 표, 의도적으로 뺀 것)가 있다. **이 표들은 화면에 그대로 옮기지 않는다:**

| 구성안의 요소 | 실제 화면에서는 |
|---|---|
| 서사 한 줄 | 안 나감 — 방향을 잃지 않기 위한 내부 기준선 |
| 프로젝트 정보 표 | 상세 페이지 사이드바의 메타·링크로 압축 |
| 나의 역할 표 | 사이드바의 "맡은 역할" 한 줄로 압축 (`Project.scope`) |
| 문서 상태 표 / 꼭 보여야 할 것 표 / 의도적으로 뺀 것 | 안 나감 |

문장 규칙:
- 무주어 서술 금지. "…를 두었다" → "…를 설계해 넣었다", "…가 있다" → "…를 구현했다"로 행위 동사를 쓴다.
- 수치를 쓸 때는 측정 조건을 함께 명시한다 (예: "250ms → 10ms"만 쓰지 않고 "키워드 5개 기준"을 붙인다).
- `SolutionPoint`(label/detail 캡션 리스트)는 label에 배지·헤더에 이미 있는 말을 반복하지 않는다.
- `problem`(문제 상황)은 서술형 문단, `solution`/`why`/`diagramCaptions`(핵심 포인트)는 "굵은 키워드 — 짧은 결과" 캡션형으로 쓴다. 두 톤을 한 항목 안에서 섞지 않는다.

프로젝트별 분량(무게 배분, 임의로 늘리지 않음):

| 프로젝트 | 분량 | 주인공 |
|---|---|---|
| 모두약속 | 3장 분량 | BYOK 보안 설계 + LLM·알고리즘 경계 |
| Masil | 3장 분량 | AI Agent 파이프라인 + 요청 분류 설계 |
| Searchive | 2장 분량 | 검색 병목 추적 + 태그 품질 설계 |
| PETNER | 1장 분량 | WebSocket 세션 인증 + Soft Delete |
| 동아리모아·노소공 | 각 1장 분량, 가볍게 | 스택과 판단 2개씩만 |

카드 그리드 구조상 6개 프로젝트가 각자 독립 카드/페이지를 갖지만, 위 분량 배분(판단 개수·본문 길이)은 그대로 지킨다 — 동아리모아·노소공을 다른 프로젝트만큼 무겁게 채우지 않는다.

## 다이어그램·이미지 레이아웃

프로젝트 상세 페이지마다 다이어그램/스크린샷/설명 텍스트를 배치할 때 아래 순서와 톤을 기본값으로 재사용한다 — 페이지마다 새로 디자인하지 않는다.

- 다이어그램(또는 대표 이미지)을 본문 상단에 전체 폭으로 두고, 스크린샷 + 설명 텍스트는 그 아래 `ImagePointsGrid`로 배치한다. 이 컴포넌트는 텍스트 리스트를 이미지와 같은 높이로 늘려(`stretch` + `justify-between`) 항목 개수에 따라 균등 분배한다 — 절대 간격값을 쓰지 않는다.
- 스크린샷은 `FramedImage`로 통일 — 모서리 둥글게(`rounded-md`) + 그림자(`shadow-card`) + 바로 아래 모노 폰트 캡션. 실제 사진이 섞여도 다이어그램과 톤이 끊기지 않게 한다.
- 다이어그램 노드가 실제 실행 순서를 가지면(파이프라인, 요청 처리 흐름 등) Step 번호를 라벨로 명시한다 — 장식용 번호가 아니라 실제 순서 정보라 허용.
- LLM 처리와 알고리즘 처리가 섞인 다이어그램은 실선(알고리즘, `--color-border` 회색) / 점선(LLM, `--color-blue` 파랑) 테두리로 구분한다. 그 외 색은 쓰지 않는다.
- 홈 카드 그리드의 썸네일은 프로젝트의 `introScreen` 또는 `screens[0]`을 쓰고, 실제 화면이 아직 없는 프로젝트만 아이콘 단독 표시로 대체한다(`ProjectCard` 참고) — 아이콘을 이미지보다 우선하지 않는다.

## 스타일 통합 (Tailwind v4 ↔ CSS 변수)

- `app/globals.css`의 `--color-*`, `--text-*`(폰트 사이즈), `--radius-*`, `--shadow-*`는 Tailwind v4 `@theme` 네임스페이스와 이름이 맞으므로 그대로 선언해 `bg-blue`, `text-sub`, `rounded-card`, `shadow-card` 같은 표준 유틸리티로 쓴다.
- `--space-1..9`는 시맨틱 이름이라 Tailwind 기본 숫자 스페이싱 스케일과 이름이 충돌한다. 리네이밍하지 않고 `p-[var(--space-4)]`처럼 임의값 클래스로 참조한다.
- 새 색상·spacing 토큰이 필요하면 `app/globals.css`의 `@theme`/`:root`에 먼저 추가하고, 컴포넌트에서 하드코딩된 hex/px 값을 쓰지 않는다. 색은 반드시 위 팔레트(blue/green/purple/orange/gray + 뉴트럴) 안에서 고른다.
- `@import "tailwindcss";` 뒤에 오는 리셋·컴포넌트 CSS는 반드시 `@layer base { }`로 감싼다 — 감싸지 않으면 unlayered 취급되어 캐스케이드 우선순위가 utilities 레이어보다 항상 높아지고, margin 계열 유틸리티(`mt-*`, `space-y-*`)가 무효화된다 (2026-08-25에 실제로 겪은 버그).

## 콘텐츠 데이터

프로젝트 콘텐츠는 `content/projects.ts`의 `Project[]`에서만 관리한다. 컴포넌트에 텍스트를 하드코딩하지 않는다. `introScreen`/`diagramSrc`/`diagramCaptions`/`heroScreen`은 옵셔널 — 아직 상세 콘텐츠를 안 채운 프로젝트는 카드 정보(`icon`/`title`/`oneLiner`/`meta`/`scope`/`status`/`badges`/`links`/`stack`)만으로도 카드와 상세 페이지 뼈대가 정상 렌더된다.

## 참고 자산

`Developer Portfolio Website Design/`은 Figma Make로 뽑은 디자인 참고용 export다. 실제 프로젝트 콘텐츠가 아니라 전부 가짜 예시 데이터(Toss Fintech, Nexus 등)이므로 절대 그대로 가져다 쓰지 않는다 — 색·타이포·컴포넌트 패턴만 참고해 위 팔레트/구조로 옮겨온 상태다. `.gitignore`·`tsconfig.json`·`eslint.config.mjs`에서 빌드·린트·커밋 대상 밖으로 제외돼 있다.
