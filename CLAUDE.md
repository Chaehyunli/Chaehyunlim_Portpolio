# CLAUDE.md

이 리포에서 작업할 때 지켜야 할 규칙. 설계 배경 전체는 [docs/superpowers/specs/2026-08-23-portfolio-site-design.md](./docs/superpowers/specs/2026-08-23-portfolio-site-design.md).

> **2026-08-25 개정**: 디자인 톤을 무채색 3색 고정 → 토스(Toss) 스타일로 전면 전환. 사이트 구조도 단일 스크롤 → 홈(카드 그리드) + 프로젝트별 상세 페이지로 전환. 이전 버전(무채색·단일 스크롤)은 git 히스토리에서 확인 가능.
>
> **2026-08-29 개정**: 상세 페이지를 모두약속 기준으로 표준화 — 슬라이드 3장 + `Divider`, 판단 본문 STAR(S&T/Action/Result) 구조, 판단 이미지 3행 그리드, `BlockHeading`·`DecisionBlock`·`StarBlock`·`SolutionPoints`·`Divider` 컴포넌트. 아래 「상세 페이지 = 데이터로 조립」 참고.

## 디자인 톤 (고정값, 바꾸지 않음)

- 컬러 팔레트는 `app/globals.css`의 `@theme`에 정의된 토스 스타일 토큰만 쓴다: 배경(`--color-bg` #f2f4f6) · 카드(`--color-card` #fff) · 텍스트(`--color-text` #191f28) · 보조 텍스트(`--color-sub`) · 흐린 텍스트(`--color-muted`) · 테두리(`--color-border` #e5e8eb) · 진한 구분선(`--color-border-strong` #d1d6db, `Divider`·상단 바용) · 액센트 블루(`--color-blue`/`--color-blue-bg`) · 상태색 4종(green/purple/orange/gray, 각각 `-bg` 페어). 이 팔레트 밖의 hex를 컴포넌트에 하드코딩하지 않는다.
- 라이트 테마 단일 고정. 다크모드 분기(`prefers-color-scheme`, `dark:` variant)를 만들지 않는다.
- 폰트: 본문은 Inter(`--font-sans`), 캡션·라벨·스택 태그·다이어그램은 JetBrains Mono(`--font-mono`)로 구분한다.
- 모션은 `.reveal` 클래스의 절제된 페이드/translateY 하나만 쓴다(항목마다 `transitionDelay`로 스태거 가능). 새 애니메이션 라이브러리(Framer Motion 등)를 들여오지 않는다.
- radius는 완전히 0이 아니라 카드형(`--radius-card` 20px) · 중간(`--radius-md` 16px) · 작음(`--radius-sm` 12px) · 알약(`--radius-pill`, 칩/태그) 스케일을 쓴다. 각진 모서리로 되돌리지 않는다.
- 카드에는 은은한 그림자(`--shadow-card`, hover 시 `--shadow-card-hover`)를 쓴다. 카드 배경은 흰색, 페이지 배경은 연한 회색.
- 여백을 넉넉히 쓴다(`--space-*` 스케일). 밀도를 높이는 방향으로 조정하지 않는다.

## 사이트 구조

- 홈(`app/page.tsx`)은 카드형 랜딩: `HeroCard`(2단 — 왼쪽 신원 / 오른쪽 한 줄 정의 + `profile.focus` 강점 칩 + PDF 버튼) → `AboutCard`(About 불릿 + `profile.skills` 카테고리 그리드 한 카드) → `CareerCard`(`content/career.ts`, 인턴 1장) → `TimelineCard`(학력·교육·자격) → 프로젝트 카드 그리드(`ProjectCard`, `content/projects.ts` 순서 그대로).
- 프로젝트마다 별도 라우트 `app/[projectId]/page.tsx` (동적 세그먼트, `generateStaticParams`로 6개 프로젝트 정적 생성). 카드를 클릭하면 해당 프로젝트 상세 페이지로 이동 — 단일 스크롤로 되돌리지 않는다.
- `app/print/page.tsx` = 포트폴리오 전체 PDF의 렌더 소스. `PortfolioPrint`가 표지(프로필·About·Skills·경력·학력) + 6개 프로젝트(가로 메타 헤더 + `ProjectBody`)를 한 문서로 렌더한다. `npm run pdf`(= `next build && node scripts/generate-pdf.mjs`)가 Puppeteer로 `/print`를 인쇄해 `public/portfolio.pdf`를 만든다(수동 실행 후 커밋). 페이지 나눔은 `app/globals.css`의 `@media print` + `.pf-print` 규칙.
- 상세 본문 렌더는 `ProjectBody` 하나로 통일 — `ProjectDetail`(사이드바 레이아웃)과 `PortfolioPrint`(전체 PDF)가 공유한다. 본문 로직은 `ProjectBody`에만.
- 상세 페이지(`ProjectDetail`)는 **모두약속을 표준 템플릿**으로 삼는다. 상단 고정 바(← 목록 blue pill + 상태 칩) + 왼쪽 sticky 사이드바(기간·형태 / 맡은 역할 / 스택 / 링크 — 모두 가운데 정렬 칩. `meta`·`scope`는 ` · ` 분해해 gray `Chip`, 스택은 mono `Tag`) + 오른쪽 본문(`ProjectBody`). 본문은 **슬라이드 3장**을 `Divider`로 나눈다:
  1. **개요·동작** — 제목·한 줄 정의 → `배경 / 왜 만들었나`(`introScreen` + `why`) → `설계 / 어떻게 동작하나`(`diagramSrc` 다이어그램 + `heroScreen` + `diagramCaptions`)
  2. **판단** — `판단 01/02/…` 카드(`DecisionBlock`). 판단 **사이에도** `Divider`를 넣는다.
  3. **서비스 화면·결과** — `screens` 2열 그리드 + `result` 성과 한 줄
- 슬라이드·판단 소제목은 전부 `BlockHeading`(모노 블루 eyebrow + 굵은 h3) 하나로 통일한다.
- 오른쪽 고정 목차 내비게이션은 다중 페이지 구조와 맞지 않아 제거했다 — 페이지 이동은 카드 클릭 + 상세 페이지 상단의 "← 목록" 링크로 처리한다.

## 상세 페이지 = 데이터로 조립

`ProjectDetail`은 `Project` 하나를 받아 렌더할 뿐, 레이아웃 분기는 전부 **데이터 필드 유무**로 결정된다. 새 프로젝트 페이지를 모두약속처럼 만들려면 컴포넌트를 건드리지 말고 `content/projects.ts`의 필드를 채운다.

| 채우는 필드 | 나오는 레이아웃 |
|---|---|
| `introScreen` + `why[]` | 슬라이드 1 `배경 / 왜 만들었나` — `ImagePointsGrid` |
| `showcaseScreen` + `showcasePoints[]` | 슬라이드 1 `사용 흐름` — 사용자 흐름 설명과 스크린샷을 2단으로 묶음. points가 없으면 단독 스크린샷. 프로젝트 맥락에 따라 `showcaseEyebrow`·`showcaseTitle`로 소제목을 지정 |
| `diagramSrc` (+`heroScreen`+`diagramCaptions[]`) | 슬라이드 1 `설계 / 어떻게 동작하나` — 단일 다이어그램 전체 폭 + 캡션 그리드 |
| `diagrams[]` | 한 장으로 축소하면 읽기 어려운 흐름을 단계별 다이어그램 여러 장으로 렌더. 값이 있으면 `diagramSrc`보다 우선 |
| `decisions[].considerations[]` **또는** `.outcome` | 그 판단이 **STAR 모드**(S&T / Action / Result 3단락). 둘 다 없으면 compact(제목 + 문단 + 카드) |
| `decisions[].image` | 그 판단이 **3행 그리드**(S&T 헤더 전체 폭 / Action·이미지 좌우 / Result 푸터 전체 폭). 이미지는 Action 높이 안에서 세로 가운데(`self-center`) |
| `decisions[].diagram` | 해당 판단의 설계 구간을 S&T와 Action 사이에 전체 폭으로 표시. 노드 텍스트를 읽기 위해 Action 옆으로 축소하지 않음 |
| `decisions[].order` | 데이터 배열과 다르게 실제 처리 흐름 순서로 판단을 보여줄 때 지정 |
| `screens[]` | 슬라이드 3 서비스 화면 2열 그리드 |
| `result` | 슬라이드 3 맨 끝 조용한 한 줄 (`border-t` + 모노 `성과` 라벨 + `text-sub` 본문, 필수). 박스·색 없음 — 판단별 Result(`StarBlock`)와 겹치지 않게 |

가벼운 프로젝트(동아리모아·노소공)도 판단·행동·결과가 빠지지 않도록 **짧은 STAR**를 사용한다. 판단마다 `considerations`는 1~2개, `solution`은 2개 안팎, `outcome`은 한 문단으로 제한하고 실제 결과를 보여주는 화면만 `image`로 연결한다. 무게 배분은 별도 레이아웃이 아니라 데이터 분량으로 조절한다.

### 컴포넌트 인벤토리

| 컴포넌트 | 역할 | 재사용 규칙 |
|---|---|---|
| `ui/BlockHeading` | 슬라이드·판단 공통 소제목 | eyebrow=짧은 라벨(`배경`/`설계`/`판단 01`), title이 내용. 새 소제목은 전부 이걸로 |
| `sections/DecisionBlock` | 판단 하나 렌더 (STAR/compact + 이미지 그리드 분기) | `ProjectDetail`이 `decisions.map`으로 호출. 판단 렌더 로직은 여기에만 |
| `ui/StarBlock` | STAR 단락 1개 — 좌측 색 보더 + 모노 라벨 | tone `situation`(회색)·`action`(파랑)·`result`(초록) 3개 고정 |
| `ui/SolutionPoints` | Action 박스 카드 리스트 | `stack`=단일 열(이미지 옆). label=판단, detail=근거·트레이드오프 |
| `ui/ImagePointsGrid` | 이미지 + 텍스트 카드 좌우, 카드를 **이미지 높이**에 균등 분배 | 캡션은 별도 행이라 카드 높이에 안 들어간다. 슬라이드 1 전용 |
| `ui/FramedImage` | 스크린샷 프레임(`rounded-md` + `shadow-card` + 모노 캡션) | 슬라이드 3 `screens` |
| `ui/Divider` | 슬라이드·판단 사이 구분선 (`border-border-strong`) | 절대 간격값 대신 이걸로 구획 |

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
- `SolutionPoint`의 label에 배지·헤더에 이미 있는 말을 반복하지 않는다.

판단(`ProjectDecision`) 필드별 톤 — STAR 기법에 맞춘다:
- `problem` = 마주한 상황을 **서술형 문단**으로. `considerations[]` = "기각한 대안 / 판단을 가른 기준"을 불릿로. 이 둘이 함께 **Situation & Task** 단락을 이룬다.
- `solution[]`(**Action**)은 캡션이 아니라 **판단 서술**이다: `label` = 내가 내린 판단(짧게), `detail` = 채택한 기술 + 근거 + 포기한 것을 1~2문장으로. Action이 판단의 주인공이므로 "굵은 키워드 — 짧은 결과"로 줄이지 않는다.
- `outcome`(**Result**) = 그 행동이 만든 유의미한 결과를 1~2문장 서술형으로.
- `why[]` / `diagramCaptions[]`는 여전히 "굵은 키워드 — 짧은 결과" 캡션형을 유지한다 (판단 본문과 다른 톤).

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

- **슬라이드 1**: 다이어그램은 `설계` 소제목 아래 본문 전체 폭 + `overflow-x-auto`(좁은 화면만 가로 스크롤). 스크린샷 + 설명 텍스트는 `ImagePointsGrid` — 텍스트 카드를 **캡션 뺀 이미지 높이**에 맞춰 늘려(`grid-rows` 분리 + `justify-between`) 항목 개수에 따라 균등 분배한다. 절대 간격값을 쓰지 않는다.
- 한 장의 다이어그램이 본문 폭에서 축소돼 노드 본문이 읽히지 않으면, 무조건 가로 스크롤을 강제하지 말고 `diagrams[]`로 의미 있는 단계 단위로 나눈다. 각 장의 본문 텍스트는 데스크톱 렌더 기준 최소 12px 이상을 유지한다.
- **판단 이미지**(`DecisionBlock`) — 이미지 종류로 레이아웃이 갈린다:
  - **와이드 데스크톱 목업**(모두약속): 3행 그리드. S&T·Result는 `col-span-2` 전체 폭(헤더/푸터), Action 카드와 이미지가 가운데 행에서 좌우(`3fr / 2fr`). 이미지는 Action 높이 안에서 `self-center`.
  - **세로 폰 목업**(`ProjectImage.narrow: true`, Masil): 좌우 2단. 텍스트 전체(S&T → Action → Result)를 왼쪽 한 컬럼에 쌓고 폰을 오른쪽 `340px` 트랙에 `self-start`. 폰이 길어 헤더/푸터로 나누면 컬럼에 빈 공간이 생겨서 이렇게 한다.
- 판단의 성능·처리 구조가 실제 UI 스크린샷으로 증명되지 않는다면, 근거 없는 결과 이미지를 만들지 않는다. `decisions[].diagram`을 S&T와 Action 사이 전체 폭으로 배치하고, 측정 결과는 조건을 포함한 Result 텍스트로 남긴다. 사용자 경험 화면은 `showcaseScreen`으로 개요에 둔다.
- `ImagePointsGrid`도 `image.narrow`면 이미지 트랙을 `340px`로 고정한다.
- 스크린샷은 `FramedImage`로 통일 — 모서리 둥글게(`rounded-md`) + 그림자(`shadow-card`) + 바로 아래 모노 폰트 캡션. 실제 사진이 섞여도 다이어그램과 톤이 끊기지 않게 한다.
- 다이어그램 노드가 실제 실행 순서를 가지면(파이프라인, 요청 처리 흐름 등) Step 번호를 라벨로 명시한다 — 장식용 번호가 아니라 실제 순서 정보라 허용.
- LLM 처리와 알고리즘 처리가 섞인 다이어그램은 실선(알고리즘, `--color-border` 회색) / 점선(LLM, `--color-blue` 파랑) 테두리로 구분한다. 그 외 색은 쓰지 않는다. 좁은 2단 본문 컬럼에 맞도록 가로로 길지 않게(모두약속 파이프라인 = 3칸 × 2줄) 그린다.
- 홈 카드 그리드의 썸네일은 프로젝트의 `introScreen` 또는 `screens[0]`을 쓰고, 실제 화면이 아직 없는 프로젝트만 아이콘 단독 표시로 대체한다(`ProjectCard` 참고) — 아이콘을 이미지보다 우선하지 않는다.

## 스타일 통합 (Tailwind v4 ↔ CSS 변수)

- `app/globals.css`의 `--color-*`, `--text-*`(폰트 사이즈), `--radius-*`, `--shadow-*`는 Tailwind v4 `@theme` 네임스페이스와 이름이 맞으므로 그대로 선언해 `bg-blue`, `text-sub`, `rounded-card`, `shadow-card` 같은 표준 유틸리티로 쓴다.
- `--space-1..9`는 시맨틱 이름이라 Tailwind 기본 숫자 스페이싱 스케일과 이름이 충돌한다. 리네이밍하지 않고 `p-[var(--space-4)]`처럼 임의값 클래스로 참조한다.
- 새 색상·spacing 토큰이 필요하면 `app/globals.css`의 `@theme`/`:root`에 먼저 추가하고, 컴포넌트에서 하드코딩된 hex/px 값을 쓰지 않는다. 색은 반드시 위 팔레트(blue/green/purple/orange/gray + 뉴트럴) 안에서 고른다.
- `@import "tailwindcss";` 뒤에 오는 리셋·컴포넌트 CSS는 반드시 `@layer base { }`로 감싼다 — 감싸지 않으면 unlayered 취급되어 캐스케이드 우선순위가 utilities 레이어보다 항상 높아지고, margin 계열 유틸리티(`mt-*`, `space-y-*`)가 무효화된다 (2026-08-25에 실제로 겪은 버그).

## 콘텐츠 데이터

프로젝트 콘텐츠는 `content/projects.ts`의 `Project[]`에서만 관리한다(경력/인턴은 같은 구조를 `content/career.ts`의 `CareerEntry[]`로 두고 홈 About 아래 `CareerCard` 한 장으로만 렌더 — 상세 라우트 없음). 컴포넌트에 텍스트를 하드코딩하지 않는다. `introScreen`/`showcaseScreen`/`showcasePoints`/`showcaseEyebrow`/`showcaseTitle`/`diagramSrc`/`diagrams`/`diagramCaptions`/`heroScreen`, 그리고 판단별 `order`/`considerations`/`outcome`/`diagram`/`image`는 전부 옵셔널 — 아직 상세 콘텐츠를 안 채운 프로젝트는 카드 정보(`icon`/`title`/`oneLiner`/`meta`/`scope`(`string[]`)/`status`/`links`/`stack`) + 최소 `decisions`(`title`/`problem`/`solution`) + `result`만으로도 카드와 상세 페이지가 정상 렌더된다. 옵셔널 필드를 채울수록 그 판단이 compact → STAR → 이미지 그리드로 무거워진다 (위 「상세 페이지 = 데이터로 조립」 표 참고).

## 참고 자산

`Developer Portfolio Website Design/`은 Figma Make로 뽑은 디자인 참고용 export다. 실제 프로젝트 콘텐츠가 아니라 전부 가짜 예시 데이터(Toss Fintech, Nexus 등)이므로 절대 그대로 가져다 쓰지 않는다 — 색·타이포·컴포넌트 패턴만 참고해 위 팔레트/구조로 옮겨온 상태다. `.gitignore`·`tsconfig.json`·`eslint.config.mjs`에서 빌드·린트·커밋 대상 밖으로 제외돼 있다.
