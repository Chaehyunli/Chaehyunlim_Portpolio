# 토스(Toss) 스타일 리디자인

날짜: 2026-08-25
상태: 적용됨
이전 문서: [2026-08-23-portfolio-site-design.md](./2026-08-23-portfolio-site-design.md)

## 배경

Figma Make로 만든 참고 디자인(`Developer Portfolio Website Design/`, 더미 데이터 기반 export)의 톤을 실제 사이트에 전면 반영하기로 결정. 기존 무채색 3색·단일 스크롤 설계(2026-08-23 문서)를 대체한다. 두 축을 사용자 확인 후 진행:

1. 색·형태 톤 — 무채색 고정 → 토스 스타일(블루 액센트, 라운드, 그림자)
2. 사이트 구조 — 단일 스크롤 → 홈 카드 그리드 + 프로젝트별 상세 페이지

## 색·타이포·모양 토큰 (`app/globals.css`)

| 구분 | 이전 | 이후 |
|---|---|---|
| 배경/텍스트 | `--color-bg:#fff` / `--color-text:#000` 2색 + muted | `--color-bg:#f2f4f6`(웹 배경) / `--color-card:#fff`(카드 배경) 분리, `--color-text:#191f28`, `--color-sub:#8b95a1`, `--color-muted:#b0b8c1`, `--color-border:#e5e8eb` |
| 액센트 | 없음(무채색 고정) | `--color-blue:#3182f6` 기본, `green`/`purple`/`orange`/`gray` 각각 진한 색 + `-bg` 옅은 톤 페어로 상태 칩(`Chip`)에 사용 |
| 폰트 | 시스템 폰트 | Inter(본문) + JetBrains Mono(라벨·캡션류) — Google Fonts `@import` |
| radius | `0` 고정 | `--radius-card:20px` / `--radius-md:16px` / `--radius-sm:12px` / `--radius-pill:999px` |
| 그림자 | 없음(텍스처 없음 원칙) | `--shadow-card`, `--shadow-card-hover`(호버 시 블루 틴트 확산) |
| 페이지 폭 | `--content-width:720px` 단일 컬럼 | `--page-width:1400px` 추가 — 화면을 못 채운다는 피드백으로 확장 |

`--shadow-card`류는 `:root`가 아니라 `@theme` 안에 선언해야 Tailwind가 `shadow-card` 유틸리티를 생성한다(처음에 `:root`에 넣었다가 유틸리티가 안 만들어져서 옮김).

## 사이트 구조

- **단일 스크롤 → 홈 + 프로젝트별 라우트.** `app/[projectId]/page.tsx` 동적 라우트 추가, `generateStaticParams`로 6개 프로젝트 정적 생성.
- 오른쪽 고정 목차 내비(`SectionNav`)와 스크롤 진행률 바(`ScrollProgressBar`)는 단일 스크롤 전제였던 컴포넌트라 삭제. 프로젝트 상세 페이지는 대신 **좌측 sticky 사이드바**(기간·형태 / 맡은 역할 / Highlights / Tech Stack / Links)로 대체.
- 홈은 `HeroCard` + `TimelineCard`(프로필) 아래 `ProjectCard` 3열 그리드.

## 컴포넌트

- **`ProjectCard`** — 카드 상단 이미지 영역(`h-56`, `bg-blue-bg`)에 `cardImage ?? introScreen ?? screens[0]`을 `object-contain`으로 표시. 초기에 넣었던 좌상단 아이콘 배지는 "아이콘 없는 게 낫다"는 피드백으로 제거.
- **`FramedImage`** — 무채색 시절의 검정 테두리 대신 `rounded-md` + `shadow-card`, 캡션은 `text-sub` + mono 폰트.
- **`ImagePointsGrid`**(신규) — 이미지와 포인트 리스트를 그리드로 배치하고 기본 `align-items:stretch`로 포인트 리스트 높이를 이미지에 맞춘다. 항목 수에 따라 간격이 균등 분배되도록 `justify-between` 사용. 다이어그램/화면 설명에서 반복 사용할 공용 컴포넌트로 분리.
- **`Chip` / `Tag`**(신규) — `StatusColor`(blue/green/purple/orange/gray) 매핑 배지와 스택 태그.

## 카드 썸네일 크롭 — CSS가 아니라 소스 이미지에서 해결

Masil 카드 썸네일은 "휴대폰 스크린샷 상단 절반만, 테두리(둥근 모서리) 잘림 없이" 보여야 했다. `object-cover`+`object-position`, `transform: scale()`, `object-fit: contain` 조합을 순서대로 시도했지만 "상단 50%만 + 전체 폭 보존"을 동시에 만족시키는 CSS 조합은 없었다(cover 계열은 항상 컨테이너 폭에 맞춰 확대되며 잘리고, contain은 전체 이미지를 다 보여준다).

**해결: 소스 이미지 자체를 미리 크롭.** PIL로 원본 스크린샷의 상단 절반만 잘라 별도 파일(`screen-chat-itinerary-thumb.png`)로 저장하고, `Project` 타입에 카드 전용 `cardImage?: ProjectImage` 필드를 추가해 참조. `ProjectCard`는 그 파일을 그냥 `object-contain`으로 그린다. 카드 그리드에 쓸 만한 크기로 미리 잘라둔 전용 에셋을 쓰는 것이 CSS 옵션을 조합하는 것보다 안정적 — 같은 상황(세로로 긴 모바일 스크린샷을 가로 카드에 부분만 노출)이 다시 나오면 이 패턴을 재사용한다.

## 문서/설정 업데이트

- `CLAUDE.md` — 디자인 톤·사이트 구조·콘텐츠 데이터 섹션을 이 문서 기준으로 재작성(무채색/단일 스크롤 관련 서술 제거).
- `.gitignore` / `tsconfig.json` / `eslint.config.mjs` — `Developer Portfolio Website Design/` 참고 폴더를 git·빌드·린트 대상에서 제외했다가, 반영이 끝난 뒤 폴더 자체를 삭제.

## 범위에서 제외한 것 (2026-08-23 문서와 동일하게 유지)

- 다크모드 — 라이트 테마 단일 고정은 유지
- Framer Motion 등 애니메이션 라이브러리 — `.reveal` 트랜지션만 사용
